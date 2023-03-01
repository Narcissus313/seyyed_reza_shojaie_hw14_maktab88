const goToModifyModal = (id) => {
	const modalProductInfoContent = document.querySelector(".modal-content");
	let product = productsData.find((p) => p.id == id);

	modalProductInfoContent.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${product.title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div class="input-group mb-3">
            <input type="number" class="form-control" placeholder="Id" aria-label="Username"
                aria-describedby="basic-addon1" id="id" value="${product.id}" disabled>
        </div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Title" aria-label="Username"
                aria-describedby="basic-addon1" id="title" value="${product.title}">
        </div>
        <div class="input-group mb-3">
            <input type="number" class="form-control" placeholder="Price" aria-label="Username"
                aria-describedby="basic-addon1" id="price" value="${product.price}">
        </div>
        <div class="input-group mb-3">
            <input type="number" class="form-control" placeholder="Rating" aria-label="Username"
                aria-describedby="basic-addon1" id="rating" value="${product.rating}">
        </div>
        <div class="input-group mb-3">
            <input type="number" class="form-control" placeholder="Stock" aria-label="Username"
                aria-describedby="basic-addon1" id="stock" value="${product.stock}">
        </div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Brand" aria-label="Username"
                aria-describedby="basic-addon1" id="brand" value="${product.brand}">
        </div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Category" aria-label="Username"
                aria-describedby="basic-addon1" id="category" value="${product.category}">
        </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateProductData()">Edit</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
  `;
};
