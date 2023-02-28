const modalProductInfoContent = document.querySelector(".modal-content");
const resetNewProductModalBody = () => {
	document.getElementById("creatNewProductModalBody").innerHTML = `
		<div class="input-group mb-3">
			<input type="number" class="form-control" placeholder="Id" aria-label="Username"
				aria-describedby="basic-addon1" id="newProductId">
		</div>
		<div class="input-group mb-3">
			<input type="text" class="form-control" placeholder="Title" aria-label="Username"
				aria-describedby="basic-addon1" id="newProductTitle">
		</div>
		<div class="input-group mb-3">
			<input type="number" class="form-control" placeholder="Price" aria-label="Username"
				aria-describedby="basic-addon1" id="newProductPrice">
		</div>
		<div class="input-group mb-3">
			<input type="number" class="form-control" placeholder="Rating" aria-label="Username"
				aria-describedby="basic-addon1" id="newProductRating">
		</div>
		<div class="input-group mb-3">
			<input type="number" class="form-control" placeholder="Stock" aria-label="Username"
				aria-describedby="basic-addon1" id="newProductStock">
		</div>
		<div class="input-group mb-3">
			<input type="text" class="form-control" placeholder="Brand" aria-label="Username"
				aria-describedby="basic-addon1" id="newProductBrand">
		</div>
		<div class="input-group mb-3">
			<input type="text" class="form-control" placeholder="Category" aria-label="Username"
				aria-describedby="basic-addon1" id="newProductCategory">
		</div>
	`;
};

const showProductInfo = (id) => {
	const targetProduct = productsData.find((product) => product.id == id);
	modalProductInfoContent.innerHTML = `
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">${targetProduct.title}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <p><span class="fw-bold ps-3">Id: </span>${targetProduct.id}</p>
    <p><span class="fw-bold ps-3">Title: </span>${targetProduct.title}</p>
    <p><span class="fw-bold ps-3">Price: </span>${targetProduct.price}</p>
    <p><span class="fw-bold ps-3">Rating: </span>${targetProduct.rating}</p>
    <p><span class="fw-bold ps-3">Stock: </span>${targetProduct.stock}</p>
    <p><span class="fw-bold ps-3">Brand: </span>${targetProduct.brand}</p>
    <p><span class="fw-bold ps-3">Category: </span>${targetProduct.category}</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary" onclick="goToModifyModal(${targetProduct.id})">Modify</button>
  </div>
  `;
};

const createNewProduct = async () => {
	const id = +document.getElementById("newProductId").value;
	const title = document.getElementById("newProductTitle").value;
	const price = +document.getElementById("newProductPrice").value;
	const rating = +document.getElementById("newProductRating").value;
	const stock = +document.getElementById("newProductStock").value;
	const brand = document.getElementById("newProductBrand").value;
	const category = document.getElementById("newProductCategory").value;

	const newProduct = {
		id,
		title,
		price,
		rating,
		stock,
		brand,
		category,
	};

	try {
		const response = await fetch(
			"http://localhost:5013/product/create-product",
			{
				method: "POST",
				body: JSON.stringify(newProduct),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const statusCode = response.status;
		let alertResult = await response.text();
		if (statusCode !== 200)
			alertResult = "error " + statusCode + " : " + alertResult;
		alert(alertResult);
	} catch (error) {
		alert(data);
	}

	getData("http://localhost:5013/product/get-all-products");
};

const updateProductData = async () => {
	const id = +document.getElementById("id").value;
	const title = document.getElementById("title").value;
	const price = document.getElementById("price").value;
	const rating = document.getElementById("rating").value;
	const stock = document.getElementById("stock").value;
	const brand = document.getElementById("brand").value;
	const category = document.getElementById("category").value;
	const productToUpdateInfo = {
		id,
		title,
		price,
		rating,
		stock,
		brand,
		category,
	};
	// console.log('productToUpdateInfo: ', productToUpdateInfo);
	try {
		const response = await fetch(
			`http://localhost:5013/product/update-product/${+id}`,
			{
				method: "PUT",
				body: JSON.stringify(productToUpdateInfo),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const statusCode = response.status;
		let alertResult = await response.text();
		if (statusCode !== 200)
			alertResult = "error " + statusCode + " : " + alertResult;
		alert(alertResult);
	} catch (error) {
		console.log(error)
	}

	getData("http://localhost:5013/product/get-all-products");
};
const deleteProduct = async (id) => {
	try {
		const response = await fetch(
			`http://localhost:5013/product/remove-product/${+id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const statusCode = response.status;
		let alertResult = await response.text();
		if (statusCode !== 200)
			alertResult = "error " + statusCode + " : " + alertResult;
		alert(alertResult);
	} catch (error) {
		console.log(error)
	}

	getData("http://localhost:5013/product/get-all-products");
};
