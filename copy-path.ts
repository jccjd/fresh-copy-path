/// <reference path="../../lib/fresh.d.ts" />
const editor = getEditor();

globalThis.copy_path_handler = function(): void {
  editor.debug("copy_path: Starting...");
  
  // Get the currently active buffer ID
  const bufferId = editor.getActiveBufferId();
  editor.debug(`copy_path: bufferId=${bufferId} (type: ${typeof bufferId})`);
  
  let path: string | undefined;
  
  if (bufferId && bufferId !== 0) {
    // Normal case: we have an active buffer
    path = editor.getBufferPath(bufferId);
    editor.debug(`copy_path: Got path from active buffer: ${path}`);
  } else {
    // Fallback: no active buffer, try to get the first buffer with a path
    editor.debug("copy_path: No active buffer, trying listBuffers() fallback");
    const buffers = editor.listBuffers() as Array<{ id: number; path?: string }>;
    editor.debug(`copy_path: buffers=${JSON.stringify(buffers)}`);
    
    // Find the first buffer with a valid path
    const bufferWithPath = buffers.find(b => b.path && b.path !== "");
    if (bufferWithPath) {
      path = bufferWithPath.path;
      editor.debug(`copy_path: Got path from listBuffers: ${path}`);
    }
  }

  if (!path || path === "") {
    editor.setStatus("No file with a valid path found");
    editor.debug("copy_path: No valid path found");
    return;
  }

  editor.copyToClipboard(path);
  editor.setStatus(`Copied: ${path}`);
  editor.debug(`copy_path: Success! Copied ${path}`);
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