import { jsPDF } from "jspdf";

const NBSP = String.fromCharCode(160);

export function exportSummaryToPdf(summary) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - margin * 2;

  let y = 60;

  const ensureSpace = (needed = 14) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const clean = (str) => {
    if (!str) return "";
    return String(str)
      .split(NBSP)
      .join(" ")
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  };

  const writeText = (text, { bold = false, size = 11, gap = 14 } = {}) => {
    ensureSpace(gap + 2);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);

    const lines = doc.splitTextToSize(clean(text), maxWidth);
    lines.forEach((line) => {
      ensureSpace(gap);
      doc.text(line, margin, y);
      y += gap;
    });
  };

  const writeTitle = (text) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(clean(text), margin, y);
    y += 22;
  };

  const writeSection = (title) => {
    y += 6;
    writeText(title, { bold: true, size: 13, gap: 18 });
  };

  const bullet = (text) => writeText(`• ${text}`, { gap: 14 });

  writeTitle("Estimation de projet avec Sandra Pautonnier");

  summary.blocks.forEach((block) => {
    if (block.heading) writeSection(block.heading);
    block.lines.forEach((line) => bullet(line));
  });

  writeSection("Détail des prix");
  summary.priceLines.forEach((row) => writeText(`${row.label} : ${row.price}`, { gap: 14 }));
  if (summary.maintenanceLine) {
    y += 2;
    writeText(`${summary.maintenanceLine.label} : ${summary.maintenanceLine.price}`, { gap: 14 });
  }

  y += 8;
  writeText(`Total (estimation) : ${summary.total}`, { bold: true, size: 13, gap: 18 });

  y += 10;
  writeText("Prêt(e) à vous lancer ? Contactez-moi :", { bold: true, size: 11, gap: 14 });
  writeText("contact@sandrapautonnier.com", { bold: false, size: 11, gap: 14 });
  writeText("07 56 84 50 15", { bold: false, size: 11, gap: 14 });

  y += 6;
  writeText("Cette estimation est indicative. Le devis final dépendra du besoin exact.", { size: 10, gap: 12 });

  doc.save("estimation-projet.pdf");
}
