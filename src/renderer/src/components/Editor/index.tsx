import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import { EditorContent, useEditor } from "@tiptap/react";

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false, // Para não usar o document default do StarterKit
      }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: "Untitled",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none",
      }),
      Document.extend({
        content: "heading block*",
      }),
    ],
    content:
      "<h1>Front-end</h1><p>Esse é o documento que explica sobre front-end</p>",
    autofocus: "end",
    editorProps: {
      attributes: {
        class: "focus:outline-none prose prose-invert prose-headings:mt-0",
      },
    },
  });

  return <EditorContent className="w-[65ch]" editor={editor} />;
}
