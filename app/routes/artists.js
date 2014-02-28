'use strict';
//var Artist = require('../models/album');
//var moment = require('moment');

exports.index = function(req, res){
  //Artist.findAll(function(artists){
  res.render('nashifyMe/index', {title: 'Artists'});
  //});
};
