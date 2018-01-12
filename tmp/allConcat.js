const apiKey = require('./../.env').apiKey;

$(document).ready(function()  {
  $('#form').submit(function(event) {
    event.preventDefault();
    let symptoms = $('#user-symptoms').val();
    let firstName = $('#doctor-first-name').val();
    let lastName = $('#doctor-last-name').val();
    $('#user-symptoms').val("");
    $.ajax({
      url: `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${firstName}&last_name=${lastName}&query=${symptoms}&location=or-portland&skip=0&limit=10&user_key=${apiKey}`,
      type: 'GET',
      data: {
        format: 'json',
      },
      success: function(response) {
        let body = response.data;
        for (let i = 0; i < body.length; i++) {
          const firstName = body[i].profile.first_name;
          const lastName = body[i].profile.last_name;
          const bio = body[i].profile.bio;
          const street = body[i].practices[0].visit_address.street;
          const city = body[i].practices[0].visit_address.city;
          const state = body[i].practices[0].visit_address.state;
          const zip = body[i].practices[0].visit_address.zip;
          const phone = body[i].practices[0].phones[0].number;
          const newPatient = body[i].practices[0].accepts_new_patients;

          $('#form-output').append(`
            <ul>
            <li>Provider: ${firstName} ${lastName}</li>
            <li>Bio: ${bio}</li>
            <li>Address: ${street} ${city} ${state} ${zip}</li>
            <li>Phone: ${phone}</li>
            <li>Accepting New Patients: ${newPatient}</li>
            </ul>`);
        }

        console.log(response.data);
      },
      error: function() {
        $('#error').text("There was an error processing your request.");
      }

    })
  })
})
