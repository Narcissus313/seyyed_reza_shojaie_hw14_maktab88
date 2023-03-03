const btnLogin = document.getElementById("btnLogin");

const login = async (event) => {
	const username = document.getElementById("username").value.trim();
	const password = document.getElementById("password").value.trim();
	const loginData = { username, password };

	if (!username.length)
		return showAlert("400", "Username field should not be blanked");
	if (!password.length)
		return showAlert("400", "password field should not be blanked");

	event.preventDefault();

	try {
		const response = await fetch("http://localhost:5013/auth/login", {
			method: "POST",
			body: JSON.stringify(loginData),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.text();
		const statusCode = response.status;
		showAlert(statusCode, data);
	} catch (error) {
		console.log("error: ", error);
	}
};

btnLogin.addEventListener("click", login);
