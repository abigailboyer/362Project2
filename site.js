$.noConflict();
(function($) {
  var fname = $('#fname').val();
  var lname = $('#lname').val();
  $('#uinformation').on('submit', function(d)
 {
   if(document.getElementById("fname").value === '' || document.getElementById("lname").value === '' || document.getElementById("number").value === '' || document.getElementById("email") === ''){
  d.preventDefault();
   $('#header2').after('<li id="error">You have information missing!</li>');
   }

    // check if first name input box is empty
    if(document.getElementById("fname").value !== '' && document.getElementById("lname").value !== '' && document.getElementById("number").value !== '' && document.getElementById("email").value !== '')
     {
        if(d.target instanceof HTMLAnchorElement) d.preventDefault();
       //var fname = $('#fname').val();
      // var lname = $('#lname').val();
       var number = $('#number').val();
       var email = $('#email').val();
      var gender = $('#gender').val();
      var birthday = $('#birthday').val();
       // remove the error messages
       $('#error').remove();
          console.log('form sub, data ' + 'first name ' + fname + ' last name ' + lname + ' phone number ' + number + ' Email ' + email + ' Gender ' + gender + ' Birthday ' + birthday);
     }
  })
    $('#paymentinformation').on('submit', function(d)
    {
    if(document.getElementById("cardnumber").value === '' || document.getElementById("expmonth").value === ''
     || document.getElementById("expyear").value === '' || document.getElementById("username").value === ''
    || document.getElementById("address").value === '' || document.getElementById("city").value === ''
    || document.getElementById("zipcode").value === '' || document.getElementById("state").value === '' ){
      d.preventDefault();
      $('#h2card').after('<li id="error2">There is missing information</li>');
    }
    if(document.getElementById("cardnumber").value !== '' && document.getElementById("expmonth").value !== ''
    && document.getElementById("expyear").value !== '' && document.getElementById("username").value !== ''
    && document.getElementById("address").value !== '' && document.getElementById("city").value !== ''
    && document.getElementById("zipcode").value !== '' && document.getElementById("state").value !== '' ) {
      if(d.target instanceof HTMLAnchorElement) d.preventDefault();
      var cardnum = $('#cardnumber').val();
      var expmonth = $('#expmonth').val();
      var expyear = $('#expyear').val();
      var username = $('#username').val();
      var address = $('#address').val();
      var city = $('#city').val();
      var zipcode = $('#zipcode').val();
      var state = $('#state').val();
      var yesopt = $('#yesopt').val();
      var noopt = $('#noopt').val();
      $("showtickets").append("<p>Congratulations " + fname + " Your flight is going to</p>");
      $('#error2').remove();
        console.log('form is done, data ' + cardnum);
    }
});
})(jQuery);
