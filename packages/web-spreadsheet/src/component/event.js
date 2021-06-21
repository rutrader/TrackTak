export function bind(target, name, fn, options) {
  target.addEventListener(name, fn, options);
}
export function unbind(target, name, fn, options) {
  target.removeEventListener(name, fn, options);
}
export function unbindClickoutside(el) {
  if (el.xclickoutside) {
    unbind(window.document.body, "click", el.xclickoutside);
    delete el.xclickoutside;
  }
}

// the left mouse button: mousedown → mouseup → click
// the right mouse button: mousedown → contenxtmenu → mouseup
// the right mouse button in firefox(>65.0): mousedown → contenxtmenu → mouseup → click on window
export function bindClickoutside(el, cb, ignoredElements = [el]) {
  el.xclickoutside = (evt) => {
    // ignore double click
    // console.log('evt:', evt);
    if (evt.detail === 2 || ignoredElements.some((x) => x.contains(evt.target)))
      return;
    if (cb) cb(el);
    else {
      el.hide();
      unbindClickoutside(el);
    }
  };
  bind(window.document.body, "click", el.xclickoutside);
}
export function mouseMoveUp(target, movefunc, upfunc) {
  bind(target, "mousemove", movefunc);
  const t = target;
  t.xEvtUp = (evt) => {
    // console.log('mouseup>>>');
    unbind(target, "mousemove", movefunc);
    unbind(target, "mouseup", target.xEvtUp);
    upfunc(evt);
  };
  bind(target, "mouseup", target.xEvtUp);
}

function calTouchDirection(spanx, spany, evt, cb) {
  let direction = "";
  // console.log('spanx:', spanx, ', spany:', spany);
  if (Math.abs(spanx) > Math.abs(spany)) {
    // horizontal
    direction = spanx > 0 ? "right" : "left";
    cb(direction, spanx, evt);
  } else {
    // vertical
    direction = spany > 0 ? "down" : "up";
    cb(direction, spany, evt);
  }
}
// cb = (direction, distance) => {}
export function bindTouch(target, { move, end, touchstart }) {
  let startx = 0;
  let starty = 0;
  bind(target, "touchstart", (evt) => {
    const { pageX, pageY } = evt.touches[0];
    startx = pageX;
    starty = pageY;

    touchstart(evt);
  });
  bind(target, "touchmove", (evt) => {
    if (!move) return;
    const { pageX, pageY } = evt.changedTouches[0];
    const spanx = pageX - startx;
    const spany = pageY - starty;
    if (Math.abs(spanx) > 10 || Math.abs(spany) > 10) {
      // console.log('spanx:', spanx, ', spany:', spany);
      calTouchDirection(spanx, spany, evt, move);
      startx = pageX;
      starty = pageY;
    }
    // TODO: Add back when vertical scrolling is fixed properly for freeze & mouse wheel
    // evt.preventDefault();
  });
  bind(target, "touchend", (evt) => {
    if (!end) return;
    const { pageX, pageY } = evt.changedTouches[0];
    const spanx = pageX - startx;
    const spany = pageY - starty;
    calTouchDirection(spanx, spany, evt, end);
  });
}
// eventemiter
export function createEventEmitter() {
  const listeners = new Map();
  function on(eventName, callback) {
    if (listeners.has(eventName)) {
      const currentListener = listeners.get(eventName);
      if (Array.isArray(currentListener)) {
        currentListener.push(callback);
      }
    } else {
      listeners.set(eventName, [].concat(callback));
    }
  }
  function fire(eventName, args) {
    if (listeners.has(eventName)) {
      const currentListener = listeners.get(eventName);
      for (const callback of currentListener) {
        callback.call(null, ...args);
      }
    }
  }
  function removeListener(eventName, callback) {
    if (listeners.has(eventName)) {
      const currentListener = listeners.get(eventName);
      const idx = currentListener.indexOf(callback);
      if (idx && idx >= 0) {
        currentListener.splice(idx, 1);
      }
    }
  }
  function once(eventName, callback) {
    const execCalllback = function (...args) {
      callback.call(null, ...args);
      removeListener(eventName, execCalllback);
    };
    on(eventName, execCalllback);
  }
  function removeAllListeners() {
    listeners.clear();
  }
  function getAllListeners() {
    return listeners;
  }
  return {
    getAllListeners,
    on,
    once,
    fire,
    removeListener,
    removeAllListeners,
  };
}
