const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body parser middleware, so as to be able access the json body for requests
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport Config
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`));

//status codes
// 200- success
// 400- validation error
// 404- not found
// 500- server error
// 304, 301 -redirect