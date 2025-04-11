import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import certificateBg from "@assets/images/certificate.jpg";
import { saveAs } from "file-saver";
import Certificate from "@components/Certificate";


function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleDownloadPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([1123, 794]); // Certificate size
  
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSizeName = 32;
    const fontSizeCourse = 24;
  
    // Background image
    const imageBytes = await fetch(certificateBg).then((res) => res.arrayBuffer());
    const jpgImage = await pdfDoc.embedJpg(imageBytes);
    page.drawImage(jpgImage, {
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
    });
  
    // Name
    const nameWidth = font.widthOfTextAtSize(name, fontSizeName);
    page.drawText(name, {
      x: (page.getWidth() - nameWidth) / 2,
      y: 420,
      size: fontSizeName,
      font,
      color: rgb(0, 0, 0),
    });
  
    // Description
    const desc = "for participating in Skill High Industrial Internship";
    const descWidth = fontRegular.widthOfTextAtSize(desc, 18);
    page.drawText(desc, {
      x: (page.getWidth() - descWidth) / 2,
      y: 390,
      size: 18,
      font: fontRegular,
      color: rgb(0.3, 0.3, 0.3),
    });
  
    // Course
    const courseWidth = font.widthOfTextAtSize(course, fontSizeCourse);
    page.drawText(course, {
      x: (page.getWidth() - courseWidth) / 2,
      y: 360,
      size: fontSizeCourse,
      font,
      color: rgb(0, 0, 0),
    });
  
    // Dates
    const dateText = `Program from ${from || "DD/MM/YYYY"} to ${to || "DD/MM/YYYY"}`;
    const dateWidth = fontRegular.widthOfTextAtSize(dateText, 14);
    page.drawText(dateText, {
      x: (page.getWidth() - dateWidth) / 2,
      y: 330,
      size: 14,
      font: fontRegular,
      color: rgb(0.2, 0.2, 0.2),
    });
  
    // ✅ QR Code image embed
    const qrImageBytes = await fetch(QrCode).then((res) => res.arrayBuffer());
    const qrPng = await pdfDoc.embedPng(qrImageBytes);
    const qrSize = 100;
  
    page.drawImage(qrPng, {
      x: page.getWidth() / 2 - qrSize / 2,
      y: 220,
      width: qrSize,
      height: qrSize,
    });
  
    // Save PDF
    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], { type: "application/pdf" }), `${name || "certificate"}.pdf`);
  };
  

  const QrCode = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAK0SURBVO3BQYrDAAwEwR7h/3+5N0edDMZ22AhVxQ/WGMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRjm4KQnfpNIloVPpknCFSpeEb1K5o1ijFGuUYo1y8DCVJyXhSSpdEq5QeVISnlSsUYo1SrFGOXhZEq5QuULliiQ8KQlXqLypWKMUa5RijXLw45LQqXQqZ5IwSbFGKdYoxRrl4MepdEnoVLokdCqTFGuUYo1SrFEOXqbyTSpdEs4koVO5QuU/KdYoxRqlWKMcPCwJ35SETuWMSpeEK5LwnxVrlGKNUqxR4gc/LAlPUvllxRqlWKMUa5SDm5LQqXRJOKPSJeEKlSuScEUSOpUzSehUuiScUbmjWKMUa5RijXLwMpUuCV0Szqh0SeiS8CaVLglnVLokdCpdEp5UrFGKNUqxRjm4SaVLQqdyhUqXhE7lTBI6lS4JnUqXhCtUzqh0SXhTsUYp1ijFGuXgYSpPUrlC5Q6VO5LQqXQqXRKeVKxRijVKsUaJH9yQhE6lS8IZlTNJ6FSelIROpUvCGZX/pFijFGuUYo0SP/hhSbhDpUtCp9Il4U0qdxRrlGKNUqxRDm5KwjepXKHSJaFLwpkk3KHyTcUapVijFGuUg4epPCkJV6icUfmmJJxReVKxRinWKMUa5eBlSbhC5QqVM0noVLokdCpdEjqVLglXqLypWKMUa5RijXLw45LQqZxJQqdyh8oVSehUnlSsUYo1SrFGORgmCWdUuiR0Kk9KQqfypmKNUqxRijXKwctU3qTSJeEKlS4JnUqXhDMqncqZJHQqdxRrlGKNUqxRDh6WhG9KQqfyJpUrktCpdCpPKtYoxRqlWKPED9YYxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFG+QO3EBbiYA6ZdQAAAABJRU5ErkJggg=="

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold text-gray-800">Certificate Generator (PDF)</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded w-72"
      />
      <input
        type="text"
        placeholder="Enter Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="p-2 border rounded w-72"
      />
      <input
        type="text"
        placeholder="From Date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="p-2 border rounded w-72"
      />
      <input
        type="text"
        placeholder="To Date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="p-2 border rounded w-72"
      />

      {/* Live Preview */}
      <Certificate name={name} course={course} from={from} to={to} qRCode={QrCode} />

      <button
        onClick={handleDownloadPdf}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow"
      >
        Download PDF Certificate
      </button>
     
    </div>
  );
}

export default App;
