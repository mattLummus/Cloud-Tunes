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
    $('#submitArtist').submit(addArtist);
    showSongs();
    showAlbums();
    showArtists();
  }

  /////////SHOW FUNCTIONS////////
  function showArtists(){
    var url = origin + '/albums/';
    $.getJSON(url, function(data){
    });
  }

  function showAlbums(){
    var url = origin + '/albums/';
    $.getJSON(url, function(data){
    });
  }

  function showSongs(){
    var url = origin + '/songs/';
    $.getJSON(url, function(data){
    });
  }
  /////////END SHOW FUNCTIONS////////

  ////////ADD FUNCTIONS///////
  function addArtist(err){
    var url = origin + '/artists';
    var data = $(this).serialize();
    var type = 'POST';
    var success = function(){console.log('yay');};
    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault(err);
  }

})();

