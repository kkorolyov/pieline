const express = require("express");
const { openSync, writeSync, closeSync } = require("fs");
const { join } = require("path");

const envVars = ["ADDR_GATE"];

// Apply environment variables to served app
const fd = openSync("env.js", "a");
envVars
  .map((env) => `${env}="${process.env[env]}"\n`)
  .forEach((line) => writeSync(fd, line));
closeSync(fd);

// Serve
const app = express();

app.use(express.static(__dirname));
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
app.listen(process.env.PORT);
