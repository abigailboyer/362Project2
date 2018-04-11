$('html').removeClass('nojs').addClass('js');
$.noConflict();
var docCookies={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(e,o,n,t,r,c){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(n)switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:s="; expires="+n;break;case Date:s="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+s+(r?"; domain="+r:"")+(t?"; path="+t:"")+(c?"; secure":""),!0},removeItem:function(e,o,n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(o?"; path="+o:""),!0):!1},hasItem:function(e){return!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),o=e.length,n=0;o>n;n++)e[n]=decodeURIComponent(e[n]);return e}};"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=docCookies);


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
  $('#zipcode').on('keyup', function(e) {
    var zip = $('#zipcode').val();
    if(zip.length === 5){
      console.log("looks good to me!");}
      $.get('http://api.zippopotam.us/us/' + zip,
      function(data){
        $('#state').val(data.places[0]["state abbreviation"]);
        $('#city').val(data.places[0]["place name"])
      })
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
      $('#error2').remove();
      docCookies.setItem('username', username);
  }
  window.location.href = $(this).attr('action');
});

if(docCookies.hasItem('username')){
  $('.printconfirm').append('<p>Congratulations ' + /*docCookies.getItem('username') +*/ '.</p>');
  console.log(docCookies.getItem('username'));
}
})(jQuery);
