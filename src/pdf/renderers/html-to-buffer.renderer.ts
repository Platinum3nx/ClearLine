import type { PdfRenderer } from '../pdf.types.js';

export class HtmlToBufferRenderer implements PdfRenderer {
  async render(html: string) {
    return Buffer.from(html, 'utf-8');
  }
}
