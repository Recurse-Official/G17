import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()



export const getDashboardMetric=async(req:any,res:any)=>{
    try{
      console.log("hii")
      const popularProducts=await prisma.products.findMany({
        take:5,
        orderBy:{
          price:"desc"
        }
      })
      const salesSummary=await prisma.salesSummary.findMany({
        take:5,
        orderBy:{
          date:"desc"
        }
      })
      const purchaseSummary=await prisma.purchaseSummary.findMany({
        take:5,
        orderBy:{
          "date":"desc"
        }
      })
      const expenseSummary=await prisma.expenseSummary.findMany({
        take:5,
        orderBy:{
          "date":"desc"
        }
      })
      const ExpenseByCategorySummaryRaw=await prisma.expenseByCategory.findMany({
        take:5,
        orderBy:{
          "date":"desc"
        }
      })  
      const expenseByCategory=ExpenseByCategorySummaryRaw.map((item)=>(
        {
          ...item,
          amount:item.amount.toString()
        }
      ))
      res.json({
        popularProducts,
        salesSummary,
        purchaseSummary,
        expenseSummary,
        expenseByCategory
      })

    }
    catch(err){
        res.status(500).json({message:"Error retrieving dashboard metrics"})
    }
}