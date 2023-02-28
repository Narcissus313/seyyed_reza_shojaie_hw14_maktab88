const router = require("express").Router();
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const readProductsData = () => {
	return JSON.parse(
		(productsData = readFileSync(
			path.join(__dirname, "../../products-data.json")
		).toString())
	);
};
const writeDataToFile = (data) => {
	writeFileSync(
		path.join(__dirname, "../../products-data.json"),
		JSON.stringify(data)
	);
};
const vaildIds = () => {
	const productsData = readProductsData();
	return productsData.map((p) => p.id);
};

//get all products
router.get("/get-all-products", (_req, res) => {
	const productsData = readProductsData();
	res.json(productsData);
});

//get single product
router.get("/get-product/:id", (req, res) => {
	const requestedProductId = req.params.id;
	const productsData = readProductsData();
	const availableIds = vaildIds();

	if (isNaN(requestedProductId)) return res.send("Id is not a number");
	if (!availableIds.includes(+requestedProductId))
		return res.send("no such a product in the list");

	const targetProduct = productsData.find((p) => p.id == requestedProductId);
	res.json(targetProduct);
});

// create product
router.post("/create-product", (req, res) => {
	const newProductData = req.body;
	const productsData = readProductsData();
	const availableIds = vaildIds();

	if (!newProductData.id) return res.send("No id in the requested product");
	if (isNaN(newProductData.id)) return res.send("Invalid id (not a number)");
	if (availableIds.includes(newProductData.id))
		return res.status(409).send("This user exists");

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
		writeDataToFile(productsData);
	} catch (error) {
		console.log(error);
	}
	res.send("Data created");
});

//update product
router.put("/update-product/:id", (req, res) => {
	const reqData = req.body;
	const reqId = req.params.id;
	const productsData = readProductsData();
	const targetProduct = productsData.find((p) => p.id == reqId);

	for (const prop in reqData) {
		targetProduct[prop] = reqData[prop];
	}

	try {
		writeDataToFile(productsData);
	} catch (error) {
		console.log(error);
	}
	res.send("Data Updated");
});

//delete product
router.delete("/remove-product/:id", (req, res) => {
	const reqId = req.params.id;
	const productsData = readProductsData();
	const availableIds = vaildIds();

	if (isNaN(reqId)) return res.send("Invalid id (not a number)");
	if (!availableIds.includes(+reqId))
		return res.send("This user doesn't exists");
	let newData = productsData.filter((p) => p.id != +reqId);

	try {
		writeDataToFile(newData);
	} catch (error) {
		console.log(error);
	}
	res.send("Data Deleted");
});

module.exports = router;
