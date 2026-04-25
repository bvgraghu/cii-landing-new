"use client";

import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Setting the worker source from a CDN to avoid complex build configurations
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFCoverProps {
  pdfPath: string;
}

const PDFCover: React.FC<PDFCoverProps> = ({ pdfPath }) => {
  return (
    <div className="w-full h-full overflow-hidden flex items-start justify-center bg-slate-900 relative">
      <Document
        file={pdfPath}
        loading={
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        }
        error={
          <div className="text-[10px] text-white/20 p-4 text-center">
            Failed to load cover
          </div>
        }
      >
        <Page
          pageNumber={1}
          width={300} // Oversized to ensure coverage
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="shadow-2xl"
        />
      </Document>
      {/* Subtle overlay to blend the PDF canvas better */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </div>
  );
};

export default PDFCover;
