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
            choices: ["View All Employees", "Add New Employee", "View All Roles", "Add New Role","View All Departments", "Add New Department", "Update Employee Role"]
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
        if(res.action === "Add New Role") {
            addNewRole()
        }
        if(res.action === "View All Departments") {
            viewAllDepartments()
        }
        if(res.action === "Add New Department") {
            addNewDepartment()
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

const addNewRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is this roles title?",
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is this roles salary?",
        },
        {
            type: "input",
            name: "departmentId",
            message: "What is this roles department ID?",
        }
    ]).then((res) => {
        db.query(`INSERT INTO role SET ?`, {
            title: res.roleTitle,
            salary: res.roleSalary,
            department_id: res.departmentId
        })
        mainMenu()
    })
}

const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, (err, res) => {
        if(err) throw err;
        console.table(res);
        mainMenu()
    })
}

const addNewDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentTitle",
            message: "What is this departments title?",
        },
    ]).then((res) => {
        db.query(`INSERT INTO department SET ?`, {
            department_name: res.departmentTitle,
        })
        mainMenu()
    })
}