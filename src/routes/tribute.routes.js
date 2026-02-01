import { Router } from "express";
import { getTributes, getTributeBySlug } from "../controllers/tribute.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateParams, validateQuery } from "../middlewares/validateZod.js";
import { slugParams, paginationQuery } from "../schemas/tributeSchemas.js";

const router = Router();

// Validamos query de paginación/filtrado (opcional) y luego llamamos al controller
router.get("/tributes", validateQuery(paginationQuery), asyncHandler(getTributes));

// Validamos params antes de ejecutar el controller
router.get("/tributes/:slug", validateParams(slugParams), asyncHandler(getTributeBySlug));

export default router;