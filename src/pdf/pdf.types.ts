export interface PdfDocumentDefinition {
  fileName: string;
  html: string;
}

export interface PdfArtifact {
  fileName: string;
  contentType: string;
  buffer: Buffer;
}

export interface PdfRenderer {
  render(html: string): Promise<Buffer>;
}
