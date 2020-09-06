import express, { static } from "express";
import { closeSync, openSync, writeSync } from "fs";
import { join } from "path";

const envVars = ["ADDR_GATE"];

// Apply environment variables to served app
const fd = openSync("env.js", "a");
envVars
  .map((env) => `${env}="${process.env[env]}"\n`)
  .forEach((line) => writeSync(fd, line));
closeSync(fd);

// Serve
const app = express();

app.use(static(__dirname));
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
app.listen(process.env.PORT);
