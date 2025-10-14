"use client";

import { useState } from "react";
import { PDFDocument, PDFFont, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import certificateBg from "@assets/images/certificate.jpg";
import { saveAs } from "file-saver";
import { useStore } from "@context/useStore";
import { formatDate } from "@utils/utils";
import { DownloadIcon, EyeIcon } from "lucide-react";
import { Button } from "@components/ui/button";
import { alexBrushFont, CormorantGramond } from "@assets/fonts";

const certificateTypes = [
  {
    type: "Internship",
    background: certificateBg,
    heading: "INTERNSHIP COMPLETION CERTIFICATE",
    description: "for successfully completing the  industrial internship in ",
  },
  {
    type: "Industrial",
    background: certificateBg,
    heading: "INDUSTRIAL PARTICIPATION CERTIFICATE",
    description: "for successfully participating in industrial training in ",
  },
  {
    type: "Participation",
    background: certificateBg,
    heading: "PARTICIPATION CERTIFICATE",
    description: "for actively participating in ",
  },
];

export default function App() {
  const { certificateDetails } = useStore();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const generateCertificates = async () => {
    try {
      const urls: string[] = [];

      for (const cert of certificateTypes) {
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);

        const page = pdfDoc.addPage([1123, 794]);

        // Fonts
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const alexBytes = await fetch(alexBrushFont).then((res) => res.arrayBuffer());
        const alexFont = await pdfDoc.embedFont(alexBytes);

        const cormorantBytes = await fetch(CormorantGramond).then((res) => res.arrayBuffer());
        const cormorantFont = await pdfDoc.embedFont(cormorantBytes);

        // Background
        const imageBytes = await fetch(cert.background).then((res) => res.arrayBuffer());
        const jpgImage = await pdfDoc.embedJpg(imageBytes);
        page.drawImage(jpgImage, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });

        // Helper to center text
        const center = (text: string, size: number, font: PDFFont, y: number, color = rgb(0, 0, 0)) => {
          const width = font.widthOfTextAtSize(text, size);
          page.drawText(text, { x: (page.getWidth() - width) / 2, y, size, font, color });
        };

        // Subtitle
        center("This Certificate is Proudly Presented to", 20, fontRegular, 470, rgb(0.4, 0.4, 0.4));

        // Name
        center(certificateDetails?.name || "Your Name", 46, alexFont, 415, rgb(0.8627, 0.7059, 0.3451));

        const fontGray = rgb(0.2, 0.2, 0.2);

        // Line 1: description
center(cert.description, 20, cormorantFont, 365, fontGray);

// Line 2: course + dates
const courseParts = [
  { text: certificateDetails?.courseName || "Course Name", font: fontBold, color: rgb(0, 0, 0) },
  { text: "  program from ", font: cormorantFont, color: fontGray },
  { text: formatDate(certificateDetails?.fromDate || "DD/MM/YYYY"), font: fontBold, color: rgb(0, 0, 0) },
  { text: " to ", font: cormorantFont, color: fontGray },
  { text: formatDate(certificateDetails?.toDate || "DD/MM/YYYY"), font: fontBold, color: rgb(0, 0, 0) },
];

let totalWidth = courseParts.reduce(
  (acc, part) => acc + part.font.widthOfTextAtSize(part.text, 20),
  0
);
let startX = (page.getWidth() - totalWidth) / 2;

for (const part of courseParts) {
  page.drawText(part.text, { x: startX, y: 335, size: 20, font: part.font, color: part.color });
  startX += part.font.widthOfTextAtSize(part.text, 20);
}


        // QR Code
        if (certificateDetails?.qrCode) {
          try {
            const qrBytes = await fetch(certificateDetails.qrCode).then((res) => res.arrayBuffer());
            const qrImage = await pdfDoc.embedPng(qrBytes);
            page.drawImage(qrImage, { x: (page.getWidth() + 680) / 2, y: 160, width: 80, height: 80 });
          } catch (qrErr) {
            console.warn(`QR Code missing for ${cert.type}`, qrErr);
          }
        }

        // Certificate ID
        let certificateId = "";
        if (cert.type === "Internship") certificateId = certificateDetails?.certificateIds?.internshipId ?? "";
        else if (cert.type === "Industrial") certificateId = certificateDetails?.certificateIds?.industrialTrainingId ?? "";
        else if (cert.type === "Participation") certificateId = certificateDetails?.certificateIds?.participationId ?? "";
        certificateId ||= `${cert.type}-${Date.now()}`;

        page.drawText(`Certificate ID: ${certificateId}`, {
          x: (page.getWidth() - fontRegular.widthOfTextAtSize(`Certificate ID: ${certificateId}`, 14)) / 2,
          y: 250,
          size: 14,
          font: fontRegular,
          color: fontGray,
        });

        const pdfBytes = await pdfDoc.save();
         const arrayBuffer = pdfBytes.buffer.slice( pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength );
         const pdfBlob = new Blob([arrayBuffer as ArrayBuffer], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        urls.push(pdfUrl);
      }

      setPreviewUrls(urls);
      setIsPreviewMode(true);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Something went wrong while generating the certificates.");
    }
  };

  const handleDownloadAll = async () => {
    for (let i = 0; i < previewUrls.length; i++) {
      const url = previewUrls[i];
      const certType = certificateTypes[i]?.type ?? `Certificate${i + 1}`;
      if (typeof url === "string") {
        const response = await fetch(url);
        const blob = await response.blob();
        saveAs(blob, `${certificateDetails?.courseName || "certificate"}_${certType}.pdf`);
      }
    }
  };

  return (
    <div className="min-h-screen p-8 dark:bg-darkPrimary flex flex-col items-center gap-8">
      {!isPreviewMode ? (
        <>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Certificate Generator</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl text-center">
            Generate and preview your Internship, Industrial, and Participation certificates before downloading them.
          </p>
          <Button variant="default" onClick={generateCertificates} className="mt-4 p-3 text-white cursor-pointer">
            <EyeIcon className="mr-2" /> Preview Certificates
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Certificate Previews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {previewUrls.map((url, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={url}
                  width="100%"
                  height="400px"
                  title={`Preview ${certificateTypes[idx]?.type ?? "Certificate"}`}
                />
                <p className="p-2 text-center text-sm text-gray-500 dark:text-gray-400">{certificateTypes[idx]?.type}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <Button variant="default" onClick={handleDownloadAll} className="p-3 text-white cursor-pointer">
              <DownloadIcon className="mr-2" /> Download All Certificates
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsPreviewMode(false);
                setPreviewUrls([]);
              }}
            >
              Back to Edit
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
