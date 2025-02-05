import { all, createLowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import ruby from 'highlight.js/lib/languages/ruby';

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);
lowlight.register('ruby', ruby);

export default lowlight;
