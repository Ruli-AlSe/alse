import { BubbleMenu, Editor } from '@tiptap/react';
import {
  Bold,
  Highlighter,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from 'lucide-react';

import { InsertLinkDialog, TooltipWrapper } from './custom-components';
import { CustomButton } from '@/components/custom-button';

export const BubbleToolbar = ({ editor }: { editor: Editor }) => {
  const toolbarButtons = [
    {
      tooltipContent: 'Bold',
      icon: <Bold className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      tooltipContent: 'Italic',
      icon: <Italic className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      tooltipContent: 'Strike',
      icon: <Strikethrough className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      tooltipContent: 'Underline',
      icon: <Underline className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      tooltipContent: 'Highlight',
      icon: <Highlighter className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleHighlight().run(),
    },
    {
      tooltipContent: 'Subscript',
      icon: <Subscript className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleSubscript().run(),
    },
    {
      tooltipContent: 'Superscript',
      icon: <Superscript className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleSuperscript().run(),
    },
  ];

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="bubble-menu p-2 flex gap-2 overflow-x-scroll max-w-[14rem] md:max-w-fit whitespace-nowrap">
        {toolbarButtons.map(({ tooltipContent, icon, action }) => (
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
        <InsertLinkDialog editor={editor} />
      </div>
    </BubbleMenu>
  );
};
