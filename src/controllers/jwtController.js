import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import {
  getCredentialsByIdCredencial,
  saveToken,
  saveLog,
} from "../controllers/getCredentials.js";

const generateJWT = async (req, res) => {
  const { client_id, client_secret } = req.body;
  try {
    //validar si credenciales son correctas
    const result = await getCredentialsByIdCredencial(client_id, client_secret);

    if (result.success) {
      const id = result.data.CRD_CLIENT_ID;
      const payload = { id };
      const secretKey = "EUROMOT0RS";
      const expiresIn = result.data.CRD_TIEMPO_EXPIRACION;
      //genera token
      var token = jwt.sign(payload, secretKey, { expiresIn });
      //guarda token en BD
      const saveTokenTb = await saveToken(
        result.data.CRD_IDCREDENCIAL,
        token,
        expiresIn
      );

      console.log(saveTokenTb);

      const response = {
        access_token: token,
        expires_in: expiresIn,
        token_type: "Bearer",
        App_ID: result.data.APP_IDAPP,
        Endpoint: result.data.CRD_ENDPOINT,
      };
      
      //guardar log
      const requestString = JSON.stringify( req.body);
      const responseString = JSON.stringify(response);
      const saveLogTb = await saveLog(
        saveTokenTb.data.TKN_IDTOKEN,
        requestString,
        responseString
      );
      console.log(saveLogTb)
      return res.status(200).json({ response: response });
    }else{
      throw new Error(result.message);
    }
  } catch (error) {
    console.log("❌Error al generar Token, error");
    return res.status(500).json({
      errorTittle: "❌Error al generar Token ",
      errorMessage: error.message,
    });
  }
};

export { generateJWT };