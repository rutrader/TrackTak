function dpr() {
  return window.devicePixelRatio || 1;
}

function npxLine(px) {
  const n = npx(px);
  return n > 0 ? n - 0.5 : 0.5;
}

export function thinLineWidth() {
  return dpr() - 0.5;
}

export function npx(px) {
  return parseInt(px * dpr(), 10);
}

export const getDrawBox = (x, y, width, height, padding = 0) => {
  let _x = x;
  let _y = y;

  const bgcolor = "#ffffff";

  const innerWidth = () => {
    return width - padding * 2 - 2;
  };

  const innerHeight = () => {
    return height - padding * 2 - 2;
  };

  const getTextX = (align) => {
    let textX = _x;

    if (align === "left") {
      textX += padding;
    } else if (align === "center") {
      textX += width / 2;
    } else if (align === "right") {
      textX += width - padding;
    }

    return textX;
  };

  const getTextY = (align, textHeight) => {
    let textY = _y;

    if (align === "top") {
      textY += padding;
    } else if (align === "middle") {
      textY += height / 2 - textHeight / 2;
    } else if (align === "bottom") {
      textY += height - padding - textHeight;
    }

    return textY;
  };

  const topxys = () => {
    return [
      [_x, _y],
      [_x + width, _y],
    ];
  };

  const rightxys = () => {
    return [
      [_x + width, _y],
      [_x + width, _y + height],
    ];
  };

  const bottomxys = () => {
    return [
      [_x, _y + height],
      [_x + width, _y + height],
    ];
  };

  const leftxys = () => {
    return [
      [_x, _y],
      [_x, _y + height],
    ];
  };

  return {
    x: _x,
    y: _y,
    bgcolor,
    width,
    height,
    padding,
    innerWidth,
    innerHeight,
    getTextX,
    getTextY,
    topxys,
    rightxys,
    bottomxys,
    leftxys,
  };
};

function drawFontLine(
  type,
  tx,
  ty,
  align,
  valign,
  bottomLineHeight,
  bottomLineWidth,
) {
  const floffset = { x: 0, y: 0 };

  if (type === "underline") {
    if (valign === "bottom") {
      floffset.y = 0;
    } else if (valign === "top") {
      floffset.y = -(bottomLineHeight + 2);
    } else {
      floffset.y = -bottomLineHeight / 2;
    }
  } else if (type === "strike") {
    if (valign === "bottom") {
      floffset.y = bottomLineHeight / 2;
    } else if (valign === "top") {
      floffset.y = -(bottomLineHeight / 2 + 2);
    }
  }

  if (align === "center") {
    floffset.x = bottomLineWidth / 2;
  } else if (align === "right") {
    floffset.x = bottomLineWidth;
  }

  return [
    [tx - floffset.x, ty - floffset.y],
    [tx - floffset.x + bottomLineWidth, ty - floffset.y],
  ];
}

