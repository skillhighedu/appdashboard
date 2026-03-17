import { CertificateDetails } from "./certificate";

export interface CertificateStoreState {
  certificateDetails: CertificateDetails | null;
  studentName: string | null;

  setCertificateDetails: (data: CertificateDetails | null) => void;
  setStudentName: (name: string | null) => void;

  resetCertificate: () => void;
}
