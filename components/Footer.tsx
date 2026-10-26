"use client";
import { Badge } from "@/components/tailgrids/core/badge";
import { Discord, Facebook, Instagram, Twitter } from "@tailgrids/icons";
import Link from "next/link";

export default function Footer() {
  return (
    // footer container
    <div className="text-center py-4">
      {/* student */}
      <div>
        <Badge className="text-xl text-gray-700 font-bold p-2 rounded-lg my-2">68096159 ภาณุ ศรีบุญเพ็ง</Badge>
      </div>

      {/* coontact */}
      <div className="mt-2 flex justify-center gap-10">
        <Link href={'https://www.facebook.com/panusriboonpaeng/'} target="_blank">
          <Facebook className="text-blue-700" />
        </Link>
        <div className="border-1 border-gray-500"></div>
        <Link href={'https://www.instagram.com/fri4aug/'} target="_blank">
          <Instagram className="text-pink-500"/>
        </Link>
        <div className="border-1 border-gray-500"></div>
        <Link href={'https://x.com/patrick_2006_'} target="_blank">
          <Twitter className="text-black-500"/>
        </Link>
        <div className="border-1 border-gray-500"></div>
        <Link href={'https://discord.com/users/557956416057638952'} target="_blank">
          <Discord className="text-indigo-400"/>
        </Link>
      </div>
    </div>
  );
}
