import { loadDoctorsSuccess, loadDoctorsError } from './../src/js/health-interface.js';

$.ajax({
  url: `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${firstName}&last_name=${lastName}&query=${symptoms}&location=or-portland&skip=0&limit=10&user_key=${apiKey}`,
  type: 'GET',
  data: {
    format: 'json',
  },
  success: loadDoctorsSuccess,
  error: loadDoctorsError,
});
