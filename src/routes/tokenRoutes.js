import {Router} from "express";
import { getCredentialsByIdCredencial, testToken } from "../controllers/getCredentials.js";    
import {authenticateToken } from "../middleware/authenticateToken.js";    
import { generateJWT } from "../controllers/jwtController.js"; 
import {generateCredentialsByName} from "../controllers/generateCrendetial.js"   

const router = Router();

router.post("/generatecredentials", generateCredentialsByName);
router.post("/validarcredentials", generateJWT);
router.get("/validarToken", authenticateToken, testToken)

export default router;
