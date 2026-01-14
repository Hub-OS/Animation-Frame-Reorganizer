import {
  parseAsepriteSheet,
  parseSheet,
  serializePoints,
  serializeSheet,
} from "./boomsheets-animations";
import { loadImageFile, loadTextFile } from "./file-loading";
import FrameOrganizerWorkspace from "./frame-organizer-workspace";
import { InputSheet, resolveSingleErrorMessage } from "./input-sheets";

const canvas = document.querySelector("#input canvas") as HTMLCanvasElement;
const workspace = new FrameOrganizerWorkspace(canvas);
const pendingSheet: InputSheet = {};

const animationOutputElement = document.getElementById(
  "animation-output"
) as HTMLTextAreaElement;
const pointsOutputElement = document.getElementById(
  "points-output"
) as HTMLTextAreaElement;

function logError(error: any) {
  console.error(error);
  alert(error);
}

document.getElementById("unpack-button")!.onclick = function () {
  if (
    confirm(
      "Are you sure? This will reorganize every frame and possibly create duplicate frames."
    )
  ) {
    workspace.unpack();
  }
};

document.getElementById("bake-button")!.onclick = function () {
  const canvas = document.querySelector("#output canvas") as HTMLCanvasElement;
  const textarea = document.querySelector("#output textarea");

  try {
    workspace.renderOutput(canvas);

    const boomsheet = workspace.boomsheet();

    if (boomsheet) {
      animationOutputElement.value = serializeSheet(boomsheet);
      pointsOutputElement.value = serializePoints(boomsheet);
    } else {
      animationOutputElement.value = "";
      pointsOutputElement.value = "";
    }
  } catch (error) {
    logError(error);
  }
};

document.body.addEventListener("dragover", (event) => event.preventDefault());
document.body.addEventListener("drop", (event) => {
  const items = event.dataTransfer?.items;

  if (!items) {
    return;
  }

  event.preventDefault();

  const files: File[] = [];

  for (const item of items) {
    const file = item.getAsFile();

    if (file) {
      files.push(file);
    }
  }

  loadFiles(files)
    .catch(logError)
    .finally(() => {
      const errorMessage = resolveSingleErrorMessage(pendingSheet);

      const errorElement = document.querySelector(
        "#input .error-text"
      )! as HTMLDivElement;

      errorElement.innerText = errorMessage || "";

      if (!errorMessage) {
        workspace.loadSheet(pendingSheet);
      }
    });
});

async function loadFiles(files: File[]) {
  for (const file of files) {
    if (file.name.endsWith(".png")) {
      try {
        pendingSheet.image = await loadImageFile(file);
        pendingSheet.imageError = undefined;
      } catch (error) {
        console.error(error);
        pendingSheet.imageError = error!.toString();
      }
    } else if (
      file.name.endsWith(".animation") ||
      file.name.endsWith(".anim")
    ) {
      try {
        const text = await loadTextFile(file);

        pendingSheet.boomsheet = parseSheet(text);
        pendingSheet.animationError = undefined;
      } catch (error) {
        console.error(error);
        pendingSheet.animationError = error!.toString();
      }
    } else if (file.name.endsWith(".json")) {
      try {
        const text = await loadTextFile(file);
        const json = JSON.parse(text);

        if (typeof json == "object" && Array.isArray(json.frames)) {
          const originString = prompt("Origin:", "0,0") ?? "0,0";

          let [originx, originy] = originString
            .split(",")
            .map((s) => parseFloat(s));

          originx ??= 0;
          originy ??= 0;

          pendingSheet.boomsheet = parseAsepriteSheet(json);

          for (const animation of pendingSheet.boomsheet.animations) {
            for (const frame of animation.frames) {
              frame.originx += originx;
              frame.originy += originy;
            }
          }

          pendingSheet.animationError = undefined;
        }
      } catch (error) {
        console.error(error);
        pendingSheet.animationError = error!.toString();
      }
    }
  }
}

document
  .querySelectorAll("input[name='animation-output-options']")
  .forEach((input) =>
    input.addEventListener("change", updateVisibleAnimationOutput)
  );

function updateVisibleAnimationOutput() {
  const input = document.querySelector(
    "input[name='animation-output-options']:checked"
  )! as HTMLInputElement;

  const textboxes = [animationOutputElement, pointsOutputElement];

  const visibleId = input.value + "-output";

  for (const textbox of textboxes) {
    textbox.style.display = textbox.id == visibleId ? "" : "none";
  }
}

updateVisibleAnimationOutput();
