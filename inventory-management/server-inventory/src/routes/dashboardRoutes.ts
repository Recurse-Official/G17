import { Router } from "express";

import { getDashboardMetric } from "../controller/dashboardController";

const router=Router();

router.get("/",getDashboardMetric);

export default router