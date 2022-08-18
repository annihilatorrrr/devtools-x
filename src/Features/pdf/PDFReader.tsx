import { Button, Group, Stack } from "@mantine/core";
import { dialog, fs } from "@tauri-apps/api";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import * as pdfjsLib from "pdfjs-dist";
import { useRef, useState } from "react";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "../../../node_modules/pdfjs-dist/build/pdf.worker.js";

let pageNum = 1;
let pageRendering = false;
let pageNumPending = 0;
let scale = 0.8;

const PDFReader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy>();

  const renderPage = (num: number) => {
    pageRendering = true;
    // Using promise to fetch the page
    const pdfDoc = pdfDocRef.current;
    if (!pdfDoc) return;
    console.log("Rendering page", num);
    pdfDoc.getPage(num).then(function (page) {
      var viewport = page.getViewport({ scale: scale });
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: canvas.getContext("2d") as any,
        viewport: viewport,
      };
      var renderTask = page.render(renderContext);

      // Wait for rendering to finish
      renderTask.promise.then(function () {
        pageRendering = false;
        if (pageNumPending !== 0) {
          // New page rendering is pending
          renderPage(pageNumPending);
          pageNumPending = 0;
        }
      });
    });
  };

  /**
   * If another page rendering in progress, waits until the rendering is
   * finised. Otherwise, executes rendering immediately.
   */
  const queueRenderPage = (num: number) => {
    if (pageRendering) {
      pageNumPending = num;
    } else {
      renderPage(num);
    }
  };

  return (
    <Stack sx={{ height: "100%", width: "100%", overflow: "auto" }}>
      <Group>
        <Button
          size="xs"
          onClick={() => {
            if (pageNum <= 1) {
              return;
            }
            pageNum--;
            queueRenderPage(pageNum);
          }}
        >
          Prev
        </Button>
        <Button
          size="xs"
          onClick={() => {
            const pdfDoc = pdfDocRef.current;
            if (pageNum >= pdfDoc.numPages) {
              return;
            }
            pageNum++;
            queueRenderPage(pageNum);
          }}
        >
          Next
        </Button>
      </Group>
      <canvas ref={canvasRef}></canvas>
      <Button
        onClick={async () => {
          const path = (await dialog.open({
            title: "Select a PDF file",
            filters: [{ name: "PDF File", extensions: ["pdf"] }],
            multiple: false,
          })) as string; // multiple is false
          if (!path) return;
          const data = await fs.readBinaryFile(path);
          const pdfDoc = await pdfjsLib.getDocument(data).promise;
          pdfDocRef.current = pdfDoc;
          renderPage(1);
          //   pdfDoc.getPage(1).then((pdfPage) => {
          //     var outputScale = window.devicePixelRatio || 1;

          //     const viewport = pdfPage.getViewport({ scale: 1.0 });
          //     const canvas = canvasRef.current;
          //     if (!canvas) return;
          //     canvas.width = Math.floor(viewport.width * outputScale);
          //     canvas.height = Math.floor(viewport.height * outputScale);
          //     canvas.style.width = Math.floor(viewport.width) + "px";
          //     canvas.style.height = Math.floor(viewport.height) + "px";

          //     const ctx: any = canvas.getContext("2d");

          //     var transform =
          //       outputScale !== 1
          //         ? [outputScale, 0, 0, outputScale, 0, 0]
          //         : undefined;

          //     pdfPage.render({
          //       canvasContext: ctx,
          //       viewport,
          //       transform,
          //     });
          //   });
        }}
      >
        Select PDF
      </Button>
    </Stack>
  );
};

export default PDFReader;
