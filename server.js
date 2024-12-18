const express = require('express')
const app = express();
app.use(express.json());

let tasks = [];

app.get('/', (req, res) => {
    res.status(200).send({tasks});
})

app.delete('/', (req, res) => {
    const idToDelete = parseInt(req.query.id, 10); // Ensure the ID is a number
    const taskIndex = tasks.findIndex(task => task.id === idToDelete);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    } else {
        return res.status(400).send("ID incorrect");
    }

    res.status(200).json({ tasks });
});

app.post('/add-task', (req,res) => {
    console.log(req.body);
    const newTask = req.body.task;
    if(newTask){
        tasks.push(newTask);
    }
    res.status(200).json({tasks});
})

module.exports = app;

const PORT = 3000
app.listen(PORT, ()=>{
    console.log('Serveur lancé')
})