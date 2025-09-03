// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "jsonfinder.findJsonKeyByPath",
    async () => {
      const key = await vscode.window.showInputBox({
        prompt: "Enter JSON key path",
      });
      if (!key) return;

      const files = await vscode.workspace.findFiles("**/*.json");
      let found = false;

      for (const file of files) {
        try {
          const content = fs.readFileSync(file.fsPath, "utf8");
          const json = JSON.parse(content);
          const value = findValue(json, key.split("."));

          if (value !== undefined) {
            const document = await vscode.workspace.openTextDocument(
              file.fsPath
            );
            const editor = await vscode.window.showTextDocument(document);

            // Find the line number containing the key
            const lines = content.split("\n");
            let lineNumber = findLineNumber(content, key.split("."));

            if (lineNumber !== -1) {
              const position = new vscode.Position(lineNumber, 0);
              editor.selection = new vscode.Selection(position, position);
              editor.revealRange(new vscode.Range(position, position));
            }

            vscode.window.showInformationMessage(
              `Found value: ${value} in ${file.fsPath}:${lineNumber}`
            );
            found = true;
            break;
          }
        } catch (error) {
          console.error(`Error reading or parsing ${file.fsPath}:`, error);
        }
      }
      if (!found) {
        vscode.window.showWarningMessage(`Path '${key}' not found.`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

function findValue(obj: any, keys: string[]): any {
  let current = obj;
  for (const key of keys) {
    if (current[key] === undefined) return undefined;
    current = current[key];
  }
  return current;
}

function findLineNumber(content: string, keys: string[]): number {
  const lines = content.split("\n");
  let currentPath = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith(`"${keys[0]}"`)) {
      currentPath = keys.shift()!;
      if (keys.length === 0) {
        return i;
      }
    } else if (currentPath && line.includes(`"${keys[0]}"`)) {
      currentPath = keys.shift()!;
      if (keys.length === 0) {
        return i;
      }
    }
  }
  return -1;
}

export function deactivate() {}
