const showAlert = (statusCode, text) => {
	let alert = document.getElementById("alertBox");
    let alertText = document.getElementById("alertText");
    let status = "success";
    
    alert.classList.remove("alert-success");
    alert.classList.remove("alert-danger");
	if (statusCode !== 200) status = "danger";
	alert.classList.add("alert-" + status);
	alertText.innerHTML = text;

	alert.classList.remove("d-none");
	setTimeout(() => {
		alert.classList.add("d-none");
	}, 1500);
};
