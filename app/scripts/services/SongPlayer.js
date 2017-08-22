(function() {
    function SongPlayer() {
        var SongPlayer = {};

//        @desc current song object set to null when page first loads
//        @type {Object}
        var currentSong = null;

//        @desc Buzz object audio file
//        @type {Object}
        var currentBuzzObject = null;

//        @function setSong
//        @desc Stops currently playing song and loads new audio file as currentBuzzObject
//        @param {Object} song
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };

//        @function playSong
//        @desc plays song and sets song.playing to true so album.html changes play/pause icon
//        @param {Object} song
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }

//        @function pauseSong
//        @desc pauses song and sets song.playing to false so album.html changes play/pause icon
//        @param {Object} song
        var pauseSong = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        }

//        @function SongPlayer.play(song)
//        @desc plays a song from the beginning if the song has not already started and continues playing the song from where it left off if not
//        @params {Object} song
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);

            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

//        @function SongPlayer.pause(song)
//        @desc pauses a song at its current time point
//        @params {Object} song
        SongPlayer.pause = function(song) {
            pauseSong(song);
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
