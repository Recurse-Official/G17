import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createProduct, getProducts } from "../../server-inventory/src/controller/productController";

export interface DashboardMetrics{
     popularProducts:Product[],
     salesSummary:SalesSummary[],
     purchaseSummary:PurchaseSummary[],
     expenseSummary:ExpenseSummary[],
     expenseByCategory:ExpenseByCategory[]
}

export interface Product{
  productId:string,
  name:string,
  price:number,
  rating?:number,
  stockQuantity:number
}

export interface newProduct{
  name:string,
  price:number,
  rating?:number,
  stockQuantity:number
}
export interface SalesSummary{
  salesSummaryId:string,
  totalValue:number,
  changePercentage?:number,
  date:string
}

export interface PurchaseSummary{
  purchaseSummaryId:string,
  totalPurchased:number,
  changePercentage?:number,
  date:string
}

export interface ExpenseSummary{
  expenseSummaryId:string,
  totalExpenses:number,
  date:string
}

export interface ExpenseByCategory{
  expenseByCategorySummaryId:string,
  category:string,
  amount:string,
  date:string
}

export interface Users{
  userId:string,
  name:string,
  email:string 
}

export interface Expenses{
  expenseByCategorySummaryId:string
  expenseSummaryId:string
  category:string
  amount:string
  date:string
}

export const api=createApi({
  baseQuery:fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_API_BASE_URL}),
  reducerPath:"api",
  tagTypes:["DashboardMetrics","Products","Users","Expenses"],
  endpoints:(build)=>({
    getDashboardMetric:build.query<DashboardMetrics,void>({
      query:()=>"/",
      providesTags:["DashboardMetrics"]
    }),
  
    getProducts:build.query<Product[],string|void>({
      query:(search)=>(
        {
          url:"/products",
          params:search?{search}:{}
        }
      ),
      providesTags:["Products"]
    }),
    createProduct:build.mutation<Product,newProduct>({
      query:(newProduct)=>(
        {
          url:"/products",
          method:"POST",
          body:newProduct
        }
      ),
      invalidatesTags:["Products"]
    }),
    getUsers:build.query<Users[],void>({
      query:()=>(
        {
          url:"/users",
        }
      ),
      providesTags:["Users"]
    }),
    getExpenses:build.query<Expenses[],void>({
      query:()=>(
        {
          url:"/expenses",
        }
      ),
      providesTags:["Expenses"]
    })
  })
 
})

export const { useGetDashboardMetricQuery,useCreateProductMutation,useGetProductsQuery,useGetUsersQuery,useGetExpensesQuery}=api;