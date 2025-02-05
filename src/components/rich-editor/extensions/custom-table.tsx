import Table from '@tiptap/extension-table';

export const CustomTable = Table.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      { style: 'width: 100%; overflow-x: scroll; white-space: nowrap;' },
      ['table', HTMLAttributes, ['tbody', 0]],
    ];
  },
});
