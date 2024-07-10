import express from "express";
import tokenRoutes from "./src/routes/tokenRoutes.js";

const app = express();
const port = 15555;

app.use(express.json());
app.use(tokenRoutes);

//API CORRIENDO
app.listen(port, () => {
  console.log(`🚀Node Js API is listening on port: ${port}`);
});
