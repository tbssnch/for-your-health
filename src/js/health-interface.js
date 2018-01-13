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
        response.data.map(function(doctorInfo) {
          const firstName = doctorInfo.profile.first_name;
          const lastName = doctorInfo.profile.last_name;
          const street = doctorInfo.practices[0].visit_address.street;
          const city = doctorInfo.practices[0].visit_address.city;
          const state = doctorInfo.practices[0].visit_address.state;
          const zip = doctorInfo.practices[0].visit_address.zip;
          const phone = doctorInfo.practices[0].phones[0].number;
          let website = "";
          let newPatient = "";

          if (doctorInfo.practices[0].website) {
            website = `<li>Website: ${doctorInfo.practices[0]}</li>`
          }

          if (doctorInfo.practices[0].accepts_new_patients === true) {
            newPatient = `<li>Accepting New Patients: Yes</li>`
          }
          else if (doctorInfo.practices[0].accepts_new_patients === false) {
            newPatient = `<li>Accepting New Patients: No</li>`
          }

          $('#form-output').append(`
            <ul>
            <li>Provider: ${firstName} ${lastName}</li>
            <li>Address: ${street} ${city} ${state} ${zip}</li>
            <li>Phone: ${phone}</li>
            ${newPatient}
            ${website}
            </ul>`);
        })

        console.log(response.data);
      },
      error: function(response) {
        $('#error').text("There was an error processing your request.");
      }

    })
  })
})
