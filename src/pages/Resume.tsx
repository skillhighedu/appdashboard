import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jsPDF } from "jspdf";

// ---- VALIDATION (keep only true must-haves required so submit isn't blocked needlessly)
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  mobnum: Yup.string().required("Mobile number is required"),
  skills: Yup.string().required("Skills are required"),
  // optional fields (won't block submit)
  grad: Yup.string().notRequired(),
  obj: Yup.string().notRequired(),
  schper12: Yup.string().notRequired(),
  school12: Yup.string().notRequired(),
  schper: Yup.string().notRequired(),
  school: Yup.string().notRequired(),
  address: Yup.string().notRequired(),
  grad_per: Yup.string().notRequired(),
  linkedin: Yup.string().trim().url("Enter a valid URL (e.g., https://...)").notRequired(),
  github: Yup.string().trim().url("Enter a valid URL (e.g., https://...)").notRequired(),
  projects: Yup.string().trim().notRequired(),
  extracurricular: Yup.string().trim().notRequired(),
  experience: Yup.string().trim().notRequired(),
});

// ---- TYPES
interface ResumeFormValues {
  email: string;
  firstname: string;
  lastname: string;
  grad: string;
  obj: string;
  mobnum: string;
  schper12: string;
  school12: string;
  schper: string;
  school: string;
  address: string;
  grad_per: string;
  skills: string;
  linkedin?: string;
  github?: string;
  projects?: string;
  extracurricular?: string;
  experience?: string;
}

