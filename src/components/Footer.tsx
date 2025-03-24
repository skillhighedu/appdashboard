import { useLocation } from "react-router-dom";
import { Linkedin, Mail, Instagram, Twitter } from "lucide-react";
import Logo from "@assets/images/logo.png";
import Tooltip from "./ToolTip";

export default function Footer() {
  const { pathname } = useLocation();
  const hiddenRoutes = ["/course_player"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  const socialMediaLinks = [
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/skillhigh/",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      href: "mailto:admin@skillhigh.in",
    },
    {
      icon: <Instagram size={20} />,
      label: "Instagram",
      href: "https://www.instagram.com/_skillhigh_",
    },
    {
      icon: <Twitter size={20} />,
      label: "Twitter",
      href: "https://x.com/SkillHighedu?t=IIeZAdbgRGMSyMejhx6v2A&s=08",
    },
  ];

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="w-full bg-gradient-to-r from-white rounded-t-4xl to-secondary text-gray-700 shadow-lg dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 dark:text-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <a href="/" className="flex items-center space-x-3">
              <img
                src={Logo}
                className="h-auto w-[200px]"
                alt="SkillHigh Logo"
                loading="lazy"
              />
            </a>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Gain Skills. Get Certified. Reach Higher.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary dark:hover:text-primary/80"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connections */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Connect With Us
            </h3>
            <div className="mt-4 flex flex-wrap gap-4">
              {socialMediaLinks.map((social) => (
                <Tooltip key={social.label} text={social.label} position="top">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-all hover:bg-primary hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-primary"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    {social.icon}
                  </a>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        {/* Copyright & Additional Info */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400 md:flex-row">
          <p>© {new Date().getFullYear()} SkillHigh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
