import React from "react";
import Image from "next/image";

import { footerLinks } from "@/constants";

import FooterColumn from "@/components/FooterColumn";

interface FooterType {}

const Footer: React.FC<FooterType> = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex flex-start flex-col">
          <Image
            src="/logo-purple.svg"
            width={115}
            height={48}
            alt="Flexible"
          />

          <p className="text-start text-sm font-normal max-w-xs mt-5">
            Flexible is the world's leading community for creatives to share,
            grow, and get hired.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />

          <div className="flex-1 flex-col gap-4">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>

          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />

          <div className="flex-1 flex-col gap-4">
            <FooterColumn
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumn
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>

          <FooterColumn
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>
      </div>

      <div className="flexBetween footer_copyright">
        <p>&copy; 2023 Flexible. All rights reserved.</p>

        <p className="text-gray">
          <span className="text-black font-semibold">10214</span>
          projects submitted
        </p>
      </div>
    </footer>
  );
};

export default Footer;
