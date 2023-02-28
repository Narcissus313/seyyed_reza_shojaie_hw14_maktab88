let productsData;
const renderTable = (data) => {
	document.querySelector("tbody").innerHTML = "";
	productsData = data;
	let tableBody = data
		.map((p) => {
			return `
    <tr data-bs-toggle="modal" data-bs-target="#modalProductInfo" onclick="showProductInfo(${
		p.id
	})">
        <th scope="row">${data.indexOf(p) + 1}</th>
        <td class="border">${p.id}</td>
        <td class="border"">${p.title}</td>
        <td class="border"">${p.price}</td>
        <td class="border"">${p.rating}</td>
        <td class="border"">${p.stock}</td>
        <td class="border"">${p.brand}</td>
        <td class="border"">${p.category}</td>
    </tr>`;
		})
		.join("");
	document.querySelector("tbody").innerHTML = tableBody;
};

const getData = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	renderTable(data);
};
getData("http://localhost:5013/product/get-all-products");
