import Cert from '@assets/images/certificate.jpg';

type Props = {
  name: string;
  course: string;
  qRCode:string;
  from?: string;
  to?: string;
};

const Certificate = ({ name, course, from, to,qRCode }: Props) => {
  return (
    <div
      className="w-[1120px] h-[790px] bg-cover bg-center bg-no-repeat relative shadow-xl"
      style={{ backgroundImage: `url(${Cert})` }}
    >
      {/* Center text block aligned with certificate's central layout */}
      <div className="absolute top-[270px] left-1/2 transform -translate-x-1/2 w-[70%] text-center">
        <p className="text-lg text-gray-600 mb-2">THIS CERTIFICATE IS AWARDED TO</p>
        <h3 className="text-4xl font-bold text-black">{name || "Your Name"}</h3>
        <p className="mt-6 text-lg text-gray-600">
          for participating in Skill High Industrial Internship
        </p>
        <h4 className="text-2xl font-semibold text-black mt-2">{course || "Course Name"}</h4>
        <p className="mt-4 text-sm text-gray-700">
          Program from {from || "DD/MM/YYYY"} to {to || "DD/MM/YYYY"}
        </p>

        <img src={qRCode}></img>
      </div>
    </div>
  );
};

export default Certificate;
