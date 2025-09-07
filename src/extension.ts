// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

const COMMAND = "jsonfinder.findJsonKeyByPath";
const INPUT = {
  prompt: "Enter JSON key path",
};
const INCLUDED_FILES = "**/*.json";
const EXCLUDED_FILES = "{**/node_modules/**,**/dist/**,**/build/**}";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(COMMAND, async () => {
    const key = await vscode.window.showInputBox(INPUT);
    if (!key) return;

    const files = await vscode.workspace.findFiles(
      INCLUDED_FILES,
      EXCLUDED_FILES
    );

    performSearch(files, key);
  });

  context.subscriptions.push(disposable);
}

function performSearch(files: vscode.Uri[], key: string) {
  let found = false;

  for (const file of files) {
    found = searchInFile(file, key);
    if (found) break;
  }

  if (!found) {
    vscode.window.showWarningMessage(`Path '${key}' not found.`);
  }
}

function searchInFile(file: vscode.Uri, key: string) {
  try {
    const content = fs.readFileSync(file.fsPath, "utf8");
    const json = JSON.parse(content);
    const value = findValue(json, key.split("."));

    if (value !== undefined) {
      const lineNumber = navigateToResult(file, content, key);

      vscode.window.showInformationMessage(
        `Found value: ${value} in ${file.fsPath}:${lineNumber}`
      );
      return true;
    }
  } catch (error) {
    console.error(`Error reading or parsing ${file.fsPath}:`, error);
  }
  return false;
}

async function navigateToResult(
  file: vscode.Uri,
  content: string,
  key: string
) {
  const document = await vscode.workspace.openTextDocument(file.fsPath);
  const editor = await vscode.window.showTextDocument(document);

  // Find the line number containing the key
  let lineNumber = findLineNumber(content, key.split("."));

  if (lineNumber !== -1) {
    navigateToLine(editor, lineNumber);
  }
  return lineNumber;
}

function navigateToLine(editor: vscode.TextEditor, lineNumber: number) {
  const position = new vscode.Position(lineNumber, 0);
  editor.selection = new vscode.Selection(position, position);
  editor.revealRange(
    new vscode.Range(position, position),
    vscode.TextEditorRevealType.InCenter
  );
}

function findValue(obj: any, keys: string[]): any {
  let current = obj;
  for (const key of keys) {
    if (current[key] === undefined) {
      // Check for linear key
      const linearKey = keys.join(".");
      if (obj[linearKey] !== undefined) {
        return obj[linearKey];
      }
      return undefined;
    }
    current = current[key];
  }
  return current;
}

function findLineNumber(content: string, keys: string[]): number {
  const lines = content.split("\n");
  const path = keys.join(".");
  let currentPath = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check for nested keys
    if (line.includes(`"${keys[0]}"`)) {
      currentPath = keys.shift()!;
      if (keys.length === 0) {
        return i;
      }
    }

    // Check for linear key
    if (line.includes(`"${path}"`)) {
      return i;
    }
  }
  return -1;
}

export function deactivate() {}
