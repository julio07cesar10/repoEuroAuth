const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getCredentialsByIdCredencial(idCredencial) {
  try {
    const credentials = await prisma.EAU_CREDENCIAL.findUnique({
      where: {
        CRD_IDCREDENCIAL: parseInt(idCredencial),
      },
      select: {
        CRD_IDCREDENCIAL: true,
        APP_IDAPP: true,
        CRD_ENDPOINT: true,
        CRD_CLIENT_ID: true,
        CRD_CLIENT_SECRET: true,
        CRD_TIEMPO_EXPIRACION: true,
      },
    });
    return credentials;
  } catch (error) {
    throw new Error(`❌Failed to get credentials: ${error.message}`);
  }
}

module.exports = {
  getCredentialsByIdCredencial,
};
