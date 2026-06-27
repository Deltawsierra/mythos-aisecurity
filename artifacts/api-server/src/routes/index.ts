import { Router, type IRouter } from "express";
import healthRouter from "./health";
import inquiriesRouter from "./inquiries";
import careersRouter from "./careers";

const router: IRouter = Router();

router.use(healthRouter);
router.use(inquiriesRouter);
router.use(careersRouter);

export default router;
