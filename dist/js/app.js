(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "f8086f537604cc1c82533c62b2df8c8b";

},{}],2:[function(require,module,exports){
'use strict';

var apiKey = require('./../.env').apiKey;

$(document).ready(function () {
  $('#search-results').submit(function () {
    var symptoms = $('#user-symptoms').val();
    var firstName = $('#doctor-first-name').val();
    var lastName = $('#doctor-last-name').val();
    $('#user-symptoms').val("");
    $.ajax({
      url: 'https://api.betterdoctor.com/2016-03-01/doctors?first_name=' + firstName + '&last_name=' + lastName + '&query=' + symptoms + '&location=or-portland&skip=0&limit=10&user_key=f8086f537604cc1c82533c62b2df8c8b',
      type: 'GET',
      data: {
        format: 'json'
      }

    });
  });
});

},{"./../.env":1}]},{},[2]);
