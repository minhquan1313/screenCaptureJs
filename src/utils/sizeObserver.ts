interface IParams {
  ele: HTMLElement;
  onChange: (entries: ResizeObserverEntry[]) => void;
}

export function sizeObserver(value: IParams) {
  const { ele, onChange } = value;

  const resizeObserver = new ResizeObserver(onChange);

  const o = resizeObserver.observe(ele);

  function destroy() {
    resizeObserver.disconnect();
  }

  return {
    destroy,
  };
}
