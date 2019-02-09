import React, { useLayoutEffect } from "react";

export default function useResizeObserver(onResize, types = []) {
  const ref = React.createRef();
  let observer = null;

  useLayoutEffect(() => {
    observer = new ResizeObserver(entries => {
      if (ref.current !== null) {
        const contentRect = getContentRect(ref.current, types);
        onResize({ ...contentRect, entry: entries[0].contentRect });
      }
    });

    if (ref.current !== null) {
      observer.observe(ref.current);
    }

    return () => {
      observer !== null && observer.disconnect();
    };
  }, [onResize, types]);
  return ref;
}

function getContentRect(element, types) {
  const calculations = {};

  if (types.indexOf("client") > -1) {
    calculations.client = {
      top: element.clientTop,
      left: element.clientLeft,
      width: element.clientWidth,
      height: element.clientHeight
    };
  }

  if (types.indexOf("offset") > -1) {
    calculations.offset = {
      top: element.offsetTop,
      left: element.offsetLeft,
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }

  if (types.indexOf("scroll") > -1) {
    calculations.scroll = {
      top: element.scrollTop,
      left: element.scrollLeft,
      width: element.scrollWidth,
      height: element.scrollHeight
    };
  }

  if (types.indexOf("bounds") > -1) {
    const rect = element.getBoundingClientRect();
    calculations.bounds = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  }

  if (types.indexOf("margin") > -1) {
    const styles = getComputedStyle(element);
    calculations.margin = {
      top: styles && styles.marginTop ? parseInt(styles.marginTop) : 0,
      right: styles && styles.marginRight ? parseInt(styles.marginRight) : 0,
      bottom: styles && styles.marginBottom ? parseInt(styles.marginBottom) : 0,
      left: styles && styles.marginLeft ? parseInt(styles.marginLeft) : 0
    };
  }

  return calculations;
}
