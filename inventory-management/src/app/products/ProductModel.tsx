import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "../(components)/Header/header";

interface ProductFormData {
  productId: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (FormData: ProductFormData) => void;
}

function ProductModel(props: Props) {
  const { isOpen, onClose, onCreate } = props;

  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 2,
    rating: 0,
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const labelStyles = "block text-sm font-medium text-gray-700";
  const inputStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="create new Product" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="productName" className={labelStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
            value={formData.name}
            className={inputStyles}
            required
          />
          <label htmlFor="productPrice" className={labelStyles}>
            Product Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputStyles}
            required
          />
          <label htmlFor="productName" className={labelStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputStyles}
            required
          />
          <label htmlFor="productName" className={labelStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputStyles}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create Product
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductModel;
