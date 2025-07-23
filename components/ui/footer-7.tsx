import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Ccircle cx='50' cy='50' r='45' fill='white' stroke='%23e5e7eb' stroke-width='2'/%3E%3Cpath d='M30 35h40v8H30v-8zm0 16h40v8H30v-8zm0 16h28v8H30v-8z' fill='black'/%3E%3C/svg%3E",
    alt: "TechFlow logo",
    title: "Query Build",
  },
  sections = defaultSections,
  description = "Building innovative solutions for modern businesses. Streamline your workflow with our cutting-edge technology platform.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 TechFlow. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <footer className="mt-auto bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start">
            {/* Logo and Description Section */}
            <div className="flex w-full max-w-md flex-col gap-6 lg:max-w-sm">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <Link href={logo.url} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                  <h2 className="text-2xl font-bold tracking-tight">{logo.title}</h2>
                </Link>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                {description}
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:scale-110"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 xl:gap-16">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.href}
                          className="text-gray-300 transition-colors duration-200 hover:text-blue-400 hover:underline"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-400">
              {copyright}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {legalLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-blue-400 hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};