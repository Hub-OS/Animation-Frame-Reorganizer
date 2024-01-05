export type Rect = { x: number; y: number; w: number; h: number };

export function rectOverlaps(a: Rect, b: Rect) {
  const aIsLeft = a.x + a.w <= b.x;
  const aIsRight = a.x >= b.x + b.w;
  const aIsAbove = a.y + a.h <= b.y;
  const aIsBelow = a.y >= b.y + b.h;

  return !(aIsLeft || aIsRight || aIsAbove || aIsBelow);
}

export function pointIntersectsRect(rect: Rect, x: number, y: number) {
  return (
    x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h
  );
}
