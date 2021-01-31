const mongoose = require('mongoose');
const TVShow = mongoose.model('TVShow');
/*
██████╗██████╗ ██╗   ██╗██████╗
██╔════╝██╔══██╗██║   ██║██╔══██╗
██║     ██████╔╝██║   ██║██║  ██║
██║     ██╔══██╗██║   ██║██║  ██║
╚██████╗██║  ██║╚██████╔╝██████╔╝
╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝
*/

// create -> POST
exports.create = function (req, res) {
    console.log('POST');
    console.log(req.body);

    let tvshow = new TVShow({
        title: req.body.title || '',
        year: req.body.year,
        country: req.body.country,
        poster: req.body.poster,
        seasons: req.body.seasons,
        genre: req.body.genre || 'Unknown',
        summary: req.body.summary || ''
    });

    tvshow.save(function (err, tvshow) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(tvshow);
    });
};
// read -> GET
exports.readAll = function (req, res) {
    TVShow.find(function (err, tvshows) {
        if (err) res.send(500, err.message);
        console.log('GET /tvshows')
        res.status(200).jsonp(tvshows);
    })
}

exports.read = function (req, res) {
    TVShow.findById(req.params.id, function (err, tvshow) {
        if (err) return res.send(500, err.message);
        console.log('GET /tvshow/' + req.params.id);
        res.status(200).jsonp(tvshow);
    })
}

// update -> PUT
exports.update = function (req, res) {
    console.log('PUT');
    console.log(req.body);
    TVShow.findById(req.params.id, function (err, tvshow) {
        tvshow.title = req.body.title || '',
            tvshow.year = req.body.year,
            tvshow.country = req.body.country,
            tvshow.poster = req.body.poster,
            tvshow.seasons = req.body.seasons,
            tvshow.genre = req.body.genre || 'Unknown',
            tvshow.summary = req.body.summary || ''

        tvshow.save(function (err, tvshow) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(tvshow);
        });
    });
};
// delete -> DELETE
exports.delete = function (req, res) {
    console.log('DELETE');
    TVShow.findById(req.params.id, function (err, tvshow) {
        tvshow.remove(function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
}