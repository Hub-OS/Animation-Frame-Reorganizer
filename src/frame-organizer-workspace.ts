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

    this.#sheet = sheet;

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

    // update canvas bounds
    this.#canvas.width = sourceImage.width;
    this.#canvas.height = sourceImage.height;
    this.#frameCanvas.width = packed.width;
    this.#frameCanvas.height = packed.height;

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

    const renderRect = (rect: Rect) => {
      ctx.beginPath();
      ctx.rect(rect.x + 0.5, rect.y + 0.5, rect.w - 1, rect.h - 1);
      ctx.fill();
      ctx.stroke();
    };

    for (const group of this.#frameGroups) {
      ctx.globalAlpha = this.#selectedGroups.includes(group) ? 1.0 : 0.2;
      renderRect(group.work);
    }

    ctx.globalAlpha = 1.0;

    if (this.#selectionRect) {
      renderRect(this.#selectionRect);
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
