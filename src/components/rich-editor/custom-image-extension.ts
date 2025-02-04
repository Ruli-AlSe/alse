import Image from '@tiptap/extension-image';

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(), // Inherits the original attributes (src, alt, etc.)
      width: {
        default: null, // Default value
        renderHTML: (attributes) => ({
          width: attributes.width, // Renders the width attribute in HTML
        }),
      },
      height: {
        default: null,
        renderHTML: (attributes) => ({
          height: attributes.height,
        }),
      },
    };
  },
});
