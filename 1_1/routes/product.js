const router = require("express").Router();
const path = require("path");
const {readFileSync, writeFileSync} = require("fs");
const productsData = require("../../products-data.json");

//get all products
router.get("/get-all-products", (_req, res) => {
	res.json(productsData);
	res.sendFile(path.join(__dirname, "../views/getAllProducts.html"));
});

//get single product
router.get("/get-product", (req, res) => {
	// const targetProduct = productsData.find((p) => p.id == req.query.id);
	const targetProduct = productsData.find((p) => p.id == req.params.id);
	res.json(targetProduct);
});

//update product
router.put("/update-product/:id", (req, res) => {
	const reqData = req.body;
    // console.log('reqData: ',typeof reqData);
	const targetProduct = productsData.find((p) => p.id == req.params.id);
    // console.log('targetProduct: ', targetProduct);
	for (const prop in reqData) {
        targetProduct[prop] = reqData[prop];
    }
    console.log('productsData: ', productsData);
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

module.exports = router;
