const renderTable = (data) => {
	document.querySelector("tbody").innerHTML = "";
	allUsers = data;
	let tableBody = data
		.map((user) => {
			return `
    <tr data-bs-toggle="modal" data-bs-target="#modalUserInfo" onclick="showUserInfo('${
		user.username
	}')">
        <th scope="row">${data.indexOf(user) + 1}</th>
        <td class="border">${user.firstname}</td>
        <td class="border"">${user.lastname}</td>
        <td class="border"">${user.username}</td>
        <td class="border"">${user.password}</td>
        <td class="border"">${user.gender}</td>
    </tr>`;
		})
		.join("");
	document.querySelector("tbody").innerHTML = tableBody;
};

const getData = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	// console.log("data from server: ", data);
	// prepareModal(data);
	renderTable(data);
};
getData("http://localhost:5013/admin/get-all-users");
