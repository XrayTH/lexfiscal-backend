import { Router } from "express";
import { getTributes, getTributeBySlug } from "../controllers/tribute.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateParams, validateQuery } from "../middlewares/validateZod.js";
import { slugParams, paginationQuery } from "../schemas/tributeSchemas.js";

const router = Router();

router.get("/tributes", validateQuery(paginationQuery), asyncHandler(getTributes));
router.get("/tributes/:slug", validateParams(slugParams), asyncHandler(getTributeBySlug));

export default router;