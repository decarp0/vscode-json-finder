import * as vscode from "vscode";
import * as fs from "fs";
import { navigateToResult } from "./navigateToResult";

export function findInJsonFiles(files: vscode.Uri[], key: string) {
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
