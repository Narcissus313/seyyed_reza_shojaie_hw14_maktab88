const liveAlertBtn = document.getElementById("liveAlertBtn");
const submitForm = document.getElementById("submitForm");

const submit = async (event) => {
	const firstname = document.getElementById("firstName").value.trim() || null;
	const lastname = document.getElementById("lastName").value.trim() || null;
	const username = document.getElementById("username").value.trim();
	const password = document.getElementById("password").value.trim();
	const gender =
		document.getElementById("selectMenu").value == 1
			? "male"
			: document.getElementById("selectMenu").value == 2
			? "female"
			: "undefined";
	const userData = { firstname, lastname, username, password, gender };
	event.preventDefault();

	if (!username.length || !password.length)
		return showAlert("400", "empty username or password");

	try {
		const response = await fetch("http://localhost:5013/auth/signup", {
			method: "POST",
			body: JSON.stringify(userData),
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

submitForm.addEventListener("submit", submit);
