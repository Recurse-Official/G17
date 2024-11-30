"use client";
import { useGetUsersQuery } from "@/state/api";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import React from "react";
import Header from "../(components)/Header/header";

interface Props {}

function Page(props: Props) {
  const {} = props;
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "ID",
      align:"center",
      headerAlign:"center",
      width: 390,
    },
    {
      field: "name",
      headerName: "Product Name",
      align:"center",
      headerAlign:"center",
      width: 490,
    },
    {
      field: "email",
      headerName: "Email",
      align:"center",
      headerAlign:"center",
      width: 300,
    },
  ];
  return isLoading ? (
    <div>Loading....</div>
  ) : (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
}

export default Page;
