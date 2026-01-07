import * as vscode from "vscode";

export async function navigateToResult(
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

function navigateToLine(editor: vscode.TextEditor, lineNumber: number) {
  const position = new vscode.Position(lineNumber, 0);
  editor.selection = new vscode.Selection(position, position);
  editor.revealRange(
    new vscode.Range(position, position),
    vscode.TextEditorRevealType.InCenter
  );
}
