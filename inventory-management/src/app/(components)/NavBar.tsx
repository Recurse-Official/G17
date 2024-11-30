"use client";
import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import { useAppSelector } from "@/store/store";
import { setIsDarkMode, setIsSideBarCollapsed } from "@/state";

interface Props {}

function NavBar(props: Props) {
  const dispatch = useDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );

  const toggleSideBar = () => {
    dispatch(setIsSideBarCollapsed(!isSideBarCollapsed));
  };
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const onToggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 text-gray-500 rounded-full hover:bg-slate-500 hover:text-white"
          onClick={toggleSideBar}
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="relative">
          <input
            type="search"
            placeholder="Search type"
            className="pl-10 pr-4 py-2 w-50 md:w-80 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <button onClick={onToggleDarkMode}>
            {isDarkMode ? (
              <Sun className="cursor-pointer text-gray-500" />
            ) : (
              <Moon className="cursor-pointer text-gray-500" />
            )}
          </button>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] font-semibold bg-red-400 rounded-lg text-gray-500">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-gray-300 mx-3 border-l" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9">Image</div>
            <span className="font-semibold">Krishna</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="text-gray-500 cursor-pointer" size={25} />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
