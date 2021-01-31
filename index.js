let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let methodOverride = require('method-override')
let mongoose = require('mongoose')

/*

███╗   ███╗██╗██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗███████╗
████╗ ████║██║██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝██╔════╝
██╔████╔██║██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗  ███████╗
██║╚██╔╝██║██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝  ╚════██║
██║ ╚═╝ ██║██║██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗███████║
╚═╝     ╚═╝╚═╝╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝
*/

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(methodOverride());

let tvshowModel = require('./model/tvshow')(app, mongoose)
let tvshowControl = require('./control/tvshow')

/*

 █████╗ ██████╗ ██████╗
██╔══██╗██╔══██╗██╔══██╗
███████║██████╔╝██████╔╝
██╔══██║██╔═══╝ ██╔═══╝
██║  ██║██║     ██║
╚═╝  ╚═╝╚═╝     ╚═╝
*/
let router = express.Router();

router.get('/', function (req, res) {
    res.send({ saludo: 'Hello!!!' })
})

app.use(router);

/*

 █████╗ ██████╗ ██╗
██╔══██╗██╔══██╗██║
███████║██████╔╝██║
██╔══██║██╔═══╝ ██║
██║  ██║██║     ██║
╚═╝  ╚═╝╚═╝     ╚═╝
*/
////////////////////////////////////////////////////////
/*
████████╗██╗   ██╗███████╗██╗  ██╗ ██████╗ ██╗    ██╗
╚══██╔══╝██║   ██║██╔════╝██║  ██║██╔═══██╗██║    ██║
   ██║   ██║   ██║███████╗███████║██║   ██║██║ █╗ ██║
   ██║   ╚██╗ ██╔╝╚════██║██╔══██║██║   ██║██║███╗██║
   ██║    ╚████╔╝ ███████║██║  ██║╚██████╔╝╚███╔███╔╝
   ╚═╝     ╚═══╝  ╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝

*/
let tvshows = express.Router();

tvshows.route('/tvshows')
    .get(tvshowControl.readAll)
    .post(tvshowControl.create)

tvshows.route('/tvshows/:id')
    .get(tvshowControl.read)
    .put(tvshowControl.update)
    .delete(tvshowControl.delete)

app.use('/api', tvshows)

/*

███████╗███╗   ██╗██████╗
██╔════╝████╗  ██║██╔══██╗
█████╗  ██╔██╗ ██║██║  ██║
██╔══╝  ██║╚██╗██║██║  ██║
███████╗██║ ╚████║██████╔╝
╚══════╝╚═╝  ╚═══╝╚═════╝

*/
mongoose.Promise = global.Promise;
mongoose
    .connect('mongodb://localhost/tvshows', { useNewUrlParser: true })
    .then(function (db) {
        app.listen(3000, function () {
            console.log("Node server running on http://localhost:3000");
        });
    })