'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Youtube from '@tiptap/extension-youtube';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';

import './styles.css';
import { EditorToolbar } from './toolbars/toolbar';
import { CustomImage } from './extensions/custom-image-extension';
import lowlight from './extensions/lowlight-config';
import { FloatingToolbar } from './toolbars/floating-toolbar';
import { BubbleToolbar } from './toolbars/bubble-toolbar';
import { Button } from '../ui/button';

const Tiptap = ({ content }: { content: string }) => {
  const editor = useEditor({
    immediatelyRender: false,
    editable: true,
    extensions: [
      CustomImage,
      Highlight,
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
      }),
      Youtube.configure({
        nocookie: true,
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
      <FloatingToolbar editor={editor} />
      <BubbleToolbar editor={editor} />

      <EditorContent
        className="p-3 min-h-[350px] border border-gray-500 focus-within:border-blue-600 focus-within:border-2"
        editor={editor}
      />

      <Button variant="outline" size="icon" onClick={() => console.log(editor.getHTML())}>
        save
      </Button>
    </div>
  );
};

export default Tiptap;
