import * as vscode from "vscode";
import * as jsonc from "jsonc-parser";

export function getJsonKeyPathAtPosition(
  document: vscode.TextDocument,
  position: vscode.Position
): string | null {
  const text = document.getText();
  const offset = document.offsetAt(position);

  const root = jsonc.parseTree(text);
  if (!root) return null;

  const node = jsonc.findNodeAtOffset(root, offset);
  if (!node) return null;

  const path: string[] = [];
  let current: jsonc.Node | null = node;

  while (current && current.parent) {
    if (current.parent.type === "property") {
      const keyNode = current.parent.children?.[0];
      if (keyNode && keyNode.value) {
        path.unshift(keyNode.value.toString());
      }
    }
    current = current.parent;
  }

  return path.length ? path.join(".") : null;
}
