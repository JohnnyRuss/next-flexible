import React from "react";

import { getCurrentUser } from "@/lib/session";

import Link from "next/link";
import Image from "next/image";

import { NavLinks } from "@/constants";
import AuthProviders from "@/components/AuthProviders";
import ProfileMenu from "@/components/ProfileMenu";

interface NavBarType {}

const NavBar: React.FC<NavBarType> = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flex-start gap-10">
        <Link href="/">
          <Image src={"/logo.svg"} width={115} height={43} alt="Flexible" />
        </Link>

        <ul className="xl:flex hidden text-sm gap-7 mt-2">
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href={"/create-project"}>Share work</Link>
          </>
        ) : (
          <>
            <AuthProviders />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
