"use client";
import React, { Children, useEffect } from "react";
import SideBar from "./SideBar";
import StoreProvider, { useAppSelector } from "@/store/store";
interface Props {
  children: React.ReactNode;
}

function DashBoardWrapper(props: Props) {
  const { children } = props;
  return (
    <StoreProvider>
      <DashBoardLayout>{children}</DashBoardLayout>
    </StoreProvider>
  );
}
function DashBoardLayout(props: Props) {
  const { children } = props;
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });
  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-90 w-full min-h-screen`}
    >
      <SideBar />
      <main
        className={` flex flex-col w-full h-full py-7 px-9 bg-gray-50 md:pl-24 ${
          isSideBarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default DashBoardWrapper;
