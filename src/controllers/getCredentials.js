import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {  DateTimewithSeconds} from "../utils/functions.js";
const getCredentialsByIdCredencial = async (id, secret) => {
  if (!id || !secret) {
    return {
      success: false,
      message: "Client_ID y Client_Secret son obligaorios",
    };
  }
  try {
    const validarid = await prisma.eAU_CREDENCIAL.findFirst({
      where: {
        CRD_CLIENT_ID: id,
        CRD_CLIENT_SECRET: secret,
      },
    });
    console.log("validarid", validarid);

    if (!validarid) {
      return {
        success: false,
        message: "❌No se encontró token",
      };
    }
    return { success: true, data: validarid };
  } catch (error) {
    console.error("❌Error :", error);
    return {
      success: false,
      message: "❌Ocurrió un error al validar Credenciales",
    };
  }
};

const saveToken = async (id, token, expiresIn) => {
  const fechaVencimiento = DateTimewithSeconds(expiresIn)
  try {
    const save = await prisma.eAU_TOKEN.create({
      data: {
        CRD_IDCREDENCIAL: id,
        TKN_TOKEN: token,
        TKN_FECHA_VENCIMIENTO: fechaVencimiento,
      },
    });

    if (!save) {
      return {
        success: false,
        message: "❌No se registró token",
      };
    }
    return { success: true, data: save };
  } catch (error) {
    console.error("❌Error :", error);
    return {
      success: false,
      message: "❌Ocurrió un error al registrar Token",
    };
  }
};
const saveLog = async (id, objOrigen, objRespuesta) => {
  const entidad= "EAU_TOKEN";
  const accion= "REGITRAR";
  try {
    const save = await prisma.eAU_LOG.create({
      data: {
      TKN_IDTOKEN: id,
      LOG_ACCION: accion,
      LOG_ENTIDAD: entidad, 
      LOG_OBJETO_ORIGEN: objOrigen,
      LOG_OBJETO_RESPUESTA: objRespuesta,
      },
    });

    if (!save) {
      return {
        success: false,
        message: "❌No se registró Log",
      };
    }
    return { success: true, data: save };
  } catch (error) {
    console.error("Error :", error);
    return {
      success: false,
      message: "❌Ocurrió un error al registrar Log",
    };
  }
};
const testToken = async (req, res) => {
  return res.status(200).json({ success: true, data: "✅Información Correcta" });
};
export { getCredentialsByIdCredencial, saveToken, testToken, saveLog };