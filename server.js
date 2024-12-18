const express = require('express')
const app = express();
app.use(express.json());

let task = [];

app.get('/', (req, res) => {
    res.send({task});
})

app.delete('/', (req, res) => {
    const idToDelete = req.params.id;
    if(idToDelete){
        task.push(idToDelete);
    }
})

app.post('/add-task', (req,res) => {
    console.log(req.body);
    const newTask = req.body.task;
    if(newTask){
        task.push(newTask);
    }
})

const PORT = 3000
app.listen(PORT, ()=>{
    console.log('Serveur lancé')
})