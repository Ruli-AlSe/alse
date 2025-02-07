'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Youtube from '@tiptap/extension-youtube';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

import './styles.css';
import { EditorToolbar } from './toolbars/toolbar';
import { CustomImage } from './extensions/custom-image';
import lowlight from './extensions/lowlight-config';
import { FloatingToolbar } from './toolbars/floating-toolbar';
import { BubbleToolbar } from './toolbars/bubble-toolbar';
import { cn } from '@/lib/utils';
import { CustomButton } from '../custom-button';
import { Save } from 'lucide-react';
import { CustomTable } from './extensions/custom-table';
import FadeContent from '../animations/fade-content';

const Tiptap = ({ content, editable = true }: { content: string; editable?: boolean }) => {
  const editor = useEditor({
    immediatelyRender: false,
    editable,
    extensions: [
      CustomImage,
      Highlight,
      StarterKit,
      Subscript,
      Superscript,
      Underline,
      CustomTable.configure({
        resizable: true,
        allowTableNodeSelection: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
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
      <FadeContent direction="vertical" className="w-full">
        {editable && (
          <>
            <EditorToolbar editor={editor} />
            <FloatingToolbar editor={editor} />
            <BubbleToolbar editor={editor} />
          </>
        )}

        <EditorContent
          id="content-editor"
          className={cn('p-3 min-h-[350px] w-full overflow-x-scroll whitespace-nowrap mb-10', {
            'border border-gray-500 focus-within:border-blue-600 focus-within:border-2 mb-2':
              editable,
          })}
          editor={editor}
        />

        {editable && (
          <div className="w-full flex justify-end">
            <CustomButton
              buttonText="Save article"
              extraClasses="p-5 mb-10 mt-3"
              icon={<Save />}
              action={() => console.log(editor.getHTML())}
            />
          </div>
        )}
      </FadeContent>
    </div>
  );
};

export default Tiptap;
