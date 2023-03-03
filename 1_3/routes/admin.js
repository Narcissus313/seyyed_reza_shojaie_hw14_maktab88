const router = require("express").Router();
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");

const readUsersData = () => {
	return JSON.parse(
		readFileSync(path.join(__dirname, "../../users-data.json")).toString()
	);
};
const writeDataToFile = (data) => {
	writeFileSync(
		path.join(__dirname, "../../users-data.json"),
		JSON.stringify(data)
	);
};

router.get("/get-all-users", (_req, res) => {
	res.send(JSON.stringify(readUsersData()));
});

router.get("/get-user/:username", (req, res) => {
	const username = req.params.username;
	const users = readUsersData();
	const user = users.find((user) => user.username == username);
	res.send(JSON.stringify(user));
});

router.delete("/remove-user/:username", (req, res) => {
	const username = req.params.username;
	console.log("username: ", username);
	const users = readUsersData();
	const usersAfterDeleteCommand = users.filter(
		(user) => user.username != username
	);
	console.log("usersAfterDeleteCommand: ", usersAfterDeleteCommand);
	writeDataToFile(usersAfterDeleteCommand);
	res.send("user deleted");
});

router.get("/panel", (_req, res) => {
	res.sendFile(path.join(__dirname, "../views/admin-panel.html"));
});

module.exports = router;
