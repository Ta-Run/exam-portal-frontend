import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const useGeneratePdf = (fileName) => {
  const tablePrintRef = useRef();

  const generatePdf = useReactToPrint({
    content: () => tablePrintRef?.current,
    documentTitle: fileName ,
    pageStyle: `
    @page {  size: A4;  margin: 20mm; }
    body { font-size: 12pt; }
    `,
  });

  return { tablePrintRef, generatePdf };
};

export default useGeneratePdf;
