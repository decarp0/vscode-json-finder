# JSON Finder

JSON Finder is a Visual Studio Code extension that allows you to quickly find and navigate to specific keys e.g. i18n translation keys as JSON paths within JSON files in your project. This tool is particularly useful for developers working with large JSON files, such as configuration or translation files.

## Features

- **Quick Search**: Use a command or hotkey to input a JSON key path like (e.g. an i18n translation key: `customers.table.header.name`) and locate its value across all JSON files in your workspace.
- **Navigate to Key**: Automatically open the file containing the key and position the cursor at the correct line.
- **Hotkey Support**: Bind a custom hotkey (`Cmd+Shift+L` on macOS or `Ctrl+Shift+L` on other platforms) for quick access.

![Demo](https://github.com/decarp0/vscode-json-finder/blob/main/images/preview1.gif?raw=true)

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS).
3. Search for "JSON Finder".
4. Click "Install" to add the extension to your VSCode environment.

## Usage

### Command Palette

#### Find JSON key in JSON file:

1. Put your cursor at the i18n translation key e.g. `customers.table.header.name`.
2. Right click and select `jsonfinder: Find JSON key and value by path`.
3. The extension will search all JSON files and navigate to the line containing the key.

#### Find usage of JSON key in other files:

1. Put your cursor at the i18n translation key e.g. `name`.
2. Right click and select `jsonfinder: Find Usage of Translation Key`.
3. The extension will search all files and navigate to the line containing the usage of the (nested) key.

### Hotkey

- Press `Cmd+Shift+L` (macOS) or `Ctrl+Shift+L` (Windows/Linux) to activate the search directly. Make sure your cursor is on the key.

## Configuration

You can customize the keybinding by editing your keybindings in VSCode:

1. Go to `File > Preferences > Keyboard Shortcuts`.
2. Search for `jsonfinder: Find JSON key and value by path` and modify the keybinding as desired.

## Feedback and Contributions

We welcome feedback and contributions! Please feel free to open issues or submit pull requests on our [GitHub repository](https://github.com/decarp0/vscode-json-finder).

## License

This extension is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using JSON Finder! We hope it enhances your productivity and makes working with JSON files easier.
