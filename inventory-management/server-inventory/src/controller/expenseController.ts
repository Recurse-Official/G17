import {Request,Response} from "express"
import { PrismaClient } from "@prisma/client"

const prisma=new PrismaClient();
export const getExpensesByCategory=async(req:Request,res:Response):Promise<void>=>{
  try{
    const getDataRaw=await prisma.expenseByCategory.findMany({
      orderBy:{
          date:"desc"
      }
    });
    const expenseByCategory=getDataRaw.map((item)=>({
      ...item,
      amount:item.amount.toString()
    }))
    res.json(expenseByCategory);
  }catch(err){
    res.status(500).send({message:"Expense by category is not found"});
  }
}