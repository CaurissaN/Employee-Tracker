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
    })
}

const viewAllEmployees = () => {
    db.query(`SELECT * FROM employee`, (err, res) => {
        if(err) throw err;
        console.table(res);
        mainMenu()
    })
}