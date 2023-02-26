const express = require("express");
const app = express();
const router = require("./routes/product");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/product", router);

app.get("/", (_req, res) => {
	res.send('Home Page');
});
app.get("*", (_req, res) => res.status(404).send("not found"));

app.listen(5012);
