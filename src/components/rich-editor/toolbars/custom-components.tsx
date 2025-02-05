import { JSX, useState } from 'react';
import { Check, Heading1, Heading2, Heading3, ImagePlus, Link } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { BsYoutube } from 'react-icons/bs';
import {
  DialogWrapperProps,
  LinkInputProps,
  TooltipWrapperProps,
  WidthHeightControlsProps,
} from '@/interfaces/rich-text-editor';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { CustomButton } from '../../custom-button';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const urlPattern =
  /^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

export const TooltipWrapper = ({ tooltipContent, element }: TooltipWrapperProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{element}</TooltipTrigger>
        <TooltipContent>
          <p className="bg-white text-black text-xs px-3 py-1 rounded-md">{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const HeadingButtons = ({ editor }: { editor: Editor }) => {
  const getHeadingIcon = (level: number) => {
    switch (level) {
      case 1:
        return <Heading1 />;
      case 2:
        return <Heading2 />;
      case 3:
        return <Heading3 />;
    }
  };

  return (
    <>
      {[1, 2, 3].map((level) => (
        <TooltipWrapper
          key={level}
          tooltipContent={`Heading ${level}`}
          element={
            <CustomButton
              buttonAsBadge
              buttonText=""
              extraClasses="p-2 h-7"
              icon={getHeadingIcon(level) as JSX.Element}
              disabled={editor.isActive('heading', { level: level })}
              action={() =>
                editor
                  .chain()
                  .focus()
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .toggleHeading({ level: level as any })
                  .run()
              }
            />
          }
        />
      ))}
    </>
  );
};

export const DialogWrapper = ({
  openModal,
  triggerElement,
  dialogTitle,
  content,
  footer,
  openChange,
}: DialogWrapperProps) => {
  return (
    <Dialog open={openModal} onOpenChange={openChange}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        {content}
        <DialogFooter className="w-full flex flex-col md:flex-row justify-between gap-5">
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const LinkInput = ({
  label,
  icon,
  buttonText,
  onChangeAction,
  onClickAction,
}: LinkInputProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="link" className="sr-only">
          {label}
        </Label>
        <Input id="link" type="url" onChange={onChangeAction} />
      </div>
      <Button type="submit" onClick={onClickAction} size="sm" className="px-3">
        <span className="sr-only">{buttonText}</span>
        {icon}
      </Button>
    </div>
  );
};

export const WidthHeightControls = ({
  widthLabel,
  heightLabel,
  defaultWidth,
  defaultHeight,
  onChangeWidthAction,
  onChangeHeightAction,
}: WidthHeightControlsProps) => {
  return (
    <>
      <div className="w-full md:w-1/2">
        {widthLabel}
        <span className="flex gap-2 items-center mt-3">
          <Input
            type="number"
            size={50}
            defaultValue={defaultWidth}
            onChange={onChangeWidthAction}
          />
          px
        </span>
      </div>
      <div className="w-full md:w-1/2">
        {heightLabel}
        <span className="flex gap-2 items-center mt-3">
          <Input
            type="number"
            defaultValue={defaultHeight}
            className=" inline"
            onChange={onChangeHeightAction}
          />
          px
        </span>
      </div>
    </>
  );
};

export const InsertImageDialog = ({ editor }: { editor: Editor }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageWidth, setImageWidth] = useState<number>(320);
  const [imageHeight, setImageHeight] = useState<number>(320);
  const [imageModal, setImageModal] = useState(false);
  const { toast } = useToast();

  const addImage = () => {
    if (!imageUrl) {
      return;
    }

    if (urlPattern.test(imageUrl)) {
      const validWidth = Math.max(320, imageWidth) || 320;
      const validHeight = Math.max(320, imageHeight) || 320;

      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
          // @ts-expect-error Let's ignore this compile error because this function accepts all variables
          width: `${validWidth}px`,
          height: `${validHeight}px`,
        })
        .run();
      editor.setOptions();
      setImageModal(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please enter a valid URL with HTPPS protocol.',
      });
    }
  };

  return (
    <DialogWrapper
      openModal={imageModal}
      openChange={setImageModal}
      dialogTitle="Paste the image URL"
      triggerElement={
        <TooltipWrapper
          tooltipContent="Insert image"
          element={
            <Badge
              onClick={() => setImageModal(true)}
              variant="default"
              className="rounded-md px-3 p-2 h-7"
            >
              <ImagePlus />
            </Badge>
          }
        />
      }
      content={
        <LinkInput
          label="Link"
          buttonText="Insert"
          icon={<Check />}
          onClickAction={addImage}
          onChangeAction={(event) => setImageUrl(event.target.value)}
        />
      }
      footer={
        <WidthHeightControls
          widthLabel="Image width"
          heightLabel="Image height"
          defaultWidth={imageWidth}
          defaultHeight={imageHeight}
          onChangeWidthAction={(event) => setImageWidth(+event.target.value)}
          onChangeHeightAction={(event) => setImageHeight(+event.target.value)}
        />
      }
    />
  );
};

