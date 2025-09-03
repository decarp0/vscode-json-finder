# JSON Finder

JSON Finder is a Visual Studio Code extension that allows you to quickly find and navigate to specific keys within JSON files in your project. This tool is particularly useful for developers working with large JSON files, such as configuration or translation files.

## Features

- **Quick Search**: Use a command or hotkey to input a JSON key path like (e.g., `customers.table.header.name`) and locate its value across all JSON files in your workspace.
- **Navigate to Key**: Automatically open the file containing the key and position the cursor at the correct line.
- **Hotkey Support**: Bind a custom hotkey (`Cmd+Shift+L` on macOS or `Ctrl+Shift+L` on other platforms) for quick access.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS).
3. Search for "JSON Finder".
4. Click "Install" to add the extension to your VSCode environment.

## Usage

### Command Palette

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Type `jsonfinder: Find JSON key and value by path` and select the command.
3. Enter the JSON key path (e.g., `customers.table.header.name`).
4. The extension will search all JSON files and navigate to the line containing the key.

### Hotkey

- Press `Cmd+Shift+L` (macOS) or `Ctrl+Shift+L` (Windows/Linux) to activate the search directly.

## Configuration

You can customize the keybinding by editing your keybindings in VSCode:

1. Go to `File > Preferences > Keyboard Shortcuts`.
2. Search for `jsonfinder: Find JSON key and value by path` and modify the keybinding as desired.

## Feedback and Contributions

We welcome feedback and contributions! Please feel free to open issues or submit pull requests on our [GitHub repository](https://github.com/decarp0/vscode-json-finder).

## License

This extension is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or support, please contact [your-email@example.com](mailto:your-email@example.com).

---

Thank you for using JSON Key Navigator! We hope it enhances your productivity and makes working with JSON files easier.
