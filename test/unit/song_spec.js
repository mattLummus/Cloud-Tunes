//unit test - song
/*jshint expr: true*/
'use strict';

process.env.DBNAME= 'music-test';
var expect = require('chai').expect;
var exec = require('child_process').exec;
var fs = require('fs');
var Song;


describe('Song', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Song = require('../../app/models/song');
      done();
    });
  });

  beforeEach(function(done){
    var testdir = __dirname + '/../../app/static/img/test*';
    var cmd = 'rm -rf ' + testdir;

    exec(cmd, function(){
      var origfile = __dirname + '/../fixtures/tempPhoto.jpg';
      var copyfile = __dirname + '/../fixtures/tempPhoto-copy.jpg';
      fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
      global.nss.db.dropDatabase(function(err,result){
        done();
      });
    });
  });

/* Constructor  */

  describe('new', function(){
    it('should create a new song object', function(){
      var obj = {};
      obj.name = 'Purple Rain';
      obj.artist = 'Prince';
      obj.album = 'Purple Rain';
      var song = new Song(obj);
      expect(song).to.be.instanceof(Song);
    });
  });

/* Instance  */

  describe('#insert', function(){
    it('should insert a Song object into the DB', function(done){
      var obj = {};
      obj.name = 'Purple Rain';
      obj.artist = 'Prince';
      obj.album = 'Purple Rain';
      var song = new Song(obj);
      //var oldname = __dirname + '/../fixtures/tempPhoto-copy.jpg';
      //album.addPhoto(oldname);

      song.insert(function(err){
        expect(err).to.be.null;
        expect(song).to.be.instanceof(Song);
        expect(song).to.have.property('_id').and.be.ok;
        expect(song._id.toString()).to.have.length(24);
        done();
      });
    });
  });

/* Find */

  describe('.findById', function(){
    it('should find an Song by its ID', function(done){
      var obj = {};
      obj.name = 'Purple Rain';
      obj.artist = 'Prince';
      obj.album = 'Purple Rain';
      var song = new Song(obj);

      song.insert(function(err){
        var id = song._id.toString();
        console.log(id);
        Song.findById(id, function(song){
          expect(song.name).to.equal('Purple Rain');
          done();
        });
      });
    });
  });

  describe('.findAll', function(){
    it('should find all the Songs in the database', function(done){
      var obj = {};
      obj.name = 'Purple Rain';
      obj.artist = 'Prince';
      obj.album = 'Purple Rain';
      var song = new Song(obj);

      song.insert(function(err){
        Song.findAll(function(songs){
          expect(songs).to.have.length(1);
          done();
        });
      });
    });
  });

  describe('.findByName', function(){
    it('should find a Song by its name', function(done){
      var obj = {};
      obj.name = 'Purple Rain';
      obj.artist = 'Prince';
      obj.album = 'Purple Rain';
      var song = new Song(obj);

      song.insert(function(err){
        Song.findByName(song.name, function(record){
          expect(record.name).to.equal(song.name);
          done();
        });
      });
    });
  });

});
