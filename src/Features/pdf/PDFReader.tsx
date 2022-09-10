import { Button, Group, Stack } from "@mantine/core";
import { dialog, fs } from "@tauri-apps/api";
// import { convertFileSrc } from "@tauri-apps/api/tauri";
// import * as pdfjsLib from "pdfjs-dist";
import { useRef, useState } from "react";
import { Document, Page } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `../../../node_modules/pdfjs-dist/build/pdf.worker.js`;
// "../../../node_modules/pdfjs-dist/build/pdf.worker.js";

// let pageNum = 1;
// let pageRendering = false;
// let pageNumPending = 0;
// let scale = 6;

const PDFReader = () => {
  const [doc, setDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  function onDocumentLoadSuccess({ numPages }) {
    console.log("PDF loaded", numPages);
    setNumPages(numPages);
  }

  return (
    <Stack sx={{ height: "100%", width: "100%", overflow: "auto" }}>
      <Group>
        <Button
          size="xs"
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        >
          Prev
        </Button>
        <Button
          size="xs"
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          Next
        </Button>
      </Group>
      <div id="wrapper">
        {/* <canvas ref={canvasRef}></canvas> */}
        {doc && (
          <Document
            file={{ data: doc }}
            onLoadProgress={(data) => console.log("load progress", data)}
            onLoadError={(err) => {
              console.error("load error", err);
            }}
            onLoadSuccess={onDocumentLoadSuccess}
            onSourceError={(err) => {
              console.error("source error", err);
            }}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        )}
      </div>
      <Button
        onClick={async () => {
          const path = (await dialog.open({
            title: "Select a PDF file",
            filters: [{ name: "PDF File", extensions: ["pdf"] }],
            multiple: false,
          })) as string; // multiple is false
          if (!path) return;
          const data = await fs.readBinaryFile(path);
          setDoc(data);
        }}
      >
        Select PDF
      </Button>
    </Stack>
  );
};

export default PDFReader;
