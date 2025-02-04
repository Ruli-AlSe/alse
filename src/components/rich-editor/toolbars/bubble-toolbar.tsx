import { BubbleMenu, Editor } from '@tiptap/react';
import { Bold, Highlighter, Italic, Strikethrough } from 'lucide-react';

import { InsertLinkDialog, TooltipWrapper } from './custom-components';
import { CustomButton } from '@/components/custom-button';

export const BubbleToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="bubble-menu flex gap-2">
        <TooltipWrapper
          tooltipContent="Bold"
          element={
            <CustomButton
              buttonText=""
              extraClasses="p-2 h-7"
              buttonAsBadge
              icon={<Bold className="h-4 w-4" />}
              action={() => editor.chain().focus().toggleBold().run()}
            />
          }
        />
        <TooltipWrapper
          tooltipContent="Italic"
          element={
            <CustomButton
              buttonText=""
              extraClasses="p-2 h-7"
              buttonAsBadge
              icon={<Italic className="h-4 w-4" />}
              action={() => editor.chain().focus().toggleItalic().run()}
            />
          }
        />
        <TooltipWrapper
          tooltipContent="Strike"
          element={
            <CustomButton
              buttonText=""
              extraClasses="p-2 h-7"
              buttonAsBadge
              icon={<Strikethrough className="h-4 w-4" />}
              action={() => editor.chain().focus().toggleStrike().run()}
            />
          }
        />
        <TooltipWrapper
          tooltipContent="Highlight"
          element={
            <CustomButton
              buttonText=""
              extraClasses="p-2 h-7"
              buttonAsBadge
              icon={<Highlighter className="h-4 w-4" />}
              action={() => editor.chain().focus().toggleHighlight().run()}
            />
          }
        />
        <InsertLinkDialog editor={editor} />
      </div>
    </BubbleMenu>
  );
};
