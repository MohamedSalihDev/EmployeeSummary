const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const addedEmployees = [];
const idArray = [];

function renderTeam() {
    const EmployeeRender = render(addedEmployees);
    fs.writeFile("./output/team.html", EmployeeRender, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success!");

    });

}


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function start() {

    inquirer
        .prompt([

            {
                type: "list",
                name: "positionTitle",
                message: "Please select the title of your position, or, if done, select done.",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "done"
                ]
            }

        ]).then(selection => {

            switch (selection.positionTitle) {

                case "Manager":
                    addManager();
                    break;

                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                case "No more employees":

                    break;


            }
        })


    function addManager() {

        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your manager's name?",
                    name: "managerName",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "Please enter at least one character.";
                    }
                },

                {
                    type: "input",
                    message: "What is your manager's employee ID?",
                    name: "managerID",
                    validate: answer => {
                        const pass = answer.match(
                            /^[1-9]\d*$/
                        );
                        if (pass) {
                            return true;
                        }
                        return "Please enter a positive number greater than zero.";
                    }

                },

                {
                    type: "input",
                    message: "What is your manager's email?",
                    name: "managerEmail",
                    validate: answer => {
                        const pass = answer.match(
                            /\S+@\S+\.\S+/
                        );
                        if (pass) {
                            return true;
                        }
                        return "Please enter a valid email address.";
                    }
                },

                {
                    type: "input",
                    message: "What is your office number?",
                    name: "officeNumber",
                    validate: answer => {
                        const pass = answer.match(
                            /^[1-9]\d*$/
                        );
                        if (pass) {
                            return true;
                        }
                        return "Please enter a positive number greater than zero.";
                    }
                }

            ]).then(data => {


                const manager = new Manager(data.managerName, data.managerID, data.managerEmail, data.officeNumber)

                addedEmployees.push(manager)
                idArray.push(data.managerId)
                renderTeam();

                start();

            })


    }


    function addEngineer() {
        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your Engineer's name?",
                    name: "engineerName",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "Please enter at least one character.";
                    }
                },

                {
                    type: "input",
                    message: "What is your Engineer ID?",
                    name: "engineerID",
                    validate: answer => {
                        const pass = answer.match(
                            /^[1-9]\d*$/
                        );
                        if (pass) {
                            if (idArray.includes(answer)) {
                                return "This ID is already taken. Please enter a different number.";
                            } else {
                                return true;
                            }

                        }
                        return "Please enter a positive number greater than zero.";
                    }
                },

                {
                    type: "input",
                    message: "What is your email?",
                    name: "engineerEmail",
                    validate: answer => {
                        const pass = answer.match(
                            /\S+@\S+\.\S+/
                        );
                        if (pass) {
                            return true;
                        }
                        return "Please enter a valid email address.";
                    }
                },

                {
                    type: "input",
                    message: "What is your GitHub username?",
                    name: "gitHubUsername",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "Please enter at least one character.";
                    }
                }
            ]).then(data => {


                const engineer = new Engineer(data.engineerName, data.engineerID, data.engineerEmail, data.gitHubUsername)
                idArray.push(data.engineerId);
                addedEmployees.push(engineer)
                renderTeam();

                start();

            })
    }




    function addIntern() {

        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your Intern's name?",
                    name: "internName",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "Please enter at least one character.";
                    }
                },

                {
                    type: "input",
                    message: "What is your Intern's ID?",
                    name: "internID",
                    validate: answer => {
                        const pass = answer.match(
                            /^[1-9]\d*$/
                        );
                        if (pass) {
                            if (idArray.includes(answer)) {
                                return "This ID is already taken. Please enter a different number.";
                            } else {
                                return true;
                            }

                        }
                        return "Please enter a positive number greater than zero.";
                    }
                },

                {
                    type: "input",
                    message: "What is your Intern's email?",
                    name: "internEmail",
                    validate: answer => {
                        const pass = answer.match(
                            /\S+@\S+\.\S+/
                        );
                        if (pass) {
                            return true;
                        }
                        return "Please enter a valid email address.";
                    }
                },

                {
                    type: "input",
                    message: "What is your Intern's school?",
                    name: "internSchool",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }
                        return "Please enter at least one character.";
                    }
                }
            ]).then(data => {


                const intern = new Intern(data.internName, data.internID, data.internEmail, data.internSchool)
                idArray.push(data.internId);
                addedEmployees.push(intern)
                renderTeam();

                start();
            })
    }
}

module.exports = addedEmployees;

start();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
