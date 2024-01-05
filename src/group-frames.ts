import { BoomSheetsAnimation, BoomSheetsFrame } from "./boomsheets-animations";
import { rectOverlaps } from "./rect";

export type FrameGroup = {
  x: number;
  y: number;
  w: number;
  h: number;
  frames: BoomSheetsFrame[];
};

function updateBounds(group: FrameGroup) {
  const firstFrame = group.frames[0];
  let minX = firstFrame.x;
  let minY = firstFrame.y;
  let maxX = firstFrame.x + firstFrame.w;
  let maxY = firstFrame.y + firstFrame.h;

  for (let i = 1; i < group.frames.length; i++) {
    const frame = group.frames[i];
    minX = Math.min(minX, frame.x);
    minY = Math.min(minY, frame.y);
    maxX = Math.max(maxX, frame.x + frame.w);
    maxY = Math.max(maxY, frame.y + frame.h);
  }

  group.x = minX;
  group.y = minY;
  group.w = maxX - minX;
  group.h = maxY - minY;
}

// create a single group, removes frames from the passed list
function takeGroup(frames: BoomSheetsFrame[]): FrameGroup {
  const group: FrameGroup = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    frames: [frames.pop()!],
  };

  updateBounds(group);

  for (let i = frames.length - 1; i >= 0; i--) {
    const frame = frames[i];

    if (!rectOverlaps(group, frame)) {
      // failed the primary bounding box
      continue;
    }

    if (!group.frames.some((f) => rectOverlaps(f, frame))) {
      // failed against internal bounding boxes
      continue;
    }

    // take frame by swap remove
    frames[i] = frames[frames.length - 1];
    frames.pop();

    group.frames.push(frame);
    updateBounds(group);
  }

  return group;
}

export function moveGroup(group: FrameGroup, x: number, y: number) {
  const shiftX = x - group.x;
  const shiftY = y - group.y;

  group.x = x;
  group.y = y;

  for (const frame of group.frames) {
    frame.x += shiftX;
    frame.y += shiftY;
  }
}

export default function groupFrames(
  animations: BoomSheetsAnimation[]
): FrameGroup[] {
  const frames = animations.flatMap((animation) => animation.frames);
  const groups: FrameGroup[] = [];

  while (frames.length > 0) {
    groups.push(takeGroup(frames));
  }

  return groups;
}
