(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "f8086f537604cc1c82533c62b2df8c8b";

},{}],2:[function(require,module,exports){
'use strict';

var apiKey = require('./../.env').apiKey;

$(document).ready(function () {
  $('#form').submit(function (event) {
    event.preventDefault();
    var symptoms = $('#user-symptoms').val();
    var firstName = $('#doctor-first-name').val();
    var lastName = $('#doctor-last-name').val();
    $('#user-symptoms').val("");
    $.ajax({
      url: 'https://api.betterdoctor.com/2016-03-01/doctors?first_name=' + firstName + '&last_name=' + lastName + '&query=' + symptoms + '&location=or-portland&skip=0&limit=10&user_key=' + apiKey,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function success(response) {
        var body = response.data;
        for (var i = 0; i < body.length; i++) {
          var _firstName = body[i].profile.first_name;
          var _lastName = body[i].profile.last_name;
          var bio = body[i].profile.bio;
          var street = body[i].practices[0].visit_address.street;
          var city = body[i].practices[0].visit_address.city;
          var state = body[i].practices[0].visit_address.state;
          var zip = body[i].practices[0].visit_address.zip;
          var phone = body[i].practices[0].phones[0].number;
          var newPatient = body[i].practices[0].accepts_new_patients;

          $('#form-output').append('\n            <ul>\n            <li>Provider: ' + _firstName + ' ' + _lastName + '</li>\n            <li>Bio: ' + bio + '</li>\n            <li>Address: ' + street + ' ' + city + ' ' + state + ' ' + zip + '</li>\n            <li>Phone: ' + phone + '</li>\n            <li>Accepting New Patients: ' + newPatient + '</li>\n            </ul>');
        }

        console.log(response.data);
      },
      error: function error() {
        $('#error').text("There was an error processing your request.");
      }

    });
  });
});

},{"./../.env":1}]},{},[2]);
