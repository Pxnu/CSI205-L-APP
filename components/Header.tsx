"use client";
import { Badge } from "@/components/tailgrids/core/badge";

export default function Header() {
  return (
    // header cntainer
    <div className="my-4 text-center">
      {/* รหัสวิชา */}
      <div className="flex justify-center gap-2.5 my-4">
        <Badge color='blue' size="lg" className="text-4xl rounded-lg px-4 rotate-5 bg-red-600 text-white-100">C</Badge>
        <Badge color='cyan' size="lg" className="text-4xl rounded-lg px-4 rotate-355 bg-green-600 text-white-100">S</Badge>
        <Badge color='orange' size="lg" className="text-4xl rounded-lg px-5 rotate-5 bg-blue-600 text-white-100">I</Badge>
        <Badge color='pink' size="lg" className="text-4xl rounded-lg px-4 rotate-355 bg-cyan-500 text-white-100">2</Badge>
        <Badge color='purple' size="lg" className="text-4xl rounded-lg px-4 rotate-5 bg-yellow-500 text-white-100">0</Badge>
        <Badge color='rose' size="lg" className="text-4xl rounded-lg px-4 rotate-355 bg-gray-500 text-white-100">5</Badge>
      </div>

      {/* ชื่อวิชา */}
      <div className="flex justify-center mx-auto bg-black text-white-100 w-[380px] p-1 rounded-lg font-bold text-lg uppercase">Front end software development</div>
    </div>
  );
}
