const getData = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
    renderTable(data)
};
getData("http://localhost:5000/product/get-all-products");
