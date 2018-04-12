/* https://github.com/madmurphy/cookies.js (GPL3) */
var docCookies={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(e,o,n,t,r,c){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(n)switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:s="; expires="+n;break;case Date:s="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+s+(r?"; domain="+r:"")+(t?"; path="+t:"")+(c?"; secure":""),!0},removeItem:function(e,o,n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(o?"; path="+o:""),!0):!1},hasItem:function(e){return!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),o=e.length,n=0;o>n;n++)e[n]=decodeURIComponent(e[n]);return e}};"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=docCookies);

$.noConflict();
(function($) {
  var fname = $('#fname').val();
  var lname = $('#lname').val();
  var number = $('#number').val();
  var email = $('#email').val();
  var gender = $('#gender').val();
  var birthday = $('#birthday').val();
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


  /* page one: search */
  $('#flightsearch').on('submit', function(e) {
    console.log("submit clicked");

    /* serialize array for form inputs */
    var formOneData = $(this).serializeArray();
    console.log(formOneData);

    $.each(formOneData, function(i, field) {
      console.log(field.name, field.value);

      docCookies.setItem(field.name, field.value);
      console.log(field.name + ": " + docCookies.getItem(field.name));
    });

    /* get numeric value for ticket quantity */

    var adult = $("#adult").val();
    var senior = $("#senior").val();
    var children = $("#children").val();
    var infant = $("#infant").val();

    adult = +adult;
    senior = +senior;
    children = +children;
    infant = +infant;

    docCookies.setItem("adult", adult);
    docCookies.setItem("senior", senior);
    docCookies.setItem("children", children);
    docCookies.setItem("infant", infant);

    console.log(docCookies.getItem("adult"));
    console.log(docCookies.getItem("senior"));
    console.log(docCookies.getItem("children"));
    console.log(docCookies.getItem("infant"));

    var quantity = (adult + senior + children + infant);
    console.log("total tickets: " + quantity);

    /* add quantity cookie */
    docCookies.setItem("quantity", quantity);
    console.log("cookie: " + docCookies.getItem("quantity"));

    /* validation */
    if(quantity < 7){
      if(adult >= 1 || senior >= 1) {
      /* if values are null, then display error message */
        switch('') {
          case $("#deparloc").val():
            $(".error").remove();
            $(".loc").before("<li class=error>Please enter your departure location!</li>");
            console.log("Please enter your departure location!");
            break;
          case $("#arriveloc").val():
            $(".error").remove();
            $(".loc").before("<li class=error>Please enter your arrival location!</li>");
            console.log("Please enter your arrival location!");
            break;
          case $("#departdate").val():
            $(".error").remove();
            $(".dates").before("<li class=error>Please enter your departure date!</li>");
            console.log("Please enter your departure date!");
            break;
          }
          if(document.getElementById('roundtrip').checked){
            switch('') {
              case $("#returndate").val():
                $(".error").remove();
                $(".dates").before("<li class=error>Please enter your return date!</li>");
                console.log("Please enter your return date!");
                break;
            }
          } else {
            /* todo: hide the return date entirely when not selected */
          }
        } else {
          $(".error").remove();
          $(".tickets").before("<li class=error>You must have at least one adult or senior ticket.</li>");
        console.log("You must have at least one adult or senior ticket per order.");
      }
    } else {
      $(".error").remove();
      $(".tickets").before("<li class=error>No more than six tickets per customer!</li>");
      console.log("No more than 6 tickets per customer.");
    }
  //e.preventDefault();
  });
  /* page two: search results */


  $('#flightselection').on('submit', function(d)
  {
      var departflights = document.getElementsByName("departflight");
      var returnflights = document.getElementsByName("returnflight");
      var formValid = false;
      var formValid2 = false;
      var j = 0;
      var i = 0;

      while (!formValid && i < departflights.length) {
        if (departflights[i].checked) formValid = true;
            i++;
        }
        while (!formValid2 && j < returnflights.length) {
          if (returnflights[j].checked) formValid2 = true;
            j++;
        }
        if (!formValid || !formValid2){
          d.preventDefault();
        }
        return formValid;
  //})
  });

  /* page three: seat selection */

/*  var unavailable = ["A1", "A2"];
  $.each(unavailable, function(i,v) {
    $('.seats a[href="#'+v'"]').addClass('unavailable').prepend('<h6>Seat unavailable.</h6>');
  }); */

  $('.one a').on('click', function(e) {
    var selected = [];
    var seats;

    e.preventDefault();

    if($(this).hasClass('unavailable')) {
      return;
    }

    $(this).toggleClass('selected');
    $('.selected', '.rows').each(function() {
      console.log("here");
      var seat = $(this).attr('href').substring(1);
      selected.push(seat);
    });

    /* make string of array to put inside input */
    seats = selected.join(", ");
    $('#seatsFlightOne').val(seats);
    console.log(selected);
    console.log(seatsFlightOne);
    docCookies.setItem('seatsFlightOne', seats);
    console.log("flight one seats cookie: " + docCookies.getItem('seatsFlightOne'));

  }); /* end .one function */

  $('.two a').on('click', function(e) {
    var selected = [];
    var seats;

    e.preventDefault();

    if($(this).hasClass('unavailable')) {
      return;
    }

    $(this).toggleClass('selected');
    $('.selected', '.rows').each(function() {
      console.log("here2");
      var seat = $(this).attr('href').substring(1);
      selected.push(seat);
    });

    /* make string of array to put inside input */
    seats = selected.join(", ");
    $('#seatsFlightTwo').val(seats);
    console.log(selected);
    console.log(seatsFlightTwo);
    docCookies.setItem('seatsFlightTwo', seats);
    console.log("flight two seats cookie: " + docCookies.getItem('seatsFlightTwo'));
  });

$('#seatSelection').on('submit', function(e) {
  var seatSelectionData = $(this).serializeArray();
})





  /* page whatever: user information */
  $('#uinformation').on('submit', function(d)
    {
      if(document.getElementById("fname").value === '' || document.getElementById("lname").value === '' || document.getElementById("number").value === '' || document.getElementById("email") === ''){
        d.preventDefault();
        $('#header2').after('<li id="error">You have information missing!</li>');
      }
      // check if input boxes are empty
      if(document.getElementById("fname").value !== '' && document.getElementById("lname").value !== '' && document.getElementById("number").value !== '' && document.getElementById("email").value !== '')
      {
        if(d.target instanceof HTMLAnchorElement) d.preventDefault();
        // remove the error messages
        $('#error').remove();
        console.log('form sub, data ' + 'first name ' + fname + ' last name ' + lname + ' phone number ' + number + ' Email ' + email + ' Gender ' + gender + ' Birthday ' + birthday);
      }
    });

    $('#zipcode').on('keyup', function(e) {
      var zip = $('#zipcode').val();
      if(zip.length === 5){
        console.log("looks good to me!");}
      $.get('http://api.zippopotam.us/us/' + zip,
        function(data){
          $('#state').val(data.places[0]["state abbreviation"]);
          $('#city').val(data.places[0]["place name"]);
        });
    });

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
        $('#error2').remove();
        var cardinfo = {
          number: docCookies.setItem('cardnum', cardnum),
          expmonth: docCookies.setItem('expmonth', expmonth),
          expyear: docCookies.setItem('expyear', expyear),
          username: docCookies.setItem('username', username)
        };

        /*var billing = {
          address:
          city:
          state:
          zipcode:
        }*/
        /*docCookies.setItem('username', username);
        //docCookies.setItem('cardnum', cardnum);
        docCookies.setItem('expmonth', expmonth);*/
        console.log(docCookies.getItem('cardnum'));
        console.log(docCookies.getItem('username'));
        console.log(docCookies.getItem('expmonth'));
        console.log(docCookies.getItem('expyear'));
        console.log('Your DATA '+ zipcode);
        //$('.firstentry').append('<b>DATA - Your whole name: ' + docCookies.getItem('username') + '</b>');
      }

  });

      console.log("here");

      $('.firstName').append("name");

})(jQuery);
