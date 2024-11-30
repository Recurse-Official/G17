"use client";
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import React, { useState } from "react";
import Header from "../(components)/Header/header";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { Button } from "@mui/material";
import Rating from "../(components)/Rating";
import ProductModel from "./ProductModel";

interface Props {}

type createProductType = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};
function Page(props: Props) {
  const {} = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const { data: products, isLoading, isError } = useGetProductsQuery();

  const handleCreateProduct = async (productData: createProductType) => {
    console.log("file here");
    await createProduct(productData);
  };
  return (
    <div className="flex flex-col mx-auto pb-5 w-full">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mb-6">
          <Header name="Products" />
          <div className="flex items-center border-2 border-gray-200 rounded justify-between">
            <div className="flex">
              <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
              <input
                className="w-full py-2 px-4 rounded bg-white"
                placeholder="Search Your Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex ">
              <Button
                className="flex items-center   hover:bg-[#00df9a]"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusCircleIcon className="w-5 h-5 mr-2 !text-white" />
                Add Product
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
            {isLoading ? (
              <div>isLoading....</div>
            ) : (
              products?.map((product) => (
                <div
                  key={product.productId}
                  className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
                >
                  <div className="flex flex-col items-center">
                    img
                    <h3 className="text-lg text-gray-900 font-semibold">
                      {product.name}
                    </h3>
                    <p className="text-gray-800">{product.price.toFixed(2)}</p>
                    <div className="text-sm text-gray-600 mt-1">
                      Stock: {product.stockQuantity}
                    </div>
                    {product.rating && (
                      <div className="flex items-center mt-2">
                        <Rating rating={product.rating} />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <ProductModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onCreate={(form: createProductType) => {
          handleCreateProduct(form);
        }}
      />
    </div>
  );
}

export default Page;
