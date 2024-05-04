import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import Buttons from "../Button/Button";
import useLoggedUser from "../../hooks/loggedUser/useLoggedUser";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

const Header = () => {
  const [data, loading, refetch] = useLoggedUser();

  const { accessToken,setAccessToken ,refreshToken,setRefreshToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (accessToken && !loading && data) {
      refetch();
    }
    console.log("viewer here", data);
  }, [data, loading, accessToken, refreshToken]);

  const handleLogout = (e: any) => {
    e.preventDefault();
    setAccessToken(null);
    setRefreshToken(null);
    router.push('/login'); 

  };

  return (
    <>
      <div className="w-full bg-[#f3ebeb]">
        <div className="relative">
          <div className="flex justify-between items-center p-4 bg-white">
            <div className="mt-14">
              <Image
                src="/design-files/TTLogo.png"
                alt="TTLogo"
                width={470}
                height={60}
              />
            </div>
            {data?.me?.id ? (
              <div className="mt-14 mr-4">
                <Buttons
                  color="#4c44fb"
                  text="Log out"
                  height="51px"
                  width="152px"
                  radius="3px"
                  onClick={handleLogout}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full h-[2px] bg-gray-300"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
