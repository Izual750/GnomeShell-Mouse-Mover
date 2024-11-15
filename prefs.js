/* prefs.js */

const { Gtk } = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;

function init() {}

function buildPrefsWidget() {
    let settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.gnome-shell-mouse-mover');

    let widget = new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        spacing: 12,
        margin_top: 12,
        margin_bottom: 12,
        margin_start: 12,
        margin_end: 12,
    });

    let label = new Gtk.Label({
        label: '<b>GnomeShell Mouse Mover Settings</b>',
        use_markup: true,
        halign: Gtk.Align.START,
    });

    widget.append(label);

    let switchRow = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        spacing: 6,
    });

    let switchLabel = new Gtk.Label({
        label: 'Enable cursor flash effect',
        hexpand: true,
        halign: Gtk.Align.START,
    });

    let switchButton = new Gtk.Switch({
        active: settings.get_boolean('enable-cursor-flash'),
    });

    switchButton.connect('state-set', (widget, state) => {
        settings.set_boolean('enable-cursor-flash', state);
    });

    switchRow.append(switchLabel);
    switchRow.append(switchButton);

    widget.append(switchRow);

    return widget;
}

