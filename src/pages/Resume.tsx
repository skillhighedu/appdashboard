import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jsPDF } from "jspdf";

// ✅ Your Yup validation schema
const validateSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  grad: Yup.string().required("Graduation year is required"),
  obj: Yup.string().required("Objective is required"),
  mobnum: Yup.string().required("Mobile number is required"),
  schper12: Yup.string().required("School percentage (12th) is required"),
  school12: Yup.string().required("School (12th) is required"),
  schper: Yup.string().required("School percentage (10th) is required"),
  school: Yup.string().required("School (10th) is required"),
  address: Yup.string().required("Address is required"),
  grad_per: Yup.string().required("Graduation percentage is required"),
  skills: Yup.string().required("Skills are required"),
});

const Resume: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      grad: "",
      obj: "",
      mobnum: "",
      schper12: "",
      school12: "",
      schper: "",
      school: "",
      address: "",
      grad_per: "",
      skills: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      generatePDF(values);
    },
  });

  // ✅ Function to generate resume PDF
  const generatePDF = (data: any) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`${data.firstname} ${data.lastname}`, 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Email: ${data.email}`, 20, 35);
    doc.text(`Mobile: ${data.mobnum}`, 20, 42);
    doc.text(`Address: ${data.address}`, 20, 49);

    doc.setFont("helvetica", "bold");
    doc.text("Objective", 20, 65);
    doc.setFont("helvetica", "normal");
    doc.text(data.obj, 20, 72);

    doc.setFont("helvetica", "bold");
    doc.text("Education", 20, 90);
    doc.setFont("helvetica", "normal");
    doc.text(`Graduation Year: ${data.grad} (${data.grad_per}%)`, 20, 98);
    doc.text(`12th: ${data.school12} (${data.schper12}%)`, 20, 106);
    doc.text(`10th: ${data.school} (${data.schper}%)`, 20, 114);

    doc.setFont("helvetica", "bold");
    doc.text("Skills", 20, 132);
    doc.setFont("helvetica", "normal");
    doc.text(data.skills, 20, 140);

    doc.save(`${data.firstname}_Resume.pdf`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Resume Builder</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {Object.keys(formik.initialValues).map((field) => (
            <div key={field}>
              <input
                type="text"
                name={field}
                placeholder={field}
                value={(formik.values as any)[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched[field] && (formik.errors as any)[field] ? (
                <div className="text-red-500 text-sm mt-1">
                  {(formik.errors as any)[field]}
                </div>
              ) : null}
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Generate Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resume;