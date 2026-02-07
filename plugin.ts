/// <reference path="../../lib/fresh.d.ts" />
const editor = getEditor();

globalThis.copy_path_handler = function(): void {
  // Get all buffers
  const buffers = editor.listBuffers();
  editor.debug(`copy_path: buffers=${JSON.stringify(buffers)}`);
  
  if (!buffers || buffers.length === 0) {
    editor.setStatus("No buffers open");
    return;
  }

  // Try to find active buffer (id != 0), otherwise use first buffer
  let buffer = buffers.find(b => b.id !== 0) || buffers[0];

  const path = buffer.path;

  if (!path) {
    editor.setStatus("File has no path (untitled)");
    return;
  }

  editor.copyToClipboard(path);
  editor.setStatus(`Copied: ${path}`);
};

editor.registerCommand(
  "copy_path",
  "Copy current file path to clipboard",
  "copy_path_handler",
  null
);

// Example: Add a keybinding in your Fresh config:
//{
//   "keyBindings": {
//     "ctrl+alt+y": "command:copy_path"
//   }
//}