// ---- PDF GENERATION
function generatePDF(data: ResumeFormValues): void {
  const doc = new jsPDF();

  // page + margins
  const MARGIN_X = 18;
  const MARGIN_Y = 18;
  const PAGE_W = doc.internal.pageSize.getWidth();
  const PAGE_H = doc.internal.pageSize.getHeight();

  const LH_BODY = 5.6;
  const LH_TIGHT = 5.2;

  doc.setLineHeightFactor(1.15);

  const ensureSpace = (y: number, need: number): number => {
    if (y + need > PAGE_H - MARGIN_Y) {
      doc.addPage();
      return MARGIN_Y;
    }
    return y;
  };

  const hr = (y: number): void => {
    doc.setDrawColor(0);
    doc.setLineWidth(0.25);
    doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y);
  };

  const underline = (text: string, x: number, y: number): void => {
    doc.text(text, x, y);
    const w = doc.getTextWidth(text);
    doc.setLineWidth(0.25);
    doc.line(x, y + 0.8, x + w, y + 0.8);
  };

  const section = (title: string, y: number): number => {
    y = ensureSpace(y, 10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    doc.text(title.toUpperCase(), MARGIN_X, y);
    return y + 6;
  };

  const labeledRow = (label: string, value: string, y: number): number => {
    const LABEL_W = 40;
    const xText = MARGIN_X + LABEL_W + 2;
    const maxW = PAGE_W - xText - MARGIN_X;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(label, MARGIN_X, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(value || "—", maxW);
    doc.text(lines, xText, y);
    const used = Math.max(6, lines.length * LH_BODY);
    return y + used;
  };

  const bulletBlock = (bullets: string[], y: number): number => {
    const maxW = PAGE_W - MARGIN_X * 2 - 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    bullets.forEach((raw) => {
      const text = raw.replace(/^\s*[-•]\s*/, "");
      const wrapped = doc.splitTextToSize(text, maxW);
      y = ensureSpace(y, wrapped.length * LH_TIGHT + 2);
      doc.text("•", MARGIN_X + 2, y);
      doc.text(wrapped, MARGIN_X + 8, y);
      y += wrapped.length * LH_TIGHT;
    });
    return y + 1.5;
  };

  const drawContactLinks = (items: string[], y: number): void => {
    const visible = items.filter(Boolean);
    if (!visible.length) return;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 255);

    const sep = "  .  ";
    const widths = visible.map((t) => doc.getTextWidth(t));
    const sepW = doc.getTextWidth(sep);
    const totalW = widths.reduce((a, b) => a + b, 0) + sepW * (visible.length - 1);

    let x = (PAGE_W - totalW) / 2;
    visible.forEach((t, i) => {
      underline(t, x, y);
      x += doc.getTextWidth(t);
      if (i !== visible.length - 1) {
        doc.setTextColor(0, 0, 0);
        doc.text(sep, x, y);
        x += sepW;
        doc.setTextColor(0, 0, 255);
      }
    });
    doc.setTextColor(0, 0, 0);
  };

  // small helper to parse "Title - desc"
  const parseProject = (line: string) => {
    const m = line.match(/^(.+?)\s*[-–—:]\s+(.*)$/);
    if (m) return { title: m[1]?.trim() ?? "", desc: m[2]?.trim() ?? "" };
    return { title: line.trim(), desc: "" };
  };

  // ---------- HEADER ----------
  let y = MARGIN_Y;

  doc.setFont("times", "bold");
  doc.setFontSize(21.5);
  const fullName =
    `${(data.firstname || "").toUpperCase()} ${(data.lastname || "").toUpperCase()}`.trim() ||
    "YOUR NAME";
  doc.text(fullName, PAGE_W / 2, y, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  y += 8;
  const phone = data.mobnum || "Phone";
  doc.text(phone, PAGE_W / 2, y, { align: "center" });

  y += 7;
  drawContactLinks(
    [(data.email || "").trim(), (data.linkedin || "").trim(), (data.github || "").trim()],
    y
  );

  y += 8;
  hr(y);
  y += 8;

  // ---------- SKILLS ----------
  y = section("SKILLS", y);
  const skillsText = (data.skills || "")
    .split(/[,|\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(", ") || "—";
  y = labeledRow("Technical Skills", skillsText, y + 2);

  y += 4;
  hr(y);
  y += 8;

  // ---------- EXPERIENCE (optional) ----------
  const expRaw = (data.experience || "").trim();
  if (expRaw) {
    y = section("EXPERIENCE", y);
    const blocks = expRaw.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
    const HEADING_GAP = 4;
    const BLOCK_GAP = 6;

    blocks.forEach((block, idx) => {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (!lines.length) return;

      const heading = lines[0] ?? "";
      const [left, right] = heading.split("|").map((s) => s.trim());

      y = ensureSpace(y, 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(left ?? "", MARGIN_X, y);
      if (right) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.text(right, PAGE_W - MARGIN_X, y, { align: "right" });
      }

      const bullets = lines.slice(1);
      y = bullets.length ? bulletBlock(bullets, y + HEADING_GAP) : y + HEADING_GAP;

      if (idx < blocks.length - 1) y += BLOCK_GAP;
    });

    y += 2;
    hr(y);
    y += 8;
  }

  // ---------- PROJECTS ----------
  y = section("PROJECTS", y);

  const projectLines = (data.projects || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  // If empty, show two tasteful samples
  const normalized = projectLines.length
    ? projectLines
    : [
        "Smart RAG Assistant - Built a Bedrock-powered RAG chatbot that reduced ticket resolution time by 38%.",
        "E-commerce Analytics - Designed ELT + dashboards; reduced churn by 12%.",
      ];

  const MAX_W = PAGE_W - MARGIN_X * 2 - 8;
  const ITEM_GAP = 3; // small vertical gap between items

  normalized.forEach((line, idx) => {
    const { title, desc } = parseProject(line);

    // bullet + bold title on first line
    y = ensureSpace(y, 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("•", MARGIN_X + 2, y);

    doc.setFont("helvetica", "bold");
    doc.text(title || "Project", MARGIN_X + 8, y);

    // description wrapped on the next line(s)
    if (desc) {
      const wrapped = doc.splitTextToSize(desc, MAX_W);
      y = ensureSpace(y, wrapped.length * LH_TIGHT + 6);
      doc.setFont("helvetica", "normal");
      doc.text(wrapped, MARGIN_X + 8, y + 4); // slight offset below title line
      y += 4 + wrapped.length * LH_TIGHT;
    } else {
      y += LH_TIGHT;
    }

    if (idx < normalized.length - 1) y += ITEM_GAP;
  });

  y += 4;
  hr(y);
  y += 8;

  // ---------- EXTRA-CURRICULAR ----------
  y = section("EXTRA-CURRICULAR ACTIVITIES", y);
  const extraLines = (data.extracurricular || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const extras = extraLines.length
    ? extraLines
    : [
        "Organized monthly tech meetups (150+ attendees) and weekly coding circles.",
        "Published 12 blog posts on JS and GenAI; 30k total reads.",
      ];
  y = bulletBlock(extras, y + 2);

  const baseName = (data.firstname || "Resume") + "_" + (data.lastname || "Template");
  doc.save(`${baseName}_ImageStyle.pdf`);
}

// ---- COMPONENT
const Resume: React.FC = () => {
  const formik = useFormik<ResumeFormValues>({
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
      linkedin: "",
      github: "",
      projects: "",
      extracurricular: "",
      experience: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false, // fewer re-renders; validate on submit mostly
    onSubmit: (values) => {
      generatePDF(values);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:bg-gradient-to-b dark:from-zinc-950 dark:to-zinc-900 py-12 px-4">
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-xl ring-1 ring-slate-200 dark:ring-zinc-800">
          <div className="border-b border-slate-200 dark:border-zinc-800 px-8 py-6">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">SkillHigh Resume Builder</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Fill in your details and generate a clean PDF resume.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="px-8 py-8">
            {/* Personal Info */}
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Personal Information</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">First name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="First Name"
                    className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  {formik.touched.firstname && formik.errors.firstname && (
                    <p className="mt-1 text-xs text-rose-600">{formik.errors.firstname}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Last name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Last Name"
                    className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  {formik.touched.lastname && formik.errors.lastname && (
                    <p className="mt-1 text-xs text-rose-600">{formik.errors.lastname}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="example@gmail.com"
                    className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-xs text-rose-600">{formik.errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Mobile number</label>
                  <input
                    type="tel"
                    name="mobnum"
                    value={formik.values.mobnum}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Mobile number"
                    className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  {formik.touched.mobnum && formik.errors.mobnum && (
                    <p className="mt-1 text-xs text-rose-600">{formik.errors.mobnum}</p>
                  )}
                </div>

                <div className="md:col-span-1">
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    LinkedIn URL (optional)
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formik.values.linkedin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="https://www.linkedin.com/in/your-handle"
                    className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  {formik.touched.linkedin && formik.errors.linkedin && (
                    <p className="mt-1 text-xs text-rose-600">
                      {formik.errors.linkedin as string}
                    </p>
                  )}
                </div>

                <div className="md:col-span-1">
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    GitHub URL (optional)
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formik.values.github}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="https://github.com/your-handle"
                    className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  {formik.touched.github && formik.errors.github && (
                    <p className="mt-1 text-xs text-rose-600">
                      {formik.errors.github as string}
                    </p>
                  )}
                </div>

                {/* <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Address (optional)
                  </label>
                  <textarea
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="House No, Street, City, State, Zip"
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                </div> */}
              </div>
            </section>

            {/* Objective */}
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Objective (optional)</h2>
              <textarea
                name="obj"
                value={formik.values.obj}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="A concise statement summarizing your goals and strengths..."
                rows={4}
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </section>

            {/* Experience */}
            <section className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Experience (optional)</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  First line is job heading (e.g. <i>Acme – SWE | Jan 2023 – Present</i>).<br />
                  Following lines are bullet points. Use blank lines to separate jobs.
                </p>
              </div>
              <textarea
                name="experience"
                value={formik.values.experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={`Acme Corp – Software Engineer | Jan 2023 – Present
- Built and scaled RAG chatbot; reduced ticket time by 38%.
- Cut P95 latency from 780ms to 210ms via caching and DB tuning.

Beta Labs – Intern | May 2022 – Aug 2022
- Prototyped analytics dashboards; increased adoption by 12%.`}
                rows={6}
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </section>

            {/* Skills */}
            <section className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Skills</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tip: Separate with commas or new lines</p>
              </div>
              <textarea
                name="skills"
                value={formik.values.skills}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="AWS Bedrock, RAG, TypeScript, Prisma, Docker, Kubernetes"
                rows={3}
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
              {formik.touched.skills && formik.errors.skills && (
                <p className="mt-1 text-xs text-rose-600">{formik.errors.skills}</p>
              )}
            </section>

            {/* Projects */}
            <section className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">Projects (optional)</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  One per line. Optional format: <strong>Title - description</strong>
                </p>
              </div>
              <textarea
                name="projects"
                value={formik.values.projects}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={`Smart RAG Assistant - Built a Bedrock-powered RAG chatbot that cut ticket resolution time by 40%.
E-commerce Analytics - Designed ELT + dashboards to reduce churn by 12%.`}
                rows={4}
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </section>

            {/* Extra-Curricular */}
            <section className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Extra-Curricular Activities (optional)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">One bullet per line</p>
              </div>
              <textarea
                name="extracurricular"
                value={formik.values.extracurricular}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={`Organized monthly tech meetups with 150+ attendees.
Published 10+ blog posts on GenAI.`}
                rows={3}
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </section>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => formik.resetForm()}
                className="rounded-lg border border-slate-300 dark:border-zinc-700 px-5 py-2.5 text-sm cursor-pointer font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-800"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-lg bg-primary dark:bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm cursor-pointer"
              >
                Generate PDF
              </button>
            </div>
          </form>
        </div>

      
      </div>
    </div>
  );
};

export default Resume;
