import { useState, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  SeparatorHorizontal,
  AlignJustify,
} from 'lucide-react';

import {
  InsertImageDialog,
  InsertTableDialog,
  InsertYoutubeDialog,
  TooltipWrapper,
} from './custom-components';
import { BsBlockquoteLeft } from 'react-icons/bs';
import { CustomButton } from '../../custom-button';

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const buttons = [
    {
      tooltipContent: 'Block quote',
      icon: <BsBlockquoteLeft className="h-5 w-5" />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      tooltipContent: 'Horizontal separator',
      icon: <SeparatorHorizontal />,
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      tooltipContent: 'Align left',
      icon: <AlignLeft className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign('left').run(),
    },
    {
      tooltipContent: 'Align center',
      icon: <AlignCenter className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign('center').run(),
    },
    {
      tooltipContent: 'Align right',
      icon: <AlignRight className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign('right').run(),
    },
    {
      tooltipContent: 'Justify',
      icon: <AlignJustify className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign('justify').run(),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const editor = document.getElementById('content-editor');
      const editorYPosition = editor?.getClientRects()[0].y || 1000;

      setIsSticky(editorYPosition - 100 < 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`bg-background border-b p-2 transition-all duration-300 ${
        isSticky ? 'fixed top-0 left-0 right-0 shadow-md z-50' : ''
      }`}
    >
      <div className="container mx-auto flex flex-wrap gap-2 items-center">
        {buttons.map(({ tooltipContent, icon, action }) => (
          <TooltipWrapper
            key={tooltipContent}
            tooltipContent={tooltipContent}
            element={
              <CustomButton
                buttonText=""
                extraClasses="p-2 h-7"
                buttonAsBadge
                icon={icon}
                action={action}
              />
            }
          />
        ))}
        <InsertImageDialog editor={editor} />
        <InsertYoutubeDialog editor={editor} />
        <InsertTableDialog editor={editor} />
      </div>
    </div>
  );
}
