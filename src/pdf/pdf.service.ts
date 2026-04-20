import type { PdfArtifact, PdfDocumentDefinition, PdfRenderer } from './pdf.types.js';

export class PdfService {
  constructor(private readonly renderer: PdfRenderer) {}

  async renderDocument(document: PdfDocumentDefinition): Promise<PdfArtifact> {
    const buffer = await this.renderer.render(document.html);

    return {
      fileName: document.fileName,
      contentType: 'application/pdf',
      buffer,
    };
  }
}
