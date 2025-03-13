import { useState, useRef } from "react";

export default function OTP() {
  const otpLength = 6;
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Store only the last digit
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white w-96 p-8 rounded-3xl shadow-xl border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Enter OTP</h2>
        <p className="text-gray-500 mb-6 text-sm">We've sent a 6-digit OTP to your email.</p>
        
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              value={digit}
              onChange={(event) => handleChange(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg shadow-md 
                        focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-gray-50"
              maxLength={1}
            />
          ))}
        </div>

        <button
          className="mt-6 w-full py-3 text-lg font-semibold text-white bg-primary rounded-lg shadow-md 
                     hover:bg-primary-dark transition-all"
        >
          Verify OTP
        </button>
        
        <p className="mt-4 text-sm text-gray-500">
          Didn't receive the code? <span className="text-primary cursor-pointer hover:underline">Resend</span>
        </p>
      </div>
    </div>
  );
}
