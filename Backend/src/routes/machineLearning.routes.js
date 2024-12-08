import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getResearchPaper } from "../controllers/machineLearning.controllers.js";
const router = Router();

router.route('/getResearchPaper').post(verifyJWT, getResearchPaper);

export default router;