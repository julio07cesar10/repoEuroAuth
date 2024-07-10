import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from 'crypto';

const generateCredentialsByName = async (req, res) => {

    const {appId, endPoint, expirationTime} = req.body;

    try {
      const app = await prisma.eAU_APP.findFirst({
        where: {
          APP_IDAPP: appId,
        },
      });
      console.log("app", app);
      const secret  = generateSecret(app.APP_NOMBRE);
      const clientId = generateSecret(app.APP_NOMBRE);

      const credential = await prisma.eAU_CREDENCIAL.create({
        data: {
        APP_IDAPP: app.APP_IDAPP,
        CRD_CLIENT_ID: clientId,
        CRD_CLIENT_SECRET: secret,
        CRD_TIEMPO_EXPIRACION: expirationTime,
        CRD_ENDPOINT: endPoint,
        },
      });

      return res.status(200).json({ client_secret: credential.CRD_CLIENT_SECRET, client_id: credential. CRD_CLIENT_ID});
    } catch (error) {
      console.error("❌Error :", error);
      return res.status(500).json({
        success: false,
        message: "Ocurrió un error al validar Credenciales",
      });
    }
  };

function generateSecret(nombre){
    const random = crypto.randomBytes(16).toString('base64')
    const mixed = nombre + random;
    return crypto.createHash('sha256').update(mixed).digest('base64');
}

export { generateCredentialsByName };