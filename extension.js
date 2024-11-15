/* extension.js */

const { Meta, Clutter, Gio } = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;

class Extension {
    constructor() {
        this._handler = null;
        this._seat = null;
        this._settings = null;
    }

    enable() {
        // Initialize GSettings for the extension
        this._settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.gnome-shell-mouse-mover');

        // Connect to the 'notify::focus-window' signal to detect when the focused window changes
        this._handler = global.display.connect('notify::focus-window', () => this._moveMouse());

        // Get the default seat (input device abstraction) for pointer control
        this._seat = Clutter.get_default_backend().get_default_seat();
    }

    disable() {
        // Disconnect the signal handler
        if (this._handler) {
            global.display.disconnect(this._handler);
            this._handler = null;
        }

        // Clean up references
        this._seat = null;
        this._settings = null;
    }

    _moveMouse() {
        const win = global.display.focus_window;

        // Ensure the seat and focused window are available
        if (!this._seat || !win) return;

        // Get the rectangle (position and size) of the focused window
        const winRect = win.get_frame_rect();

        // Get the current pointer position
        const [x, y] = global.get_pointer();

        // Create a rectangle representing the current pointer position
        const pointerRect = new Meta.Rectangle({ x, y, width: 1, height: 1 });

        // Check if the pointer is already within the focused window
        if (pointerRect.intersect(winRect)[0]) return;

        // Calculate the center coordinates of the focused window
        const newX = winRect.x + winRect.width / 2;
        const newY = winRect.y + winRect.height / 2;

        // Move the pointer to the center of the focused window
        this._seat.warp_pointer(newX, newY);

        // Trigger cursor flash effect if enabled in settings
        if (this._settings.get_boolean('enable-cursor-flash')) {
            this._flashCursor(newX, newY);
        }
    }

    _flashCursor(x, y) {
        // Create a new Clutter actor for the flash effect
        let stage = global.stage;

        // Create a circle actor to represent the flash
        let circle = new Clutter.Actor({
            x: x,
            y: y,
            width: 40,
            height: 40,
            opacity: 255,
            reactive: false,
            anchor_x: 20,
            anchor_y: 20,
        });

        // Set the circle's appearance
        let clutterColor = new Clutter.Color({ red: 255, green: 255, blue: 0, alpha: 255 });
        circle.set_background_color(clutterColor);
        circle.set_pivot_point(0.5, 0.5);

        // Ensure the circle is circular
        circle.set_content(new Clutter.Canvas());
        circle.get_content().connect('draw', (canvas, cr, width, height) => {
            cr.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
            cr.setSourceRGBA(1, 1, 0, 1); // Yellow color
            cr.fill();
            return true;
        });
        circle.get_content().set_size(40, 40);
        circle.get_content().invalidate();

        // Add the circle to the stage (top-level container)
        stage.add_child(circle);

        // Animate the flash effect (fade out and scale up)
        circle.ease({
            opacity: 0,
            scale_x: 2.0,
            scale_y: 2.0,
            duration: 500,
            mode: Clutter.AnimationMode.EASE_OUT_QUAD,
            onComplete: () => {
                circle.destroy(); // Remove the circle after animation
            },
        });
    }
}

function init() {
    return new Extension();
}

