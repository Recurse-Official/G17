import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getDemandData = async (req: Request, res: Response): Promise<void> => {
  try {
    const rawData = await prisma.demand.findMany({
      orderBy:{
        date:"desc"
      }
    });

    const sanitizedData = rawData.map((item) => ({
      ...item,
      price: item.price.toString(),
      available: item.available.toString(),
    }));

    res.json(sanitizedData); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
