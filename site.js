$.noConflict();
(function($) {
  $('#uinformation').on('submit', function(d)
 {
   d.preventDefault();
    // check if first name input box is empty
    if(document.getElementById("fname").value !== '' && document.getElementById("lname").value !== '' && document.getElementById("number").value !== '' && document.getElementById("email").value !== '')
     {
       // remove the error messages
       $('#error').remove();
          console.log('form sub');
     }
    if(document.getElementById("fname").value === '' || document.getElementById("lname").value === '' || document.getElementById("number").value === '' || document.getElementById("email") === ''){
      $('#header2').after('<li id="error">You have information missing!</li>');
    }
    // check if last name input box is empty
    /*if(document.getElementById("lname").value === '' ){
      $('#lname').after('<li id="error">Your last name is missing!</li>');
    }
    //check if phone number input box is empty
    if(document.getElementById("number").value === '' ){
      $('#number').after('<li id="error">Your number is missing!</li>');
    }
    //check if email input box is empty
    if(document.getElementById("email").value === '' ){
      $('#email').after('<li id="error">Your email is missing!</li>');
    }*/
  });
})(jQuery);
