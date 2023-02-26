const router = require("express").Router();
const path = require("path");
const { writeFileSync } = require("fs");
const productsData = require("../../products-data.json");

//get all products
router.get("/get-all-products", (_req, res) => {
	res.json(productsData);
	res.sendFile(path.join(__dirname, "../views/getAllProducts.html"));
});

//get single product
router.get("/get-product", (req, res) => {
	const targetProduct = productsData.find((p) => p.id == req.params.id);
	res.json(targetProduct);
});

// create product
router.post("/create-product/", (req, res) => {
	const newProductData = req.body;
	productsData.push(newProductData);
	try {
		writeFileSync(
			path.join(__dirname, "../../products-data.json"),
			JSON.stringify(productsData)
		);
	} catch (error) {
		console.log(error);
	}
	res.send(newProductData);
});

//update product
router.put("/update-product/:id", (req, res) => {
	const reqData = req.body;
	const targetProduct = productsData.find((p) => p.id == req.params.id);
	for (const prop in reqData) {
		targetProduct[prop] = reqData[prop];
	}

	try {
		writeFileSync(
			path.join(__dirname, "../../products-data.json"),
			JSON.stringify(productsData)
		);
	} catch (error) {
		console.log(error);
	}
	res.send(targetProduct);
});

//delete product
router.delete("/remove-product/:id", (req, res) => {
	let newData = productsData.filter((p) => p.id != req.params.id);

	try {
		writeFileSync(
			path.join(__dirname, "../../products-data.json"),
			JSON.stringify(newData)
		);
	} catch (error) {
		console.log(error);
	}
	res.send("targetProduct");
});

module.exports = router;
