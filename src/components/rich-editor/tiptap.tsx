'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import './styles.css';
import { EditorToolbar } from './toolbar';
import { CustomImage } from './custom-image-extension';
import lowlight from './lowlight-config';

const Tiptap = ({ content }: { content: string }) => {
  const editor = useEditor({
    immediatelyRender: false,
    editable: true,
    extensions: [
      CustomImage,
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <EditorToolbar onFormatClick={() => {}} editor={editor} />
      <EditorContent
        className="p-3 min-h-[350px] border border-gray-500 focus-within:border-blue-600 focus-within:border-2"
        editor={editor}
      />
    </div>
  );
};

export default Tiptap;
