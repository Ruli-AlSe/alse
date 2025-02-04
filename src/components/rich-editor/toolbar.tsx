import { useState, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Logs,
  SeparatorHorizontal,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HeadingButtons, InsertImageDialog, TooltipWrapper } from './toolbar-components';
import { BsBlockquoteLeft } from 'react-icons/bs';
import { CustomButton } from '../custom-button';

interface EditorToolbarProps {
  onFormatClick: (format: string) => void;
  editor: Editor;
}

export function EditorToolbar({ onFormatClick, editor }: EditorToolbarProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
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
        <HeadingButtons editor={editor} /> |{' '}
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
        />{' '}
        |{' '}
        <TooltipWrapper
          tooltipContent="Block quote"
          element={
            <CustomButton
              buttonText=""
              extraClasses="p-2 h-7"
              buttonAsBadge
              icon={<BsBlockquoteLeft className="h-5 w-5" />}
              action={() => editor.chain().focus().toggleBlockquote().run()}
            />
          }
        />
        <TooltipWrapper
          tooltipContent="Horizontal separator"
          element={
            <CustomButton
              buttonText=""
              extraClasses="p-2 h-7"
              buttonAsBadge
              icon={<SeparatorHorizontal />}
              action={() => editor.chain().focus().setHorizontalRule().run()}
            />
          }
        />
        <InsertImageDialog editor={editor} />
        {/* <TooltipWrapper
          tooltipContent="Edit image size"
          element={
            <CustomButton
              buttonText=""
              extraClasses="p-2 h-7"
              buttonAsBadge
              icon={<SeparatorHorizontal />}
              action={() => console.log('works')}
              disabled={!editor.isActive('image')}
            />
          }
        /> */}
        <Button variant="outline" size="icon" onClick={() => onFormatClick('bold')}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onFormatClick('italic')}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onFormatClick('underline')}>
          <Underline className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onFormatClick('alignLeft')}>
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onFormatClick('alignCenter')}>
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onFormatClick('alignRight')}>
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onFormatClick('bulletList')}>
          <List className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onFormatClick('numberedList')}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onFormatClick('link')}>
          <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
