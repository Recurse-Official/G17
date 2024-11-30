"use client";
import { useGetDashboardMetricQuery, useGetProductsQuery } from "@/state/api";
import React from "react";
import Header from "../(components)/Header/header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {}

const columns: GridColDef[] = [
  {
    field: "productId",
    headerName: "ID",
    width: 290,
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 290,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 200,
    valueGetter: (value, row) => `${row.rating ? row.rating : "N/A"}`,
  },
  {
    field: "price",
    headerName: "Price",
    width: 240,
    valueGetter: (value, row) => `${row.price} rs`,
  },

  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 100,
  },
];
function Page(props: Props) {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const {} = props;
  return isLoading ? (
    <div>Loading....</div>
  ) : (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
}

export default Page;
