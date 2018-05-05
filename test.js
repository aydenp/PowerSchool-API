const PowerSchoolAPI = require("./index");
const readline = require("readline-sync");

// Get information from the user.
const url = readline.question("Enter the PowerSchool installation URL (such as: http://sales.powerschool.com): ");
const username = readline.question("Enter your PowerSchool username: ");
const password = readline.question("Enter your PowerSchool password: ");
if(!url || !username || !password) return console.error("Invalid information entered.");

// Create a new PowerSchool wrapper with our installation URL.
var api = new PowerSchoolAPI(url);

// Setup the API to retrieve information about the installation.
api.setup().then((api) => {
    // Login to the user account with the provided credentials.
    api.login(username, password).then((user) => {
        // If user is null, invalid credentials were provided.
        if(!user) return console.error("Invalid credentials provided.");
        // Otherwise, let's get the student's information.
        user.getStudentInfo().then((info) => {
            // Log the user's courses to console.
            console.log(`You're enrolled in ${info.courses.length} course${info.courses.length == 1 ? "" : "s"}${info.courses.length > 0 ? ":" : "."}`);
            console.log(info.courses.map((course) => `- ${course.title}`).join("\n"));
        }).catch((err) => console.error("Couldn't get more user info:", err))
    }).catch((err) => console.error("Couldn't login PowerSchool user:", err));
}).catch((err) => console.error("Couldn't load PowerSchool API:", err));
