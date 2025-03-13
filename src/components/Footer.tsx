import { useLocation } from "react-router-dom";
import { Linkedin, Mail, Instagram } from "lucide-react";
import Logo from "@assets/images/logo.png";
import Tooltip from "./ToolTip";

export default function Footer() {
  const router = useLocation(); // Get current route

  const hiddenRoutes = ["/course_player"];

  if (hiddenRoutes.includes(router.pathname)) {
    return null; // Hide Footer if the current route is in hiddenRoutes
  }

  const socialMediaIcons = [
    { icon: <Linkedin size={20} />, text: "LinkedIn", link: "https://linkedin.com" },
    { icon: <Mail size={20} />, text: "Mail", link: "mailto:someone@example.com" },
    { icon: <Instagram size={20} />, text: "Instagram", link: "https://instagram.com" },
  ];

  return (
    <footer className="w-full bg-gradient-to-r from-white to-secondary dark:bg-gray-900 text-gray-700 dark:text-black rounded-t-3xl shadow-lg">
      <div className="container mx-auto px-6 py-10">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left md:text-left">
          {/* Company Info */}
          <div>
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={Logo} className="h-auto w-[200px]" alt="Logo" />
            </a>
            <p className="mt-3 ml-6 text-sm">Gain Skills. Get Certified. Reach Higher.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-black">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {["Home", "Services", "Portfolio", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-primary dark:hover:text-primary transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Connect with Us</h3>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {socialMediaIcons.map((socialMedia, index) => (
                <Tooltip key={index} text={socialMedia.text} position="top">
                  <a
                    href={socialMedia.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary transition"
                  >
                    {socialMedia.icon}
                  </a>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-sm">© {new Date().getFullYear()} SkillHigh. All rights reserved.</div>
      </div>
    </footer>
  );
}
