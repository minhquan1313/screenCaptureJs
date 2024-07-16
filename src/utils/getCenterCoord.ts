export function getCenterCoord(ele: HTMLElement) {
  const { x, y, width, height } = ele.getBoundingClientRect();

  return {
    x: Math.round(x + width / 2),
    y: Math.round(y + height / 2),
  };
}
