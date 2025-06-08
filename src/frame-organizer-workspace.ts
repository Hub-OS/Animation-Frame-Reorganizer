import pack from "bin-pack";
import { BoomSheetsFrame, serializeAnimations } from "./boomsheets-animations";
import groupFrames, { FrameGroup, moveGroup } from "./group-frames";
import { InputSheet } from "./input-sheets";
import { Rect, pointIntersectsRect, rectOverlaps } from "./rect";

type PackedFrameGroup = {
  work: FrameGroup;
  packed: FrameGroup;
};

export default class FrameOrganizerWorkspace {
  #originalSheet: InputSheet = {};
  #sheet: InputSheet = {};
  #frameGroups: PackedFrameGroup[] = [];
  #selectedGroups: PackedFrameGroup[] = [];
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #frameCanvas: HTMLCanvasElement;
  #frameCtx: CanvasRenderingContext2D;

  #expandingSelection = false;
  #mouseDown = false;
  #selectionRect?: Rect;
  #dragStartX = 0;
  #dragStartY = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d")!;

    this.#frameCanvas = document.createElement("canvas");
    this.#frameCtx = this.#frameCanvas.getContext("2d")!;
    this.#frameCtx.globalCompositeOperation = "copy";

    let mouseX = 0;
    let mouseY = 0;

    const resolveMousePosition = (event: MouseEvent) => {
      const boundingRect = canvas.getBoundingClientRect();
      const inverseScale = canvas.width / boundingRect.width;

      mouseX = Math.floor((event.clientX - boundingRect.left) * inverseScale);
      mouseY = Math.floor((event.clientY - boundingRect.top) * inverseScale);
    };

    this.#canvas.addEventListener("mousedown", (event) => {
      resolveMousePosition(event);

      this.#mouseDown = true;
      this.#dragStartX = mouseX;
      this.#dragStartY = mouseY;

