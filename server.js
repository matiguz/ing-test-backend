var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser'),
    mongoose         = require('mongoose');

const routes = require('./routes/')

var app = express();
const router = express.Router();
//const url = process.env.MONGODB_URI || "mongodb://test_dev:test1234@ds247852.mlab.com:47852/test-ingeniuos";
const url = process.env.MONGODB_URI || "mongodb://localhost/mdb";

dotenv.load();

/** connect to MongoDB datastore */
try {
  mongoose.connect(url, {
     useNewUrlParser: true
  })    
} catch (error) {
  console.log(error);
}

/** set up routes {API Endpoints} */
routes(router)

// Parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

app.use(router);

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

