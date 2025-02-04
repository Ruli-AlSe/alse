import { Editor, FloatingMenu } from '@tiptap/react';
import { List, ListOrdered, Logs } from 'lucide-react';

import { HeadingButtons, TooltipWrapper } from './custom-components';
import { CustomButton } from '@/components/custom-button';

export const FloatingToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div data-testid="floating-menu" className="floating-menu flex gap-2">
        <HeadingButtons editor={editor} />
        <TooltipWrapper
          tooltipContent="List Item"
          element={
            <CustomButton
              buttonText=""
              extraClasses="p-2 h-7"
              buttonAsBadge
              icon={<List />}
              action={() => editor.chain().focus().toggleBulletList().run()}
            />
          }
        />
        <TooltipWrapper
          tooltipContent="Ordered List"
          element={
            <CustomButton
              buttonText=""
              extraClasses="p-2 h-7"
              buttonAsBadge
              icon={<ListOrdered />}
              action={() => editor.chain().focus().toggleOrderedList().run()}
            />
          }
        />
        <TooltipWrapper
          tooltipContent="Sink Listitem"
          element={
            <CustomButton
              buttonText=""
              extraClasses="p-2 h-7"
              buttonAsBadge
              icon={<Logs />}
              action={() => editor.chain().focus().sinkListItem('listItem').run()}
              disabled={!editor.can().sinkListItem('listItem')}
            />
          }
        />
      </div>
    </FloatingMenu>
  );
};
