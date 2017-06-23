var mongoose = require("mongoose");
var Addition = require('../models/movieschema.js');
var request = require('request');

//passes to search routes in the router folder
var movielist = {
  search: function(req, res) {
    var moviename = req.params.index;
    //requests the movie name from api
    request.get('https://api.themoviedb.org/3/search/movie?api_key=a8654b92df1d2ce3b89bb66a01da07ff&language=en-US&query=' + moviename + '&page=1&include_adult=false', function(err, response, body) {
      if (!err && response.statusCode == 200) {
        res.json(JSON.parse(response.body));
      } else {
        res.send('error occured');
      }
    });
  },
  //passes to add routes in the router folder
  add: function(req, res) {
    //adds the data in database
    console.log(req.body.title);
    var add1 = {
      Title: req.body.title,
      Poster: req.body.poster,
      Release_Date: req.body.release_date
    }
    var db1 = new Addition(add1);

    //saves only the new data in database
    db1.save(function(err, db) {
      if (err) {
        res.send(err);
      } else {
        res.send("Success");
      }
    });
  },

  //calls view routes in the router folder
  view: function(req, res) {
    //query used to find all the data in database
    Addition.find(function(err, data) {
      if (err)
        throw err;
      else {
        res.send(data);
      }
    });
  },

  //calls delete routes in the router folder
  delete: function(req, res) {
    var tit = req.query.Title;
    //query to delete the data based on title
    Addition.remove({
      Title: tit
    }, function(err, data) {
      if (err)
        throw err;
      else {
        res.send("success");
      }

    });
  },

  logout: function(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        console.log("Error");
      } else {
        res.send("success");
      }
    });
  }

};

module.exports = movielist;
