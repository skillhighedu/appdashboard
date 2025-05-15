import { PDFDocument, PDFFont, rgb, StandardFonts } from "pdf-lib";
import certificateBg from "@assets/images/certificate.jpg";
import IndustrialcertificateBg from "@assets/images/industrialCertificate.jpg";
import { saveAs } from "file-saver";
import { useStore } from "@context/useStore";
import { formatDate } from "@utils/utils";
import { DownloadIcon } from "lucide-react";

import { Button } from "@components/ui/button";

const certificateTypes = [
  {
    type: "Internship",
    background: certificateBg,
    heading: "INTERNSHIP COMPLETION CERTIFICATE.",
    description: "for participating in the Skill High Industrial Internship",
  },
  {
    type: "Industrial",
    background: IndustrialcertificateBg,
    heading: "INDUSTRIAL PARTICIPATION CERTIFICATE",
    description:
      "for actively contributing to industrial exposure and experience",
  },
];

function App() {
  const { certificateDetails } = useStore();

  const handleDownloadPdf = async () => {
    try {
      for (const cert of certificateTypes) {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([1123, 794]);

        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const imageBytes = await fetch(cert.background).then((res) =>
          res.arrayBuffer(),
        );
        const jpgImage = await pdfDoc.embedJpg(imageBytes);

        page.drawImage(jpgImage, {
          x: 0,
          y: 0,
          width: page.getWidth(),
          height: page.getHeight(),
        });

        const center = (
          text: string,
          size: number,
          font: PDFFont,
          y: number,
          color = rgb(0, 0, 0),
        ) => {
          const width = font.widthOfTextAtSize(text, size);
          page.drawText(text, {
            x: (page.getWidth() - width) / 2,
            y,
            size,
            font,
            color,
          });
        };

        center(cert.heading, 30, fontBold, 500, rgb(0.9, 0.6, 0.1));
        center(
          "This certificate is awarded to",
          20,
          fontRegular,
          470,
          rgb(0.4, 0.4, 0.4),
        );
        center(certificateDetails?.name || "Your Name", 38, fontBold, 430);
        center(cert.description, 16, fontRegular, 390, rgb(0.4, 0.4, 0.4));

        const courseFontSize = 16;
        const y = 365;
        const fontGray = rgb(0.4, 0.4, 0.4);

        const parts = [
          { text: "for the ", font: fontRegular, color: fontGray },
          {
            text: certificateDetails?.courseName || "Course Name",
            font: fontBold,
            color: rgb(0, 0, 0),
          },
          { text: " program from ", font: fontRegular, color: fontGray },
          {
            text: formatDate(certificateDetails?.fromDate || "DD/MM/YYYY"),
            font: fontBold,
            color: rgb(0, 0, 0),
          },
          { text: " to ", font: fontRegular, color: fontGray },
          {
            text: formatDate(certificateDetails?.toDate || "DD/MM/YYYY"),
            font: fontBold,
            color: rgb(0, 0, 0),
          },
        ];

        const totalWidth = parts.reduce(
          (acc, part) =>
            acc + part.font.widthOfTextAtSize(part.text, courseFontSize),
          0,
        );
        let startX = (page.getWidth() - totalWidth) / 2;

        for (const part of parts) {
          page.drawText(part.text, {
            x: startX,
            y,
            size: courseFontSize,
            font: part.font,
            color: part.color,
          });
          startX += part.font.widthOfTextAtSize(part.text, courseFontSize);
        }
        // QR Code
        if (certificateDetails?.qrCode) {
          const qrBytes = await fetch(certificateDetails.qrCode).then((res) =>
            res.arrayBuffer(),
          );
          const qrImage = await pdfDoc.embedPng(qrBytes);
          page.drawImage(qrImage, {
            x: (page.getWidth() - 80) / 2,
            y: 240,
            width: 80,
            height: 80,
          });
        }

        // Certificate ID
        const certificateId =
          cert.type === "Internship"
            ? certificateDetails?.certificateIds?.internshipId
            : certificateDetails?.certificateIds?.industrialTrainingId;

        if (certificateId) {
          const certificateIdText = `Certificate ID: ${certificateId}`;
          const certificateIdFontSize = 14;
          const certificateIdY = 200;

          page.drawText(certificateIdText, {
            x:
              (page.getWidth() -
                fontRegular.widthOfTextAtSize(
                  certificateIdText,
                  certificateIdFontSize,
                )) /
              2,
            y: certificateIdY,
            size: certificateIdFontSize,
            font: fontRegular,
            color: rgb(0.4, 0.4, 0.4),
          });
        }

        const pdfBytes = await pdfDoc.save();
        saveAs(
          new Blob([pdfBytes], { type: "application/pdf" }),
          `${certificateDetails?.courseName || "certificate"}_${cert.type}.pdf`,
        );
      }
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Something went wrong while generating the certificates.");
    }
  };

  return (
    <div className="min-h-screen p-8 dark:bg-darkPrimary flex flex-col items-center gap-8">
      {/* Certificate Descriptions Section */}
      <div className="mt-8 p-4 border-t border-gray-300 w-full ">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          Certificate Types
        </h2>

        {/* Industrial Training Certificate */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-400">
            Industrial Training Certificate
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            An Industrial Training Certificate is awarded to students or
            professionals who successfully complete a short-term, hands-on
            training program with a company or industry. The training usually
            focuses on practical exposure to real-world tools, technologies, and
            processes relevant to their field of study (like IT, engineering,
            business, etc.).
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-semibold">
            Importance:
          </p>
          <ul className="list-disc ml-6 text-sm text-gray-600 dark:text-gray-400">
            <li>Proves that you have practical experience in your domain.</li>
            <li>
              Helps bridge the gap between academic knowledge and industry
              requirements.
            </li>
            <li>
              Adds strong value to your resume for jobs or higher studies.
            </li>
            <li>
              Shows that you are familiar with industrial practices and
              workplace professionalism.
            </li>
          </ul>
        </div>

        {/* Internship Completion Certificate */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-400">
            Internship Completion Certificate
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            An Internship Completion Certificate is given after successfully
            completing an internship, where you work with a company (full-time
            or part-time) for a certain duration, contributing to actual
            projects, research, or operations. It highlights your role,
            contributions, and skills gained during the internship.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-semibold">
            Importance:
          </p>
          <ul className="list-disc ml-6 text-sm text-gray-600 dark:text-gray-400">
            <li>
              Demonstrates real-world work experience and domain knowledge.
            </li>
            <li>
              Shows employers that you have professional exposure and can work
              in teams.
            </li>
            <li>
              Boosts your chances during campus placements, job interviews, and
              career growth.
            </li>
            <li>
              Validates your commitment, time management, and adaptability
              skills.
            </li>
          </ul>
        </div>
      </div>
      <Button
        variant="default"
        onClick={handleDownloadPdf}
        className="mt-4 p-3 text-white cursor-pointer"
      >
        <DownloadIcon /> Download All Certificates
      </Button>
    </div>
  );
}

export default App;
