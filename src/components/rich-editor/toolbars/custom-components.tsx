import { JSX, useState } from 'react';
import { Check, Heading1, Heading2, Heading3, ImagePlus, Link } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { BsYoutube } from 'react-icons/bs';
import { DialogWrapperProps, TooltipWrapperProps } from '@/interfaces/rich-text-editor';

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

export const InsertImageDialog = ({ editor }: { editor: Editor }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageWidth, setImageWidth] = useState<number>(320);
  const [imageHeight, setImageHeight] = useState<number>(320);
  const [imageModal, setImageModal] = useState(false);
  const { toast } = useToast();
  const urlPattern =
    /^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

  const addImage = () => {
    if (!imageUrl) {
      return;
    }

    if (urlPattern.test(imageUrl)) {
      editor
        .chain()
        .focus()
        // @ts-expect-error Let's ignore this compile error because this function accepts all variables
        .setImage({ src: imageUrl, width: `${imageWidth}px`, height: `${imageHeight}px` })
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
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" type="url" onChange={(event) => setImageUrl(event.target.value)} />
          </div>
          <Button type="submit" onClick={() => addImage()} size="sm" className="px-3">
            <span className="sr-only">Insert</span>
            <Check />
          </Button>
        </div>
      }
      footer={
        <>
          <div className="w-full md:w-1/2">
            Image width
            <span className="flex gap-2 items-center mt-3">
              <Input
                type="number"
                size={50}
                defaultValue={imageWidth}
                onChange={(event) => setImageWidth(+event.target.value)}
              />
              px
            </span>
          </div>
          <div className="w-full md:w-1/2">
            Image height
            <span className="flex gap-2 items-center mt-3">
              <Input
                type="number"
                defaultValue={imageHeight}
                className=" inline"
                onChange={(event) => setImageHeight(+event.target.value)}
              />
              px
            </span>
          </div>
        </>
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
  const urlPattern =
    /^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

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
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" type="url" onChange={(event) => setVideoUrl(event.target.value)} />
          </div>
          <Button type="submit" onClick={() => addVideo()} size="sm" className="px-3">
            <span className="sr-only">Insert</span>
            <Check />
          </Button>
        </div>
      }
      footer={
        <>
          <div className="w-full md:w-1/2">
            Width
            <span className="flex gap-2 items-center mt-3">
              <Input
                type="number"
                size={50}
                defaultValue={width}
                onChange={(event) => setWidth(+event.target.value)}
              />
              px
            </span>
          </div>
          <div className="w-full md:w-1/2">
            Height
            <span className="flex gap-2 items-center mt-3">
              <Input
                type="number"
                defaultValue={height}
                className=" inline"
                onChange={(event) => setHeight(+event.target.value)}
              />
              px
            </span>
          </div>
        </>
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
    console.log('*********', previousUrl);
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
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              type="url"
              defaultValue={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
          <Button type="submit" onClick={setLink} size="sm" className="px-3">
            <span className="sr-only">Insert</span>
            <Check />
          </Button>
        </div>
      }
      footer={<></>}
    />
  );
};
