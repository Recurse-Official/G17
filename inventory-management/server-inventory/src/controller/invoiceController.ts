import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express";

const prisma =new PrismaClient();

export const getDataFromSpecific=async (req:Request,res:Response)=>{
  try {
    const {startDate,endDate}=req.body;
    const invoiceData=await prisma.purchases.findMany({
        where:{
          timestamp:{
            gte:new Date(startDate),
            lte:new Date(endDate)
          }
        },
        select:{
          product:true,

        }
    })
    res.send(invoiceData);
  } catch (error) {
    console.log(error)
  }
}