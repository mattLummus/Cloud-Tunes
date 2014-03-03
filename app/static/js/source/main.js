(function(){

  'use strict';

  $(document).ready(initialize);
  $('#addArtist').click(showArtistForm);
  $('#addAlbum').click(showAlbumForm);
  $('#addSong').click(showSongForm);
  $('input[type="text"]').focus(function(){
    $(this).addClass('focusField');
  });
  $('input[type="text"]').blur(function(){
    $(this).removeClass('focusField');
  });

  var origin = window.location.origin;

//---- Show Forms

  function showArtistForm(){
    $('#submitSong').css('display', 'none');
    $('#submitAlbum').css('display', 'none');
    $('#submitArtist').slideToggle('fast');
  }

  function showAlbumForm(){
    $('#submitSong').css('display', 'none');
    $('#submitArtist').css('display', 'none');
    $('#submitAlbum').slideToggle('fast');
  }

  function showSongForm(){
    $('#submitArtist').css('display', 'none');
    $('#submitAlbum').css('display', 'none');
    $('#submitSong').slideToggle('fast');
  }

//----

  function initialize(){
    $(document).foundation();
    //$('#mainArea').on('click','.album', showSongs);
    //$('#mainArea').on('click','.artist', showArtists);
    $('#saveArtist').click(addArtist);
    $('#saveAlbum').click(addAlbum);
    $('#showArtists').click(showArtists);
    $('#showAlbums').click(showAlbums);
    $('#mainArea').on('click', '.editArtist', editArtist);
    $('#mainArea').on('click', '.editAlbum', editAlbum);
    $('#mainArea').on('click', '.editing', addArtist);
    $('#mainArea').on('click', '.editingAlbum', addAlbum);
    $('#mainArea').on('click', '.photo', filterArtist);
    showAlbums();
    showArtists();
  }

  /////////SHOW FUNCTIONS////////
  function showArtists(){
    $('#artistSelect').empty();
    var url = origin + '/artists';
    $.getJSON(url, displayArtists);
  }

  function showAlbums(){
    var url = origin + '/albums/';
    $.getJSON(url, displayAlbums);
  }

  /*
  function showSongs(){
    var url = origin + '/songs/';
    $.getJSON(url, function(data){
    });
  }
  */
  /////////END SHOW FUNCTIONS////////

  ////////ADD FUNCTIONS///////
  function addArtist(err){
    if ($(this).attr('id') === 'editing'){
      $(this).attr('id','saveArtist');
    }
    var url = origin + '/artists';
    var data = $('#submitArtist').serialize();
    var type = 'POST';
    var success = newArtist;
    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault(err);
  }

  function newArtist(artist){
    $('#submitArtist input').val('');
    displayArtist(artist);
  }

  function addAlbum(err){
    
    showAlbums();
    var url = origin + '/albums';
    var data = $('#submitAlbum').serialize();
    var type = 'PUT';
    var success = newAlbum;
    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault(err);
  }

  function newAlbum(album){
    $('#mainArea').empty();
    $('#submitArtist input').val('');
    displayAlbum(album);
  }

  ////////DISPLAY FUNCTIONS////////
  //displays one artist at a time on the to the #mainArea
  function displayArtist(artist){

    var $photo = $('<div>').attr('data-artist-id', artist._id);
    var $name = $('<div>').addClass('name');
    var $header = $('<div>').addClass('footer');
    //var $footer = $('<a>').addClass('footer');
    // push artists to select box
    var $option = $('<option>').text(artist.name);
    $('.artist').append($option);

    // add edit button
    var $edit = $('<div>').text('edit');
    $edit.addClass('editArtist');

    $photo.addClass('photo grow');
    var url = 'url("'+artist.photo+'")';
    $photo.css('background-image', url);
    $name.text(artist.name);

    var $headertxt = $('<div style="float:left; padding:5px;"></div>');
    $headertxt.text(artist.name);
    $header.append($headertxt);
    $photo.append($header, $edit);
    $('#mainArea').prepend($photo);
  }

  function displayArtists(data){
    $('#mainArea').empty();
    for(var i = 0; i < data.artists.length; i++){
      displayArtist(data.artists[i]);
    }
  }


  function displayAlbum(album){
    var $option = $('<option>').text(album.name);
    $('#album').append($option);

    var $photo = $('<div>').attr('data-album-id', album._id);
    var $name = $('<div>').addClass('name');
    var $header = $('<div>').addClass('footer');
    var $year = $('<div>').addClass('footer albumyear');
    var $artist = $('<div>').addClass('artist hide');
    $year.text(album.year);
    $artist.text(album.artist);

    var $edit = $('<div>').text('edit');
    $edit.addClass('editAlbum');

    $photo.addClass('albumPhoto');
    var url = 'url("'+album.cover+'")';
    $photo.css('background-image', url);
    $name.text(album.name);

    var $headertxt = $('<div style="float:left; padding:5px;"></div>');
    $headertxt.text(album.name);
    $header.append($headertxt);

    $photo.append($header, $edit, $year, $artist);
    $('#mainArea').prepend($photo);
  }
  
  function displayAlbums(data){
    $('#mainArea').empty();
    console.log(data.albums);
    for(var i = 0; i < data.albums.length; i++){
      displayAlbum(data.albums[i]);
    }
  }
  ////////END DISPLAY FUNCTIONS////////

  ////////EDIT FUNCTIONS////////
  
  function editArtist(){
    $('#saveArtist').attr('id', 'editing');
    $('#artistName').val($(this).siblings().children('div').text());
    showAlbums();
    var x = $(this).parent().css('background-image');
    $('#artistPhoto').val(x);
    $('#artistId').val($(this).parent().attr('data-artist-id'));
    showArtistForm();
  }
  
  function editAlbum(){
    $('#saveAlbum').attr('id', 'editingAlbum');
    $('#albumName').val($(this).siblings().children('div').text());
    $('#albumYear').val($(this).siblings('.albumyear').text());
    $('#artistSelect').val($(this).siblings('.artist').text());
    var x = $(this).parent().css('background-image');
    $('#albumPhoto').val(x);
    $('#albumId').val($(this).parent().attr('data-album-id'));
    showAlbumForm();
  }
/*
  function editSave(err){
    var url = origin + '/artists';
    var data = $('#submitAlbum').serialize();
    var type = 'put';
    var success = function(data){
      console.log(data);
    };
    $.ajax({url:url, type:type, data:data, success:success});
    console.log(clicked);


    event.preventDefault(err);
  }

  function changeAlbum(data){
    $('#mainArea').empty();
    console.log('stuff');
    _.remove(artists, function(artist){
      return artist._id === data._id;
    });
  }
*/

  //////////FILTERS/////////
  function filterArtist(){
    var artist = $(this).children('.footer').text();
    console.log(artist);
    var url = origin + '/albums/filter?type=artist&which='+ artist;
    console.log(url);
    //var data = $('#submitAlbum').serialize();
    //var type = 'GET';
    $.getJSON(url, displayAlbums);
    //var success = displayAlbums;
    //$.ajax({url:url, type:type, data:data, success:success});
  }


})();
