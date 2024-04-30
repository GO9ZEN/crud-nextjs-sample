"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getStaff, getStaffList } from "./staff-actions";
import { useRouter } from "next/navigation";

export default function StaffList() {
  const [staffData, setStaffData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSt = async () => {
      const res = await getStaffList();
      console.log(res);
      setStaffData(res.data);
    };

    fetchSt();
  }, []);
  //////////////////////////////////////////
  // const [getStaffId, setGetStaffId] = useState([]);

  // useEffect(() => {
  //   const fetchStId = async (id: number) => {
  //     const resId = await getStaff(id);
  //     console.log(resId);
  //     setGetStaffId(resId.data);
  //   };

  //   fetchStId();
  // }, []);

  const handleGetId = (id: number) => {
    console.log("id is", id);
    // console.log(getStaffId);

    router.push("/staff/" + id);
  };

  return (
    <Table>
      <TableCaption>SAVED DATA</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead className="text-right">Role</TableHead>
          {/* <TableHead className="text-right">Update</TableHead> */}
          {/* <TableHead className="text-right">Delete</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {staffData.map((row: any) => (
          <TableRow key={row.id} onClick={() => handleGetId(row.id)}>
            <TableCell className="font-medium">{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.username}</TableCell>
            <TableCell className="text-right">{row.role}</TableCell>
            {/* <TableCell className="text-right">
              <button className="bg-green-300 p-5">Update</button>
            </TableCell>
            <TableCell className="text-right">
              <button className="bg-red-300 p-5">Delete</button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
