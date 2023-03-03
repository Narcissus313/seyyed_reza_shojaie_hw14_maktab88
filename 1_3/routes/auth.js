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

router.get("/signup", (_req, res) =>
	res.sendFile(path.join(__dirname, "../views/signup-page.html"))
);

router.post("/signup", (req, res) => {
	let usersData = readUsersData();
	let sentData = req.body;
	let newUser = {
		firstname: null,
		lastname: null,
		username: null,
		password: null,
		gender: 'male',
		...sentData,
	};

	if (!!usersData.find((user) => user.username == newUser.username))
		return res.status(409).send(`user exists`);
	usersData.push(newUser);
	writeDataToFile(usersData);
	res.send(`data added`);
});

router.get("/login", (_req, res) =>
	res.sendFile(path.join(__dirname, "../views/login-page.html"))
);
router.post("/login", (req, res) => {
	const loginData = req.body;
	const users = readUsersData();
	const requestedUser = users.find(
		(user) => user.username === loginData.username
	);
	if (!requestedUser) return res.status(401).send("Not such a username");
	if (requestedUser.password != loginData.password)
		return res.status(401).send("wrong password");
	res.send("Login Done");
});

module.exports = router;
