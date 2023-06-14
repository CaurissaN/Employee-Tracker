import  inquirer from "inquirer";
import { createConnection } from 'mysql2';

const db = createConnection({
    host: "localhost",
    user: "root",
    password: "onethreefive",
    database: "employee_db"
});

db.connect((err) => {
    if (err) throw err;
    mainMenu()
})

const mainMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add New Employee", "View All Roles", "Add New Roles","View All Departments", "Add New Departments", "Update Employee Role"]
        }
    ]).then((res) => {
        if(res.action === "View All Employees") {
            viewAllEmployees()
        }
        if(res.action === "Add New Employee") {
            addNewEmployee()
        }
        if(res.action === "View All Roles") {
            viewAllRoles()
        }
    })
}

const viewAllEmployees = () => {
    db.query(`SELECT * FROM employee`, (err, res) => {
        if(err) throw err;
        console.table(res);
        mainMenu()
    })
}

const addNewEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is this employees first name?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is this employees last name?",
        },
        {
            type: "input",
            name: "roleId",
            message: "What is this employees role ID?",
        },
        {
            type: "input",
            name: "managerId",
            message: "What is this employees manager ID?",
        }
    ]).then((res) => {
        db.query(`INSERT INTO employee SET ?`, {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.roleId,
            manager_id: res.managerId
        })
        mainMenu()
    })
}

const viewAllRoles = () => {
    db.query(`SELECT * FROM role`, (err, res) => {
        if(err) throw err;
        console.table(res);
        mainMenu()
    })
}