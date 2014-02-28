//unit test
/*jshint expr: true*/
'use strict';

process.env.DBNAME= 'music-test';
var expect = require('chai').expect;
var exec = require('child_process').exec;
var fs = require('fs');
var Album;

describe('Album', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Album = require('../../app/models/album');
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

  describe('new', function(){
    it('should create a new Album object', function(){
      var obj = {};
      obj.name = 'Purple Rain';
      obj.artist = 'Prince';
      obj.year = 1983;
      obj.songs = [];
      var album = new Album(obj);
      expect(album).to.be.instanceof(Album);
    });
  });

  describe('#addPhoto', function(){
    it('should add a photo to Album', function(){
      var obj = {};
      obj.name = 'test Purple Rain';
      obj.artist = 'Prince';
      obj.year = 1983;
      obj.songs = [];
      var album = new Album(obj);
      var oldname = __dirname + '/../fixtures/tempPhoto-copy.jpg';
      album.addPhoto(oldname);
      expect(album.photo).to.equal('/img/testpurplerain/photo.jpg');
    });
  });

  describe('#insert', function(){
    it('should insert a Album object into the DB', function(done){
      var obj = {};
      obj.name = 'test Purple Rain';
      obj.artist = 'Prince';
      obj.year = 1983;
      obj.songs = [];
      var album = new Album(obj);
      var oldname = __dirname + '/../fixtures/tempPhoto-copy.jpg';
      album.addPhoto(oldname);

      album.insert(function(err){
        expect(err).to.be.null;
        expect(album).to.be.instanceof(Album);
        expect(album).to.have.property('_id').and.be.ok;
        expect(album._id.toString()).to.have.length(24);
        done();
      });
    });
  });

//FIND METHODS

  describe('.findById', function(){
    it('should find an Album by its ID', function(done){
      var obj = {};
      obj.name = 'test Purple Rain';
      obj.artist = 'Prince';
      obj.year = 1983;
      obj.songs = [];
      var album = new Album(obj);
      var oldname = __dirname + '/../fixtures/tempPhoto-copy.jpg';
      album.addPhoto(oldname);

      album.insert(function(err){
        var id = album._id.toString();
        console.log(id);
        Album.findById(id, function(album){
          expect(album.name).to.equal('test Purple Rain');
          done();
        });
      });
    });
  });


  describe('.findAll', function(){
    it('should find all the Albums in the database', function(done){
      var obj = {};
      obj.name = 'test Purple Rain';
      obj.artist = 'Prince';
      obj.year = 1983;
      obj.songs = [];
      var album = new Album(obj);
      var oldname = __dirname + '/../fixtures/tempPhoto-copy.jpg';
      album.addPhoto(oldname);

      album.insert(function(err){
        Album.findAll(function(albums){
          expect(albums).to.have.length(1);
          done();
        });
      });
    });
  });

  describe('.findByName', function(){
    it('should find an Album by its name', function(done){
      var obj = {};
      obj.name = 'test Purple Rain';
      obj.artist = 'Prince';
      obj.year = 1983;
      obj.songs = [];
      var album = new Album(obj);
      var oldname = __dirname + '/../fixtures/tempPhoto-copy.jpg';
      album.addPhoto(oldname);

      album.insert(function(err){
        Album.findByName(album.name, function(record){
          expect(record.name).to.equal(album.name);
          done();
        });
      });
    });
  });

});
