"use client";

import Buttons from "@/components/Button/Button";
// import Buttons from '@/components/Button/Button'
// import Tables from '@/components/Tables'

import { Typography } from "@mui/material";
import Image from "next/image";
import useLogin from "../../hooks/login/useLogin";
import LoginForm from "@/components/LoginForm";

export default function Table() {
 

  return (
    <>
      <div className="w-full bg-[#f3ebeb]">
          <div className="mx-auto  w-full max-w-md">
            <LoginForm />
        </div>
      </div>
    </>
  );
}
