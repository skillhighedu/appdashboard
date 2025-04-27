import { CertificateDetails } from "../types/certificate";
import { formatDate } from "@utils/utils";

interface CertificateProps extends CertificateDetails {
  certificateType: "Internship" | "Industrial";
  heading: string;
  description: string;
}

export const Certificate = ({
  name,
  courseName,
  fromDate,
  toDate,
  qrCode,
  certificateIds,
  certificateImage,
  certificateType,
  heading,
  description,
}: CertificateProps) => {
  const displayId =
    certificateType === "Internship"
      ? certificateIds.internshipId
      : certificateIds.industrialTrainingId;

  return (
    <div
      className="w-[1120px] h-[790px] bg-cover bg-center bg-no-repeat relative shadow-xl"
      style={{ backgroundImage: `url(${certificateImage})` }}
    >
      <div className="absolute top-[270px] left-1/2 transform -translate-x-1/2 w-[70%] text-center">
        <p className="text-3xl text-amber-700 font-semibold mb-2">{heading}</p>

        <p className="text-xl text-gray-600 mb-2">
          This certificate is awarded to
        </p>

        <h3 className="text-4xl font-bold text-black">{name || "Your Name"}</h3>

        <p className="mt-6 text-lg text-gray-600">
          {description}{" "}
          <span className="font-semibold text-black">
            {courseName || "Course Name"}
          </span>{" "}
          Program from{" "}
          <span className="font-semibold text-black">
            {fromDate ? formatDate(fromDate) : "Start Date"} to{" "}
            {toDate ? formatDate(toDate) : "End Date"}
          </span>
        </p>

        {qrCode && (
          <div className="mt-8 flex justify-center">
            <img src={qrCode} alt="QR Code" className="w-24 h-24" />
          </div>
        )}
        <p className="mt-4 text-md text-gray-700">
          Certificate ID:{" "}
          <span className="font-semibold text-black">{displayId || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};
