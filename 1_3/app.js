const express = require("express");
const app = express();
const path = require("path");
const router = require("../1_1/routes/product");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/product", router);

app.get("/", (_req, res) => res.send("Home Page"));
app.get("/products-page", (_req, res) =>
	res.sendFile(path.join(__dirname, "./views/getAllProducts.html"))
);
app.get("/*", (_req, res) => res.status(404).send("not found"));

app.listen(5013);
