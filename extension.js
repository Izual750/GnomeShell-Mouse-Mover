/* extension.js */

const { Meta, Clutter } = imports.gi;

class Extension {
  constructor() {
    this._handler = null;
    this._seat = null;
  }

  enable() {
    this._handler = global.display.connect('notify::focus-window', () => this._moveMouse());
    this._seat = Clutter.get_default_backend().get_default_seat();
  }

  disable() {
    global.display.disconnect(this._handler);
    this._seat = null;
  }

  _moveMouse() {
    const win = global.display.focus_window;
    if (!this._seat || !win) return;

    const winRect = win.get_frame_rect();
    const [x, y] = global.get_pointer();
    const pointerRect = new Meta.Rectangle({ x, y, width: 1, height: 1 });

    if (pointerRect.intersect(winRect)[0]) return;

    const newX = winRect.x + winRect.width / 2;
    const newY = winRect.y + winRect.height / 2;
    this._seat.warp_pointer(newX, newY);
  }
}

function init() {
  return new Extension();
}
