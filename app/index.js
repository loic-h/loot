const express = require("express");

const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Loot app");
});

app.listen(PORT, () => {
  console.log(`Loot App listening on ${PORT}`);
})
