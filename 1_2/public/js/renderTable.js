const renderTable = (data) => {
	let tableBody = data.map((p) => {
		return `
    <tr>
        <th scope="row">${data.indexOf(p) + 1}</th>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>${p.price}</td>
        <td>${p.rating}</td>
        <td>${p.stock}</td>
        <td>${p.brand}</td>
        <td>${p.category}</td>
    </tr>`;
	}).join('');
	document.querySelector("tbody").innerHTML = tableBody;
}
