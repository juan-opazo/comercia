const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');
require('./models/User');
require('./models/Comment');
require('./models/Product');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors());

app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/commentRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('listening...'));