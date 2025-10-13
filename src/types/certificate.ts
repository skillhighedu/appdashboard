export interface CertificateDetails {
  name: string;
  courseName: string;
  fromDate: string;
  toDate: string;
  qrCode: string;
  certificateImage: string;
  certificateIds: CertificateIds;
}

interface CertificateIds {
  internshipId: string;
  industrialTrainingId: string;
  participationId:string;
}
