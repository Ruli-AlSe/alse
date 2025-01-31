'use client';

import { type ForwardedRef } from 'react';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  type MDXEditorMethods,
  type MDXEditorProps,
  BlockTypeSelect,
  linkPlugin,
  CreateLink,
  linkDialogPlugin,
  InsertImage,
  imagePlugin,
  tablePlugin,
  InsertTable,
  codeBlockPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  InsertCodeBlock,
  codeMirrorPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  DirectiveDescriptor,
  directivesPlugin,
  usePublisher,
  DialogButton,
  insertDirective$,
} from '@mdxeditor/editor';

const YoutubeDirectiveDescriptor: DirectiveDescriptor = {
  name: 'youtube',
  testNode(node) {
    return node.name === 'youtube';
  },
  type: 'textDirective',
  attributes: [],
  hasChildren: true,
  Editor: ({ mdastNode }) => (
    <div className="py-5 flex justify-center items-center">
      <iframe
        src={`https://www.youtube.com/embed/${mdastNode.attributes?.id}`}
        width="100%"
        height="500px"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  ),
};

const YouTubeButton = () => {
  // grab the insertDirective action (a.k.a. publisher) from the
  // state management system of the directivesPlugin
  const insertDirective = usePublisher(insertDirective$);

  return (
    <DialogButton
      tooltipTitle="Insert Youtube video"
      submitButtonTitle="Insert video"
      dialogInputPlaceholder="Paste the youtube video URL"
      buttonContent="YT"
      onSubmit={(url) => {
        const videoId = new URL(url).searchParams.get('v');
        if (videoId) {
          insertDirective({
            name: 'youtube',
            type: 'leafDirective',
            attributes: { id: videoId },
            // children: [],
          });
        } else {
          alert('Invalid YouTube URL');
        }
      }}
    />
  );
};

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <form action={() => {}}>
      <MDXEditor
        className="w-full bg-white p-6"
        contentEditableClassName="prose"
        // onChange={setFormData}
        plugins={[
          toolbarPlugin({
            toolbarClassName: 'my-classname',
            toolbarContents: () => (
              <div className="w-full flex justify-between">
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                  <CreateLink />
                  <InsertImage />
                  <InsertTable />
                  <YouTubeButton />
                  <ConditionalContents
                    options={[
                      {
                        when: (editor) => editor?.editorType === 'codeblock',
                        contents: () => <ChangeCodeMirrorLanguage />,
                      },
                      {
                        when: (editor) => editor?.editorType === 'sandpack',
                        contents: () => <ShowSandpackInfo />,
                      },
                      {
                        fallback: () => <InsertCodeBlock />,
                      },
                    ]}
                  />
                </DiffSourceToggleWrapper>
              </div>
            ),
          }),
          linkPlugin(),
          linkDialogPlugin(),
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          imagePlugin(),
          tablePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          codeMirrorPlugin({
            codeBlockLanguages: { js: 'JavaScript', css: 'CSS', ruby: 'Ruby', tsx: 'React' },
          }),
          diffSourcePlugin({ diffMarkdown: 'An older version', viewMode: 'rich-text' }),
          directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor] }),
        ]}
        {...props}
        ref={editorRef}
      />

      <button type="submit">Save</button>
    </form>
  );
}
