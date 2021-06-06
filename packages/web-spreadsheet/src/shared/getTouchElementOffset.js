const getTouchElementOffset = (evt) => {
  const bcr = evt.target.getBoundingClientRect();
  const offsetX = evt.targetTouches[0].clientX - bcr.x;
  const offsetY = evt.targetTouches[0].clientY - bcr.y;

  return {
    offsetX,
    offsetY,
  };
};

export default getTouchElementOffset;
