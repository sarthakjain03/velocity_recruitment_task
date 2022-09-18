const {application} = require('express');
const express = require('express');
const axios = require('axios');

const app = express(); //this is to make app an object of express
app.use(express.json()); //this is to make use of the express.json file

const serverMsg=(req,res) => {
    res.send("Server is up and running"); //sends the message to the server.
}

app.get('/', serverMsg); //gets the commands to be executed when starting the server.

app.post('/results', async(req,res)=>{
    const url = "https://velo-recruitment-task-default-rtdb.firebaseio.com/Results.json"
    //here, url = location to which data has to be posted.
    const name1 = req.body.name;
    const reg1 = req.body.reg;
    const dbms1 = req.body.dbms;
    const os1 = req.body.os;
    const dsa1 = req.body.dsa;
    const data = {name:name1, reg:reg1, dbms:dbms1, os:os1, dsa:dsa1}; //grouping the data of a single student.

    try {
        const response = await axios.post(url, data);
        res.status(response.status).send(response.data);

    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
})

app.get('/results', async(req,res)=>{
    const url = "https://velo-recruitment-task-default-rtdb.firebaseio.com/Results.json"
    //here, url = location of the data we want to get.
    try {
        const response = await axios.get(url);
        console.log(response.data) //this prints the data in the terminal
        res.status(response.status).send(response.data);
        
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
    
})

app.listen(5000, console.log('Server running on 5000')); //message displayed in the terminal after successfull launch of server.
//use npm start to launch the server.