"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "@auth/core/types";

const Header = ({ session }: { session: Session }) => {
  const pathName = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />{" "}
      </Link>
      <ul className="items-center-gap-8 flex flex-row">
        <li className="flex items-center">
          <Link
            href="/library"
            className={cn(
              "cursor-pointer text-base capitalize",
              pathName === "/library" ? "text-light-200" : "text-light-100",
            )}
          >
            Library
          </Link>
        </li>
        <li className="flex items-center">
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
