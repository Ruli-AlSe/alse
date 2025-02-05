import { Editor, FloatingMenu } from '@tiptap/react';
import { List, ListOrdered, Logs } from 'lucide-react';

import { HeadingButtons, TooltipWrapper } from './custom-components';
import { CustomButton } from '@/components/custom-button';

export const FloatingToolbar = ({ editor }: { editor: Editor }) => {
  const toolbarButtons = [
    {
      tooltipContent: 'List Item',
      icon: <List className="h-4 w-4" />,
      disabled: false,
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      tooltipContent: 'Ordered List',
      icon: <ListOrdered className="h-4 w-4" />,
      disabled: false,
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      tooltipContent: 'Sink Listitem',
      icon: <Logs className="h-4 w-4" />,
      action: () => editor.chain().focus().sinkListItem('listItem').run(),
      disabled: !editor.can().sinkListItem('listItem'),
    },
  ];

  return (
    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div
        data-testid="floating-menu"
        className="floating-menu py-2 flex gap-2 overflow-x-scroll max-w-[14rem] md:max-w-fit whitespace-nowrap"
      >
        <HeadingButtons editor={editor} />

        {toolbarButtons.map(({ tooltipContent, icon, action, disabled }) => (
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
                disabled={disabled}
              />
            }
          />
        ))}
      </div>
    </FloatingMenu>
  );
};
