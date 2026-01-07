import * as vscode from "vscode";
import * as fs from "fs";
import { EXCLUDED_FILES } from "../../extension";

export async function findFirstUsage(keyPath: string) {
  const files = await vscode.workspace.findFiles(
    "**/*.{ts,tsx,js,jsx,html}",
    EXCLUDED_FILES
  );

  for (const file of files) {
    const content = fs.readFileSync(file.fsPath, "utf8");
    const index = content.indexOf(keyPath);

    if (index !== -1) {
      const document = await vscode.workspace.openTextDocument(file);
      const editor = await vscode.window.showTextDocument(document);

      const position = document.positionAt(index);
      editor.selection = new vscode.Selection(position, position);
      editor.revealRange(new vscode.Range(position, position));

      vscode.window.showInformationMessage(`Found usage in ${file.fsPath}`);
      return;
    }
  }

  vscode.window.showWarningMessage(`No usage found for '${keyPath}'`);
}
