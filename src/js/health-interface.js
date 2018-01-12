const apiKey = require('./../.env').apiKey;

$(document).ready(function()  {
  $('#search-results').submit(function() {
    let symptoms = $('#user-symptoms').val();
    let firstName = $('#doctor-first-name').val();
    let lastName = $('#doctor-last-name').val();
    $('#user-symptoms').val("");
    $.ajax({
      url: `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${firstName}&last_name=${lastName}&query=${symptoms}&location=or-portland&skip=0&limit=10&user_key=f8086f537604cc1c82533c62b2df8c8b`,
      type: 'GET',
      data: {
        format: 'json',
      },

    })
  })
})
