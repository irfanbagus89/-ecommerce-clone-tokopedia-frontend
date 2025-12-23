"use client";
import HomeContainer from "@/container/User/Home";
import AppLayout from "@/layout/UserLayout/AppLayout";
import React from "react";

const page = () => {
  return (
    <AppLayout>
      <HomeContainer />
    </AppLayout>
  );
};

export default page;