const getDraw = (el, width, height) => {
  const ctx = el.getContext("2d");

  const resize = (width, height) => {
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.width = npx(width);
    el.height = npx(height);
  };

  const clear = () => {
    ctx.clearRect(0, 0, width, height);
  };

  const attr = (options) => {
    Object.assign(ctx, options);
  };

  const save = () => {
    ctx.save();
    ctx.beginPath();
  };

  const restore = () => {
    ctx.restore();
  };

  const beginPath = () => {
    ctx.beginPath();
  };

  const translate = (x, y) => {
    ctx.translate(npx(x), npx(y));
  };

  const scale = (x, y) => {
    ctx.scale(x, y);
  };

  const clearRect = (x, y, w, h) => {
    ctx.clearRect(x, y, w, h);
  };

  const fillRect = (x, y, w, h) => {
    ctx.fillRect(npx(x) - 0.5, npx(y) - 0.5, npx(w), npx(h));
  };

  const fillText = (text, x, y) => {
    ctx.fillText(text, npx(x), npx(y));
  };

  const text = (mtxt, box, attributes = {}, textWrap = true) => {
    const { align, valign, font, color, strike, underline } = attributes;

    const textX = box.getTextX(align);

    ctx.save();
    ctx.beginPath();
    attr({
      textAlign: align,
      textBaseline: valign,
      font: `${font.italic ? "italic" : ""} ${font.bold ? "bold" : ""} ${npx(
        font.size,
      )}px ${font.name}`,
      fillStyle: color,
      strokeStyle: color,
    });
    const txts = `${mtxt}`.split("\n");
    const biw = box.innerWidth();
    const ntxts = [];
    txts.forEach((it) => {
      const txtWidth = ctx.measureText(it).width;
      if (textWrap && txtWidth > npx(biw)) {
        let textLine = { w: 0, len: 0, start: 0 };
        for (let i = 0; i < it.length; i += 1) {
          if (textLine.w >= npx(biw)) {
            ntxts.push(it.substr(textLine.start, textLine.len));
            textLine = { w: 0, len: 0, start: i };
          }
          textLine.len += 1;
          textLine.w += ctx.measureText(it[i]).width + 1;
        }
        if (textLine.len > 0) {
          ntxts.push(it.substr(textLine.start, textLine.len));
        }
      } else {
        ntxts.push(it);
      }
    });
    const txtHeight = (ntxts.length - 1) * (font.size + 2);

    let textY = box.getTextY(valign, txtHeight);

    ntxts.forEach((txt) => {
      const txtWidth = ctx.measureText(txt).width;
      fillText(txt, textX, textY);
      if (strike) {
        const lines = drawFontLine(
          "strike",
          textX,
          textY,
          align,
          valign,
          font.size,
          txtWidth,
        );

        line(...lines);
      }
      if (underline) {
        const lines = drawFontLine(
          "underline",
          textX,
          textY,
          align,
          valign,
          font.size,
          txtWidth,
        );

        line(...lines);
      }
      textY += font.size + 2;
    });
    ctx.restore();
  };

  const border = (style, color) => {
    ctx.lineWidth = thinLineWidth;
    ctx.strokeStyle = color;

    if (style === "medium") {
      ctx.lineWidth = npx(2) - 0.5;
    } else if (style === "thick") {
      ctx.lineWidth = npx(3);
    } else if (style === "dashed") {
      ctx.setLineDash([npx(3), npx(2)]);
    } else if (style === "dotted") {
      ctx.setLineDash([npx(1), npx(1)]);
    } else if (style === "double") {
      ctx.setLineDash([npx(2), 0]);
    }
  };

  const line = (...xys) => {
    if (xys.length > 1) {
      ctx.beginPath();
      const [x, y] = xys[0];
      ctx.moveTo(npxLine(x), npxLine(y));
      for (let i = 1; i < xys.length; i += 1) {
        const [x1, y1] = xys[i];
        ctx.lineTo(npxLine(x1), npxLine(y1));
      }
      ctx.stroke();
    }
  };

  const strokeBorders = (borders, box) => {
    ctx.save();

    const { left, right, bottom, top } = borders;

    if (top) {
      border(...top);
      line(...box.topxys());
    }
    if (right) {
      border(...right);
      line(...box.rightxys());
    }
    if (bottom) {
      border(...bottom);
      line(...box.bottomxys());
    }
    if (left) {
      border(...left);
      line(...box.leftxys());
    }
    ctx.restore();
  };

  const dropdown = (box) => {
    const { x, y, width, height } = box;
    const sx = x + width - 15;
    const sy = y + height - 15;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(npx(sx), npx(sy));
    ctx.lineTo(npx(sx + 8), npx(sy));
    ctx.lineTo(npx(sx + 4), npx(sy + 6));
    ctx.closePath();
    ctx.fillStyle = "rgba(0, 0, 0, .45)";
    ctx.fill();
    ctx.restore();
  };

  const error = (box) => {
    const { x, y, width } = box;
    const sx = x + width - 1;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(npx(sx - 8), npx(y - 1));
    ctx.lineTo(npx(sx), npx(y - 1));
    ctx.lineTo(npx(sx), npx(y + 8));
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 0, 0, .65)";
    ctx.fill();
    ctx.restore();
  };

  const frozen = (box) => {
    const { x, y, width } = box;
    const sx = x + width - 1;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(npx(sx - 8), npx(y - 1));
    ctx.lineTo(npx(sx), npx(y - 1));
    ctx.lineTo(npx(sx), npx(y + 8));
    ctx.closePath();
    ctx.fillStyle = "rgba(0, 255, 0, .85)";
    ctx.fill();
    ctx.restore();
  };

  const rect = (box, dtextcb) => {
    const { x, y, width, height, bgcolor } = box;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = bgcolor || "#fff";
    ctx.rect(npxLine(x + 1), npxLine(y + 1), npx(width - 2), npx(height - 2));
    ctx.clip();
    ctx.fill();
    dtextcb();
    ctx.restore();
  };

  resize(width, height);
  ctx.scale(dpr(), dpr());

  return {
    el,
    width,
    height,
    ctx,
    resize,
    clear,
    attr,
    save,
    restore,
    beginPath,
    translate,
    scale,
    clearRect,
    fillRect,
    fillText,
    text,
    border,
    line,
    strokeBorders,
    dropdown,
    error,
    frozen,
    rect,
  };
};

export default getDraw;
