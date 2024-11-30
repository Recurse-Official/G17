"use client";
import React from "react";
import { useDispatch } from "react-redux";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { useAppSelector } from "@/store/store";
import { setIsSideBarCollapsed } from "@/state";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {}

interface sideBarLinksProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SideBarLinks = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: sideBarLinksProps) => {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4 "
        } hover:text-blue-500 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

function SideBar(props: Props) {
  const dispatch = useDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );

  const toggleSideBar = () => {
    dispatch(setIsSideBarCollapsed(!isSideBarCollapsed));
  };

  const sideBarNames = `fixed flex flex-col ${
    isSideBarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  const router = useRouter();
  return (
    <div className={sideBarNames}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSideBarCollapsed ? "px-4" : "px-9"
        }`}
      >
        <div>
          <h1>Logo</h1>
        </div>
        <h1
          onClick={() => {
            router.push("/");
          }}
          className={`font-extrabold text-3xl ${
            isSideBarCollapsed ? "hidden" : "block"
          } cursor-pointer`}
        >
          SmartStock
        </h1>
        <button
          onClick={toggleSideBar}
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
        >
          <Menu className="w-4 h-4 " />
        </button>
      </div>
      <div className="flex-grow mt-8">
        <SideBarLinks
          href="/"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSideBarCollapsed}
        />
        <SideBarLinks
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSideBarCollapsed}
        />
        <SideBarLinks
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSideBarCollapsed}
        />
        <SideBarLinks
          href="/users"
          icon={Users}
          label="Users"
          isCollapsed={isSideBarCollapsed}
        />
        <SideBarLinks
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSideBarCollapsed}
        />
        <SideBarLinks
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSideBarCollapsed}
        />
      </div>
      <div>{/* Footer */}</div>
      <div>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Inventrier
        </p>
      </div>
    </div>
  );
}

export default SideBar;
