const router = require("express").Router();
const path = require("path");
const { writeFileSync } = require("fs");
const productsData = require("../../products-data.json");
const availableIds = productsData.map((p) => p.id);

//get all products
router.get("/get-all-products", (_req, res) => {
	res.json(productsData);
	res.sendFile(path.join(__dirname, "../views/getAllProducts.html"));
});

//get single product
router.get("/get-product/:id", (req, res) => {
	const requestedProductId = req.params.id;
	if (isNaN(requestedProductId)) return res.send("Id is not a number");

	if (!availableIds.includes(+requestedProductId))
		return res.send("no such a product in the list");

	const targetProduct = productsData.find((p) => p.id == requestedProductId);
	res.json(targetProduct);
});

// create product
router.post("/create-product/", (req, res) => {
	const newProductData = req.body;

	if (!newProductData.id) return res.send("No id in the requested product");
	if (isNaN(newProductData.id)) return res.send("Invalid id (not a number)");
	if (availableIds.includes(newProductData.id))
		return res.send("This user exists");

	const data = {
		id: null,
		title: null,
		price: null,
		rating: null,
		stock: null,
		brand: null,
		category: null,
		...newProductData,
	};
	productsData.push(data);
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
	const reqId = req.params.id;
	if (isNaN(reqId)) return res.send("Invalid id (not a number)");
	if (!availableIds.includes(+reqId))
		return res.send("This user doesn't exists");
	if (reqData.id) delete reqData.id;

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
	const reqId = req.params.id;
	if (isNaN(reqId)) return res.send("Invalid id (not a number)");
	if (!availableIds.includes(+reqId))
		return res.send("This user doesn't exists");
	let newData = productsData.filter((p) => p.id != reqId);

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
