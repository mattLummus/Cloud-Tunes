//model
'use strict';
module.exports = Song;
var songs = global.nss.db.collection('songs');
var mongo = require('mongodb');

function Song(object){
  this._id = object._id;
  this.name = object.name;
  this.artist = object.artist;
  this.album = object.album;
  //this.file = object.file;
  //this.length = object.length;
}

Song.prototype.insert = function(fn){
  songs.insert(this, function(err, record){
    fn(err);
  });
};

Song.findById = function(id, fn){
  var _id = mongo.ObjectID(id);
  songs.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};

Song.findAll = function(fn){
  songs.find().toArray(function(err, records){
    fn(records);
  });
};

Song.findByName = function(name, fn){
  songs.findOne({name:name}, function(err, record){
    fn(record);
  });
};
