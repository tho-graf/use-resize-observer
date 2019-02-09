# use-resize-observer

```javascript
const App = () => {
  const ref = useResizeObserver(contentRect => console.log(contentRect));
  // {"entry":{"x":0,"y":0,"width":734,"height":18,"top":0,"right":734,"bottom":18,"left":0}}

  return <div ref={ref}>Hello</div>;
};
```
