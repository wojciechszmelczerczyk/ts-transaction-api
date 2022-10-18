import { Application } from "express";
import { createServer } from "./utils/createServer";

const app: Application = createServer();

app.listen(3000, () => console.log("Server running on port 3000"));
