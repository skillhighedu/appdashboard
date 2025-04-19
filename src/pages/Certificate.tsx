
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import certificateBg from "@assets/images/certificate.jpg";
// import { saveAs } from "file-saver";
// import { Certificate } from "@components/Certificate";
// import { useStore } from "@context/useStore";
// import {formatDate} from '@utils/utils'

// const QrCode =
//   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAK0SURBVO3BQYrDAAwEwR7h/3+5N0edDMZ22AhVxQ/WGMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRjm4KQnfpNIloVPpknCFSpeEb1K5o1ijFGuUYo1y8DCVJyXhSSpdEq5QeVISnlSsUYo1SrFGOXhZEq5QuULliiQ8KQlXqLypWKMUa5RijXLw45LQqXQqZ5IwSbFGKdYoxRrl4MepdEnoVLokdCqTFGuUYo1SrFEOXqbyTSpdEs4koVO5QuU/KdYoxRqlWKMcPCwJ35SETuWMSpeEK5LwnxVrlGKNUqxR4gc/LAlPUvllxRqlWKMUa5SDm5LQqXRJOKPSJeEKlSuScEUSOpUzSehUuiScUbmjWKMUa5RijXLwMpUuCV0Szqh0SeiS8CaVLglnVLokdCpdEp5UrFGKNUqxRjm4SaVLQqdyhUqXhE7lTBI6lS4JnUqXhCtUzqh0SXhTsUYp1ijFGuXgYSpPUrlC5Q6VO5LQqXQqXRKeVKxRijVKsUaJH9yQhE6lS8IZlTNJ6FSelIROpUvCGZX/pFijFGuUYo0SP/hhSbhDpUtCp9Il4U0qdxRrlGKNUqxRDm5KwjepXKHSJaFLwpkk3KHyTcUapVijFGuUg4epPCkJV6icUfmmJJxReVKxRinWKMUa5eBlSbhC5QqVM0noVLokdCpdEjqVLglXqLypWKMUa5RijXLw45LQqZxJQqdyh8oVSehUnlSsUYo1SrFGORgmCWdUuiR0Kk9KQqfypmKNUqxRijXKwctU3qTSJeEKlS4JnUqXhDMqncqZJHQqdxRrlGKNUqxRDh6WhG9KQqfyJpUrktCpdCpPKtYoxRqlWKPED9YYxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFG+QO3EBbiYA6ZdQAAAABJRU5ErkJggg==";

// function App() {
//   const { certificateDetails} = useStore();

//   const handleDownloadPdf = async () => {
//     try {
//       const pdfDoc = await PDFDocument.create();
//       const page = pdfDoc.addPage([1123, 794]);

//       const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//       const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

//       const imageBytes = await fetch(certificateBg).then((res) => res.arrayBuffer());
//       const jpgImage = await pdfDoc.embedJpg(imageBytes);
//       page.drawImage(jpgImage, {
//         x: 0,
//         y: 0,
//         width: page.getWidth(),
//         height: page.getHeight(),
//       });

//       const center = (text: string, size: number, font: any, y: number, color = rgb(0, 0, 0)) => {
//         const width = font.widthOfTextAtSize(text, size);
//         page.drawText(text, {
//           x: (page.getWidth() - width) / 2,
//           y,
//           size,
//           font,
//           color,
//         });
//       };

//       center("CERTIFICATE OF APPRECIATION", 30, fontBold, 500, rgb(0.9, 0.6, 0.1));
//       center("This certificate is awarded to", 20, fontRegular, 470, rgb(0.4, 0.4, 0.4));
//       center(certificateDetails?.name || "Your Name", 38, fontBold, 430);
//       center("for participating in the Skill High Industrial Internship", 16, fontRegular, 390, rgb(0.4, 0.4, 0.4));

//       // Updated multi-font line (bold dates only)
//       const courseFontSize = 16;
//       const y = 365;
//       const fontGray = rgb(0.4, 0.4, 0.4);

//       const text1 = "for the ";
//       const text2 = certificateDetails?.courseName || "Course Name";
//       const text3 = " program from ";
//       const text4 = formatDate(certificateDetails?.fromDate || "DD/MM/YYYY");
//       const text5 = " to ";
//       const text6 = formatDate(certificateDetails?.toDate || "DD/MM/YYYY")

//       const width1 = fontRegular.widthOfTextAtSize(text1, courseFontSize);
//       const width2 = fontBold.widthOfTextAtSize(text2, courseFontSize);
//       const width3 = fontRegular.widthOfTextAtSize(text3, courseFontSize);
//       const width4 = fontBold.widthOfTextAtSize(text4, courseFontSize);
//       const width5 = fontRegular.widthOfTextAtSize(text5, courseFontSize);
//       const width6 = fontBold.widthOfTextAtSize(text6, courseFontSize);

//       const totalWidth = width1 + width2 + width3 + width4 + width5 + width6;
//       let startX = (page.getWidth() - totalWidth) / 2;

//       const draw = (text: string, font: any, color: any, width: number) => {
//         page.drawText(text, {
//           x: startX,
//           y,
//           size: courseFontSize,
//           font,
//           color,
//         });
//         startX += width;
//       };

//       draw(text1, fontRegular, fontGray, width1);
//       draw(text2, fontBold, rgb(0, 0, 0), width2);
//       draw(text3, fontRegular, fontGray, width3);
//       draw(text4, fontBold, rgb(0, 0, 0), width4);
//       draw(text5, fontRegular, fontGray, width5);
//       draw(text6, fontBold, rgb(0, 0, 0), width6);

//       // QR Code
//       const qrBytes = await fetch(QrCode).then((res) => res.arrayBuffer());
//       const qrImage = await pdfDoc.embedPng(qrBytes);
//       page.drawImage(qrImage, {
//         x: (page.getWidth() - 100) / 2,
//         y: 240,
//         width: 100,
//         height: 100,
//       });

//       const pdfBytes = await pdfDoc.save();
//       saveAs(new Blob([pdfBytes], { type: "application/pdf" }), `${certificateDetails?.courseName || "certificate"}.pdf`);
//     } catch (err) {
//       console.error("PDF generation failed", err);
//       alert("Something went wrong while generating the certificate.");
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center gap-6">
//       <h1 className="text-2xl font-bold text-gray-800">Certificate Generator (PDF)</h1>

   
//       <Certificate 
//         name={certificateDetails?.name || "Default Name"} 
//         courseName={certificateDetails?.courseName || "Default Course"} 
//         fromDate={certificateDetails?.fromDate || "Default From Date"} 
//         toDate={certificateDetails?.toDate || "Default To Date"} 
//         qrCode={certificateDetails?.qrCode || "Default QR Code"} 
//       />

//       <button
//         onClick={handleDownloadPdf}
//         className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow"
//       >
//         Download PDF Certificate
//       </button>
//     </div>
//   );
// }

// export default App;
