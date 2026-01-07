// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { findInJsonFiles } from "./functions/jsonFinder/findInJsonFiles";
import { getJsonKeyPathAtPosition } from "./functions/usageFinder/getJsonKeyPathAtPosition";
import { findFirstUsage } from "./functions/usageFinder/findFirstUsage";
import { getTranslationKeyAtPosition } from "./functions/jsonFinder/getTranslationKeyAtPosition";

const COMMAND_FIND_JSON = "jsonfinder.findJsonKeyByPath";
const COMMAND_FIND_USAGE = "jsonfinder.findUsageByValue";

export const INCLUDED_FILES = "**/*.json";
export const EXCLUDED_FILES =
  "{**/node_modules/**,**/dist/**,**/build/**,**/.*}";

const findJson = async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage("Could not determine Editor.");
    return;
  }
  const document = editor.document;
  const position = editor.selection.active;
  const keyPath = getTranslationKeyAtPosition(document, position);
  if (!keyPath) {
    vscode.window.showWarningMessage("Could not determine JSON key path.");
    return;
  }
  const files = await vscode.workspace.findFiles(
    INCLUDED_FILES,
    EXCLUDED_FILES
  );

  findInJsonFiles(files, keyPath);
};

const findUsage = async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage("Could not determine Editor.");
    return;
  }
  const document = editor.document;
  const position = editor.selection.active;
  const keyPath = getJsonKeyPathAtPosition(document, position);
  if (!keyPath) {
    vscode.window.showWarningMessage("Could not determine JSON key path.");
    return;
  }
  vscode.window.showInformationMessage("Looking up: " + keyPath);

  findFirstUsage(keyPath);
};

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(COMMAND_FIND_JSON, findJson);

  context.subscriptions.push(
    vscode.commands.registerCommand(COMMAND_FIND_USAGE, findUsage)
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