      const selectedExisting = this.#selectedGroups.some(({ work }) =>
        pointIntersectsRect(work, mouseX, mouseY)
      );

      if (selectedExisting) {
        this.#expandingSelection = false;
      } else {
        // redefine selection
        this.#selectedGroups = this.#frameGroups.filter(({ work }) =>
          pointIntersectsRect(work, mouseX, mouseY)
        );

        this.#expandingSelection = this.#selectedGroups.length == 0;
      }

      this.render();
    });

    document.body.addEventListener("mousemove", (event) => {
      if (!this.#mouseDown) {
        return;
      }

      const lastX = mouseX;
      const lastY = mouseY;
      resolveMousePosition(event);

      if (this.#expandingSelection) {
        const minX = Math.min(mouseX, this.#dragStartX);
        const minY = Math.min(mouseY, this.#dragStartY);
        const maxX = Math.max(mouseX, this.#dragStartX);
        const maxY = Math.max(mouseY, this.#dragStartY);

        const rect = {
          x: minX,
          y: minY,
          w: maxX - minX,
          h: maxY - minY,
        };
        this.#selectionRect = rect;

        this.#selectedGroups = this.#frameGroups.filter(({ work }) =>
          rectOverlaps(rect, work)
        );
      } else {
        const shiftX = mouseX - lastX;
        const shiftY = mouseY - lastY;
        this.#shiftSelections(shiftX, shiftY);
      }

      this.render();
    });

    document.body.addEventListener("mouseup", () => {
      if (this.#mouseDown) {
        this.#mouseDown = false;
        this.#selectionRect = undefined;
        this.render();
      }
    });

    this.#canvas.addEventListener("keydown", (event) => {
      let shiftX = 0;
      let shiftY = 0;

      switch (event.code) {
        case "KeyA":
        case "ArrowLeft":
          shiftX -= 1;
          break;
        case "KeyD":
        case "ArrowRight":
          shiftX += 1;
          break;
        case "KeyW":
        case "ArrowUp":
          shiftY -= 1;
          break;
        case "KeyS":
        case "ArrowDown":
          shiftY += 1;
          break;
      }

      if (shiftX == 0 && shiftY == 0) {
        return;
      }

      event.preventDefault();

      if (event.shiftKey) {
        this.#accordionSelections(shiftX, shiftY);
      } else {
        this.#shiftSelections(shiftX, shiftY);
      }

      this.render();
    });
  }

  #shiftSelections(shiftX: number, shiftY: number) {
    for (const { work } of this.#selectedGroups) {
      moveGroup(work, work.x + shiftX, work.y + shiftY);
    }
  }

  #accordionSelections(shiftX: number, shiftY: number) {
    if (this.#selectedGroups.length == 0) {
      return;
    }

    // x
    this.#selectedGroups.sort((a, b) => a.work.x - b.work.x);

    let lastX = this.#selectedGroups[0].work.x;
    let currentShiftX = 0;

    for (const { work } of this.#selectedGroups) {
      if (work.x != lastX) {
        lastX = work.x;
        currentShiftX += shiftX;
      }

      moveGroup(work, work.x + currentShiftX, work.y);
    }

    // y
    this.#selectedGroups.sort((a, b) => a.work.y - b.work.y);

    let lastY = this.#selectedGroups[0].work.y;
    let currentShiftY = 0;

    for (const { work } of this.#selectedGroups) {
      if (work.y != lastY) {
        lastY = work.y;
        currentShiftY += shiftY;
      }

      moveGroup(work, work.x, work.y + currentShiftY);
    }
  }

  loadSheet(sheet: InputSheet) {
    const sourceImage = sheet.image!;

    // update canvas bounds
    this.#canvas.width = sourceImage.width;
    this.#canvas.height = sourceImage.height;

    // can't use structured clone on image element
    sheet.image = undefined;

    this.#originalSheet = sheet;
    this.#sheet = structuredClone(sheet);

    // put the image back
    sheet.image = sourceImage;
    this.#sheet.image = sourceImage;

    const groups = groupFrames(sheet.animations!);
    const packed = pack(
      groups.map((group) => ({
        width: group.w + 2,
        height: group.h + 2,
        group,
      }))
    );

    this.#frameGroups = [];

    for (const item of packed.items) {
      const work = item.item.group;
      const packed = structuredClone(work);

      moveGroup(packed, item.x + 1, item.y + 1);

      this.#frameGroups.push({
        work,
        packed,
      });
    }

    this.#updateFrameSource(packed.width, packed.height);
    this.render();
  }

  #updateFrameSource(width: number, height: number) {
    const sourceImage = this.#sheet.image!;

    // update canvas bounds
    this.#frameCanvas.width = width;
    this.#frameCanvas.height = height;

    // create frame source
    for (const { work, packed } of this.#frameGroups) {
      for (let i = 0; i < packed.frames.length; i++) {
        const sourceFrame = work.frames[i];
        const destFrame = packed.frames[i];

        const w = sourceFrame.w;
        const h = sourceFrame.h;

        this.#frameCtx.drawImage(
          sourceImage,
          sourceFrame.x,
          sourceFrame.y,
          w,
          h,
          destFrame.x,
          destFrame.y,
          w,
          h
        );
      }
    }
  }

  descramble() {
    // can't use structured clone on image element
    const image = this.#originalSheet.image;
    this.#originalSheet.image = undefined;

    this.#sheet = structuredClone(this.#originalSheet);

    // put the image back
    this.#sheet.image = image;
    this.#originalSheet.image = image;

    if (!this.#sheet.animations) {
      return;
    }

    // build frame groups and move frames
    this.#frameGroups = [];

    for (const animation of this.#sheet.animations) {
      for (const frame of animation.frames) {
        const { x, y, w, h } = frame;
        const work = { x, y, w, h, frames: [frame] };
        const packed = structuredClone(work);
        this.#frameGroups.push({ work, packed });
      }
    }

    if (image) {
      this.#updateFrameSource(image.width, image.height);
    }

    // move frames
    let frameGroupIndex = 0;
    let placeX = 1;
    let placeY = 1;
    let nextY = placeY;
    let width = placeX;

    for (const animation of this.#sheet.animations) {
      for (const frame of animation.frames) {
        const frameGroup = this.#frameGroups[frameGroupIndex];

        moveGroup(frameGroup.work, placeX, placeY);
        placeX += frame.w + 1;

        nextY = Math.max(nextY, placeY + frame.h + 1);
        width = Math.max(width, placeX);

        frameGroupIndex++;
      }

      placeX = 1;
      placeY = nextY;
    }

    // update canvas bounds
    this.#canvas.width = width;
    this.#canvas.height = placeY;

    this.render();
  }

  render() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#renderFrames(this.#ctx);
    this.#renderOutlines();
  }

  #renderFrames(ctx: CanvasRenderingContext2D) {
    for (const { work, packed } of this.#frameGroups) {
      for (let i = 0; i < packed.frames.length; i++) {
        const sourceFrame = packed.frames[i];
        const destFrame = work.frames[i];

        const w = sourceFrame.w;
        const h = sourceFrame.h;

        ctx.drawImage(
          this.#frameCanvas,
          sourceFrame.x,
          sourceFrame.y,
          w,
          h,
          destFrame.x,
          destFrame.y,
          w,
          h
        );
      }
    }
  }

  #renderOutlines() {
    const ctx = this.#ctx;

    ctx.strokeStyle = "orange";
    ctx.fillStyle = "rgba(255, 127, 0, 0.2)";

    const renderRect = (x: number, y: number, w: number, h: number) => {
      ctx.beginPath();
      ctx.rect(x + 0.5, y + 0.5, w, h);
      ctx.fill();
      ctx.stroke();
    };

    for (const group of this.#frameGroups) {
      ctx.globalAlpha = this.#selectedGroups.includes(group) ? 1.0 : 0.2;
      const { x, y, w, h } = group.work;
      renderRect(x, y, w - 1, h - 1);
    }

    ctx.globalAlpha = 1.0;

    if (this.#selectionRect) {
      const { x, y, w, h } = this.#selectionRect;
      renderRect(x, y, w, h);
    }
  }

  renderOutput(canvas: HTMLCanvasElement) {
    canvas.width = this.#canvas.width;
    canvas.height = this.#canvas.height;
    const ctx = canvas.getContext("2d")!;
    this.#renderFrames(ctx);
  }

  serializeSheet(): string {
    if (this.#sheet.animations) {
      return serializeAnimations(this.#sheet.animations);
    } else {
      return "";
    }
  }
}