export const InsertYoutubeDialog = ({ editor }: { editor: Editor }) => {
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [height, setHeight] = useState(480);
  const [width, setWidth] = useState(640);
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();

  const addVideo = () => {
    if (!videoUrl) {
      return;
    }

    if (urlPattern.test(videoUrl)) {
      editor.commands.setYoutubeVideo({
        src: videoUrl,
        width: Math.max(320, width) || 640,
        height: Math.max(180, height) || 480,
      });

      setShowModal(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please enter a valid URL with HTPPS protocol.',
      });
    }
  };

  return (
    <DialogWrapper
      openModal={showModal}
      openChange={setShowModal}
      dialogTitle="Paste the video URL"
      triggerElement={
        <TooltipWrapper
          tooltipContent="Insert YouTube video"
          element={
            <Badge
              onClick={() => setShowModal(true)}
              variant="default"
              className="rounded-md px-3 p-2 h-7"
            >
              <BsYoutube className="w-5 h-5" />
            </Badge>
          }
        />
      }
      content={
        <LinkInput
          label="Video URL"
          buttonText="Insert"
          icon={<Check />}
          onClickAction={addVideo}
          onChangeAction={(event) => setVideoUrl(event.target.value)}
        />
      }
      footer={
        <WidthHeightControls
          widthLabel="Video width"
          heightLabel="Video height"
          defaultWidth={width}
          defaultHeight={height}
          onChangeWidthAction={(event) => setWidth(+event.target.value)}
          onChangeHeightAction={(event) => setHeight(+event.target.value)}
        />
      }
    />
  );
};

export const InsertLinkDialog = ({ editor }: { editor: Editor }) => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();

  const onClickTrigger = () => {
    const previousUrl = editor.getAttributes('link').href;
    setUrl(previousUrl);
    setShowModal(true);
  };

  const setLink = () => {
    setShowModal(false);

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // cancelled
    if (!url) {
      return;
    }

    // update link
    try {
      editor.chain().focus().setLink({ href: url }).run();

      setUrl(undefined);
    } catch (error: unknown) {
      console.error(JSON.stringify(error));
      setShowModal(false);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please enter a valid URL with HTPPS protocol.',
      });
    }
  };

  return (
    <DialogWrapper
      openModal={showModal}
      openChange={setShowModal}
      dialogTitle="Paste the link URL"
      triggerElement={
        <TooltipWrapper
          tooltipContent="Insert link url"
          element={
            <Badge onClick={onClickTrigger} variant="default" className="rounded-md px-3 p-2 h-7">
              <Link className="w-5 h-5" />
            </Badge>
          }
        />
      }
      content={
        <LinkInput
          label="Link"
          buttonText="Insert"
          icon={<Check />}
          onClickAction={setLink}
          onChangeAction={(event) => setUrl(event.target.value)}
        />
      }
      footer={<></>}
    />
  );
};

export const InsertTableDialog = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Badge
          onClick={() => setOpen(true)}
          variant="default"
          className="cursor-pointer rounded-md px-3 p-2 h-7"
        >
          Table resources
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-full grid grid-cols-2 md:grid-cols-3 items-center gap-2">
        <CustomButton
          buttonAsBadge
          buttonText="Insert table"
          extraClasses="p-2 h-7"
          icon={<></>}
          action={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        />
        <CustomButton
          buttonAsBadge
          buttonText="Delete table"
          extraClasses="p-2 h-7"
          icon={<></>}
          action={() => editor.chain().focus().deleteTable().run()}
        />
        <CustomButton
          buttonAsBadge
          buttonText="Add column after"
          extraClasses="p-2 h-7"
          icon={<></>}
          action={() => editor.chain().focus().addColumnAfter().run()}
        />
        <CustomButton
          buttonAsBadge
          buttonText="Delete column"
          extraClasses="p-2 h-7"
          icon={<></>}
          action={() => editor.chain().focus().deleteColumn().run()}
        />
        <CustomButton
          buttonAsBadge
          buttonText="Add row after"
          extraClasses="p-2 h-7"
          icon={<></>}
          action={() => editor.chain().focus().addRowAfter().run()}
        />
        <CustomButton
          buttonAsBadge
          buttonText="Delete row"
          extraClasses="p-2 h-7"
          icon={<></>}
          action={() => editor.chain().focus().deleteRow().run()}
        />
        <CustomButton
          buttonAsBadge
          buttonText="Merge or split cells"
          extraClasses="p-2 h-7"
          icon={<></>}
          action={() => editor.chain().focus().mergeOrSplit().run()}
        />
        <CustomButton
          buttonAsBadge
          buttonText="Toggle header cell"
          extraClasses="p-2 h-7"
          icon={<></>}
          action={() => editor.chain().focus().toggleHeaderCell().run()}
        />
      </PopoverContent>
    </Popover>
  );
};
