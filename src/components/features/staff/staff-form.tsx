"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PasswordInput } from "@/components/password-input";
import {
  deleteStaffId,
  getStaff,
  insertStaff,
  updateStaff,
} from "./staff-actions";
import { useRouter } from "next/navigation";

export const staffFormSchema = z
  .object({
    id: z.coerce.number().optional(),
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    contactno: z.string().array(),
    nic: z.string(),
    contracttype: z.string(),
    role: z.string(),
    password: z.string().min(5),
    confirmpassword: z.string().min(5),
  })
  .refine((values) => values.password === values.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

type Staffprops = {
  params?: { staffId: number };
  color?: number;
  staffid?: number;
};

export default function StaffForm({
  // params,
  // color = -1,
  staffid = 0,
}: Staffprops) {
  const router = useRouter();

  const [id, setid] = useState<number>(0);
  // 1. Define your form.
  const form = useForm<z.infer<typeof staffFormSchema>>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const {
    watch,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields, isLoading },
  } = form;

  useEffect(() => {
    setid(staffid);
    if (staffid != 0) {
      const fetchSt = async () => {
        const res = await getStaff(staffid);
        console.log(res);
        if (res.data) {
          form.reset(res.data);
        }
      };

      fetchSt();
    }
  }, []);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof staffFormSchema>) {
    //const res = await insertStaff();
    //console.log(res);
    if (id == 0) {
      insertStaff(values)
        .then((res) => {
          console.log(res);
          setid(res.lastInsertRowid);
          setValue("id", res.lastInsertRowid);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      //update
      updateStaff(values)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  async function handleDelete() {
    deleteStaffId(id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="flex flex-col items-start justify- py-12 px-12 my-12 mx-12 gap-10 border border-black">
      <h1 className="text-xl">Add New Members</h1>

      <div className="flex gap-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id</FormLabel>
                  <FormControl>
                    {/* <FormLabel {...field}></FormLabel> */}
                    <Input placeholder="Id" type="number" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactno.0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Home number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactno.1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIC</FormLabel>
                  <FormControl>
                    <Input placeholder="NIC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contracttype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contract type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Contract Type</SelectLabel>
                          <SelectItem value="training">Training</SelectItem>
                          <SelectItem value="probation">Probation</SelectItem>
                          <SelectItem value="permanent">Permanent</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Role</SelectLabel>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="Password" {...field} /> */}
                    <PasswordInput {...field} placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="Confirm passwrod" {...field} /> */}
                    <PasswordInput {...field} placeholder="Confirm passwrod" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-8">
              <Button type="submit">{id == 0 ? "Add" : "Update"}</Button>

              {id == 0 ? null : (
                <Button type="button" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
