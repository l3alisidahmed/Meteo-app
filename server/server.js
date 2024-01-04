require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URI;
const User = require('./models/UserSchema');

app.use(express.json());
app.use(express.urlencoded({extended: false}))

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    })
    .catch((err) => console.log(err.message));

// fuctions he take id as a prams and return user object
const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
}

// get all users
app.get('/',async (req, res) => {
  const data = await User.find();
  res.status(200).send(data);
});

// get user by id
app.get('/getUser/:id', async (req, res) => {
    const id = req.params.id;
    const user = await getUserById(id);
    res.status(200).send(user);
});

// get user by username or email and password
app.get('/getUser', async (req, res) => {
    const { username, email, password } = req.body;
    const Users = await User.find();

    Users.forEach((user) => {
        const compare = bcrypt.compareSync(password, user.password);
        if ((user.username === username || user.email === email) && compare) {
            res.status(200).send(user);
            return res.redirect('../client/src/views/index.html');
        }
    });
    
});


// add new user to database 
app.post('/addUser', (req, res) => {
    const { username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashPassword
    });
    newUser.save()
        .then((result) => {
            res.send(result);
            return res.redirect("../client/src/views/login.html");
        })
        .catch((err) => console.log(err.message));
});

// update user by id 
app.put('/updateUser/:id', async (req, res) => {
    const { username, email, password } = req.body;
    const id = req.params.id;
    const User = await getUserById(id);
    User.username = username;
    User.email = email;
    User.password = password;
    User.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err.message));
});

// delete user by id
app.delete('/deleteUser/:id', async (req, res) => {
    const id = req.params.id;
    const user = await getUserById(id);
    User.deleteOne(user)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err.message));
});