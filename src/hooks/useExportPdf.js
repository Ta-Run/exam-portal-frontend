import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const useExportPdf = (fileName) => {
  const exportPdfHandler = () => {
    const doc = new jsPDF();
    doc.autoTable({
      html: "#export-pdf-table",
      styles: { halign: "center" },
      headStyles: { fillColor: "#201D48" },
    });
    doc.save(`${fileName}.pdf`);
  };

  return { exportPdfHandler };
};

export default useExportPdf;
