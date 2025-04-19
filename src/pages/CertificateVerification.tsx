// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { verifyCertificateService } from "../services/certificateServices";
// import { CheckCircle, XCircle, Loader2 } from "lucide-react";

// export default function CertificateVerification() {
//   const { cid } = useParams<string>();
//   const [found, setFound] = useState<boolean | null>(null);

//   useEffect(() => {
//     const verify = async () => {
//       try {
//         const response = await verifyCertificateService(cid as string);
//         setFound(!!response);
//       } catch (error) {
//         setFound(false);
//       }
//     };

//     if (cid) {
//       verify();
//     }
//   }, [cid]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4">
//           Certificate Verification
//         </h1>

//         {found === null && (
//           <div className="flex flex-col items-center">
//             <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-2" />
//             <p className="text-gray-500">Verifying your certificate...</p>
//           </div>
//         )}

//         {found === true && (
//           <div className="flex flex-col items-center">
//             <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
//             <p className="text-green-700 font-medium text-lg">
//               Certificate is valid ✅
//             </p>
//             <p className="text-sm text-gray-500 mt-1">
//               This certificate ID exists in our records.
//             </p>
//           </div>
//         )}

//         {found === false && (
//           <div className="flex flex-col items-center">
//             <XCircle className="h-12 w-12 text-red-500 mb-2" />
//             <p className="text-red-700 font-medium text-lg">
//               Certificate Not Found ❌
//             </p>
//             <p className="text-sm text-gray-500 mt-1">
//               This certificate ID is not in our system.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
