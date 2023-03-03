const modalUserInfoContent = document.querySelector(".modal-content");
let allUsers;

const showUserInfo = (username) => {
	const targetUser = allUsers.find((user) => user.username == username);
	modalUserInfoContent.innerHTML = `
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">${targetUser.firstname}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <p><span class="fw-bold ps-3">firstname: </span>${targetUser.firstname}</p>
    <p><span class="fw-bold ps-3">lastname: </span>${targetUser.lastname}</p>
    <p><span class="fw-bold ps-3">username: </span>${targetUser.username}</p>
    <p><span class="fw-bold ps-3">password: </span>${targetUser.password}</p>
    <p><span class="fw-bold ps-3">gender: </span>${targetUser.gender}</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteUser('${targetUser.username}')">Delete</button>
  </div>
  `;
};

const deleteUser = async (username) => {
	try {
		const response = await fetch(
			`http://localhost:5013/admin/remove-user/${username}`,
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
		showAlert(200,'User deleted');
	} catch (error) {
		console.log(error);
	}

	getData("http://localhost:5013/admin/get-all-users");
};
