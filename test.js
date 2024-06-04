const PowerSchoolAPI = require("./index");

// Get information from the user.
const url = "Powerschool installation URL";
const username = "Username";
const password = "Password";

// Create a new PowerSchool wrapper with our installation URL.
var api = new PowerSchoolAPI(url);

// Setup the API to retrieve information about the installation.
api.setup().then((api) => {
    // Login to the user account with the provided credentials.
    api.login(username, password).then((user) => {
        // If user is null, invalid credentials were provided.
        if(!user) return console.error("Invalid credentials provided.");
        // Otherwise, let's get the student's information.
        user.getStudentsInfo().then((students) => {
            students.forEach((info) => {
                console.log(`Hey, ${info.student.getFormattedName()}!`);
                // Log the user's courses to console.
                console.log(`You're enrolled in ${info.courses.length} course${info.courses.length == 1 ? "" : "s"}${info.courses.length > 0 ? ":" : "."}`);
                console.log(info.courses.sort((a, b) => a.expression.localeCompare(b.expression)).map((course) => `- ${course.title} (${course.getTeacher().getFormattedName()}) -- ${course.expression}`).join("\n"));
            })
        }).catch((err) => console.error("Couldn't get more user info:", err))
    }).catch((err) => console.error("Couldn't login PowerSchool user:", err));
}).catch((err) => console.error("Couldn't load PowerSchool API:", err));