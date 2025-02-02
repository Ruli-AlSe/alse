'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import Image from '@tiptap/extension-image';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import ruby from 'highlight.js/lib/languages/ruby';

import './styles.css';
import { EditorToolbar } from './toolbar';

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);
lowlight.register('ruby', ruby);

const Tiptap = ({ content }: { content: string }) => {
  const editor = useEditor({
    immediatelyRender: false,
    editable: true,
    extensions: [
      Image.configure({ HTMLAttributes: { width: '50%', contentEditable: true } }),
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
