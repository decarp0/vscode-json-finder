import * as vscode from "vscode";

export function getTranslationKeyAtPosition(
  document: vscode.TextDocument,
  position: vscode.Position
): string | null {
  const text = document.getText();
  const offset = document.offsetAt(position);

  // Matches t('something.like.this') or t("something.like.this")
  const regex = /t\(\s*['"]([^'"]+)['"]\s*\)/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const fullMatchStart = match.index;
    const fullMatchEnd = regex.lastIndex;

    // The captured group (the key)
    const keyStart = fullMatchStart + match[0].indexOf(match[1]);
    const keyEnd = keyStart + match[1].length;

    // Check if cursor is inside the key string
    if (offset >= keyStart && offset <= keyEnd) {
      return match[1]; // e.g. "paymentHistory.tabs.paymentExport"
    }
  }

  return null;
}
