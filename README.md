---

# GnomeShell Mouse Mover Extension

![License](https://img.shields.io/badge/License-GPLv3-blue.svg)
![GNOME Shell Version](https://img.shields.io/badge/GNOME%20Shell-45--47-brightgreen)

This GNOME Shell extension automatically moves the mouse cursor to the center of the currently focused window when switching between windows using **Alt+Tab**. It ensures seamless cursor positioning across multiple monitors and provides an optional cursor flash effect for enhanced visual feedback.

## Features

- **Automatic Mouse Movement**: When you switch windows using **Alt+Tab**, the mouse cursor moves to the center of the newly focused window.
- **Multi-Monitor Support**: Correctly calculates the window center even when windows are spread across multiple monitors.
- **Optional Cursor Flash Effect**: An optional visual effect that briefly highlights the cursor's new position, providing immediate feedback on where the cursor is located.
- **Configurable Settings**: Enable or disable the cursor flash effect through the GNOME Extensions preferences panel.

## Installation

### Prerequisites

- **GNOME Shell** version **45**, **46**, or **47**.
- **Dependencies**:
  - Ensure you have `glib-compile-schemas` installed for compiling GSettings schemas.

### Steps

1. **Download the Extension**: Clone or download this repository to your local machine.

2. **Copy Files**: Place all the extension files into the appropriate directory:

   ```bash
   mkdir -p ~/.local/share/gnome-shell/extensions/gnome-shell-mouse-mover@izual750.github.com
   cp -r * ~/.local/share/gnome-shell/extensions/gnome-shell-mouse-mover@izual750.github.com
   ```

3. **Compile GSettings Schemas**: Compile the schemas required for the extension settings:

   ```bash
   glib-compile-schemas ~/.local/share/gnome-shell/extensions/gnome-shell-mouse-mover@izual750.github.com/schemas
   ```

4. **Restart GNOME Shell**:

   - **On X11**: Press `Alt+F2`, type `r`, and press `Enter`.
   - **On Wayland**: Log out and log back in.

5. **Enable the Extension**:

   - Open the **GNOME Extensions** app.
   - Find **GnomeShell Mouse Mover** in the list and toggle it on.

## Usage

- **Automatic Mouse Centering**: Simply switch between windows using **Alt+Tab** as usual. The mouse cursor will automatically move to the center of the newly focused window.
- **Cursor Flash Effect**:

  - **Enable/Disable**: Open the **GNOME Extensions** app, select **GnomeShell Mouse Mover**, and access the settings. Toggle the **"Enable cursor flash effect"** option.
  - **Visual Feedback**: When enabled, a brief aura or flash effect will appear at the cursor's new location whenever it moves to the center of a window.

## Extension Settings

Access the extension's settings through the **GNOME Extensions** app. You can configure the following options:

- **Enable Cursor Flash Effect**: Toggle this option to enable or disable the cursor flash effect when the cursor moves to the center of the focused window.

## How It Works

### Automatic Mouse Movement

The extension listens for changes in the focused window using the `notify::focus-window` signal. When a new window gains focus:

1. **Check Conditions**: Ensures that both the input seat and the focused window are available.
2. **Calculate Window Center**: Determines the center coordinates of the focused window based on its frame rectangle.
3. **Move Pointer**: Warps the mouse pointer to the calculated center using `warp_pointer`.
4. **Pointer Position Check**: If the pointer is already within the focused window, it doesn't move, preventing unnecessary pointer warping.

### Multi-Monitor Support

The extension calculates the center of the focused window based on its absolute position and size, ensuring accurate cursor placement across multiple monitors, regardless of window positioning.

### Optional Cursor Flash Effect

When enabled:

1. **Create Visual Effect**: A circular Clutter actor (visual element) is created at the new cursor position.
2. **Animate Effect**: The circle fades out and scales up over 500 milliseconds, creating a flash or aura effect.
3. **Cleanup**: After the animation completes, the circle is destroyed to free resources.

## Troubleshooting

- **Extension Not Recognized**:

  - Ensure the extension directory is named `gnome-shell-mouse-mover@izual750.github.com`.
  - Verify that `metadata.json` has the correct `uuid` and includes your GNOME Shell version in `shell-version`.
  - Compile the GSettings schemas as outlined in the installation steps.

- **Extension Not Working**:

  - Check for errors by running:

    ```bash
    journalctl /usr/bin/gnome-shell -f
    ```

  - Look for any messages related to the extension and address any issues indicated.

## Compatibility

- **GNOME Shell Versions**: The extension is compatible with GNOME Shell versions **45**, **46**, and **47**.
- **Operating Systems**: Tested on **Arch Linux** with GNOME Shell.

## Contributing

Contributions are welcome! If you encounter issues or have suggestions for improvements:

- **Fork the Repository**: Make your changes and submit a pull request.
- **Report Issues**: Use the GitHub issues page to report bugs or request features.

## Acknowledgments

This extension is based on the original project by Dotrar: [gnome-centre-focus](https://github.com/Dotrar/gnome-centre-focus). Enhancements have been made to support multi-monitor setups, add optional visual effects, and improve configurability.

## License

This extension is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for details.
