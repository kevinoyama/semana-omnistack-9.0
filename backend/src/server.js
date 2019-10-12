const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-23prj.mongodb.net/main?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//GET, POST, PUT and DELETE
//req.query = access query params (for filters)
//req.params = access route params (for editing, delete)
//req.body = access request body

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);

