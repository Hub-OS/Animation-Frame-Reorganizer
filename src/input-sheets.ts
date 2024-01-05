import { BoomSheetsAnimation } from "./boomsheets-animations";

export type InputSheet = {
  image?: HTMLImageElement;
  imageError?: string;
  animations?: BoomSheetsAnimation[];
  animationError?: string;
};

export function resolveSingleErrorMessage(
  sheet: InputSheet
): string | undefined {
  if (sheet.animationError) {
    return sheet.animationError;
  } else if (sheet.imageError) {
    return sheet.imageError;
  } else if (!sheet.animations) {
    return "Missing .animation file";
  } else if (!sheet.image) {
    return "Missing image file";
  }
}
