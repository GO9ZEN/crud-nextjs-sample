"use client";

import StaffForm from "@/components/features/staff/staff-form";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: number } }) {
  useEffect(() => {
    console.log("id is ", params.id);
  }, []);
  return (
    <main className="w-full h-full bg-slate-100">
      <StaffForm staffid={params.id}></StaffForm>
    </main>
  );
}
