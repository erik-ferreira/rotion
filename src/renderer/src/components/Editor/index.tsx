import StarterKit from "@tiptap/starter-kit"
import Document from "@tiptap/extension-document"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"

import { Heading } from "@shared/types/ipc"

export interface OnContentUpdatedParams {
  title: string
  content: string
  headings: Heading[]
}

interface EditorProps {
  content: string
  onContentUpdated: (params: OnContentUpdatedParams) => void
}

export function Editor({ content, onContentUpdated }: EditorProps) {
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
    onUpdate: ({ editor }) => {
      const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/
      const parsedContent = editor.getHTML().match(contentRegex)?.groups

      const title = parsedContent?.title ?? "Untitled"
      const content = parsedContent?.content ?? ""

      // headings to table of contents
      const headingsFilter = editor
        .getJSON()
        .content?.filter((item) => item.type === "heading")

      const headings =
        headingsFilter?.map((heading, index) => ({
          id: index + 1,
          level: heading?.attrs?.level,
          content: heading?.content ? heading?.content[0]?.text : "",
        })) || []

      onContentUpdated({
        title,
        content,
        headings,
      })
    },
    content,
    autofocus: "end",
    editorProps: {
      attributes: {
        class: "focus:outline-none prose prose-invert prose-headings:mt-0",
      },
    },
  })

  return <EditorContent className="w-[65ch]" editor={editor} />
}
