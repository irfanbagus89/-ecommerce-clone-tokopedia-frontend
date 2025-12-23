import { Bird, Camera, Play } from "lucide-react";
import Image from "next/image";
import React from "react";

const FooterUser = () => {
  // Data untuk mempermudah rendering kolom
  const footerLinks = [
    {
      title: "Tokopedia",
      links: [
        "About Us",
        "Careers",
        "Blog",
        "Tokopedia Parents",
        "Tokopedia Affiliate",
      ],
    },
    {
      title: "Buy",
      links: ["Bill Payment", "Tokopedia Care", "Deals"],
    },
    {
      title: "Sell",
      links: [
        "Seller Education Centre",
        "Mitra Toppers",
        "Register Official Store",
      ],
    },
  ];

  // Placeholder untuk ikon sosial (gunakan React Icons atau SVG asli di produksi)
  const SocialIcon = ({ children }) => (
    <a
      href="#"
      className="text-gray-600 hover:text-green-600 transition duration-150 text-xl mr-4"
    >
      {children}
    </a>
  );

  return (
    <footer className="bg-white pt-10 pb-4 text-sm text-gray-600 border-t border-gray-100 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          {/* Kolom Links (Tokopedia, Buy, Sell) */}
          <div className="flex w-full md:w-3/5 lg:w-3/4 flex-wrap">
            {footerLinks.map((section) => (
              <div key={section.title} className="w-1/2 sm:w-1/3 mb-6 md:mb-0">
                <h4 className="font-semibold text-base text-gray-800 mb-4">
                  {section.title}
                </h4>
                <ul>
                  {section.links.map((link) => (
                    <li key={link} className="mb-2">
                      <a
                        href="#"
                        className="hover:text-green-600 transition duration-150"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Kolom Download App & Follow Us */}
          <div className="w-full md:w-2/5 lg:w-1/4">
            <div className="mb-4">
              <h4 className="font-semibold text-base text-gray-800 mb-4">
                Download App
              </h4>
              <div className="flex flex-col space-y-3">
                <a href="https://play.google.com/store/apps/details?id=com.tokopedia.tkpd&hl=en">
                  <div className="relative w-32 h-10">
                    <Image
                      src="/icons/play-store.png"
                      alt="Get it on Google Play"
                      fill
                    />
                  </div>
                </a>

                <a href="https://apps.apple.com/id/app/tokopedia/id1001394201">
                  <div className="relative w-32 h-10">
                    <Image
                      src="/icons/app-store.png"
                      alt="Get it on App Store"
                      fill
                    />
                  </div>
                </a>
              </div>
            </div>

            {/* Follow Us */}
            
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className="my-8 border-gray-200" />

        {/* Bagian Bawah Footer (Copyright & T&C) */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
          <div className="mb-3 sm:mb-0">
            © 2009-2024. PT Tokopedia. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-600 transition duration-150">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-600 transition duration-150">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterUser;
