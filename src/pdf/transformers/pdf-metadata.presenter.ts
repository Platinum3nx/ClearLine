import type { PdfArtifact } from '../pdf.types.js';

export function presentPdfMetadata(artifact: PdfArtifact) {
  return {
    fileName: artifact.fileName,
    contentType: artifact.contentType,
    sizeBytes: artifact.buffer.byteLength,
  };
}
