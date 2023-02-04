var express = require("express");
var app = express();
const cors = require('cors');
const pool = require("./db")
const bodyparser = require("body-parser");
const jobs = []



const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    next();
})


const credential = {
    username: "seeker",
    password: "seeker"
}
app.post('/', (req, res) => {
    if (req.body.username == credential.username && req.body.password == credential.password) {
        console.log(req.body.username);
        req.session.user = req.body.username;
        console.log(req.session);
        res.redirect('/job')
        res.end("Login Successful")
    } else {
        res.end("Invalid Login details.")
    }
});



app.post('/job', async (req, res) => {
    try {
        const company_name = req.body.data.company_name;
        const role = req.body.data.role;
        const location= req.body.data.location;
        const job = await pool.query("INSERT INTO jobs (company_name, role, location) VALUES ($1,$2,$3) RETURNING *", [company_name, role, location]);
        res.json(job) 
    } catch (err) {
        console.log(err.message);
    }
    res.json("data added")


})

app.delete('/job/:id', async (req, res) => {
    console.log("here");
    try {
        const deleteTodo = await pool.query("DELETE FROM jobs WHERE job_id=$1",
            [req.params.id]);

        res.json("Jobs was deleted")
    } catch (error) {
        console.log(err.message);

    }
})



app.get('/job', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM jobs ORDER BY jobs_id DESC")
        res.json(allTodos.rows)
    } catch (err) {
        console.log(err.message);

    }

})

// app.patch("/todo/:id", async (req, res) => {
//     try {
//         const task = req.body.task.task;
//         const updateTodo = await pool.query("UPDATE jobs SET task = $1 WHERE todo_id=$2 ", [task, req.params.id])
//         res.json("Todo was updated")
//     } catch (err) {
//         console.log(err.message);
//     }
// })


app.listen(4000, () => {
    console.log("Server is listening to http://localhost:4000");
})