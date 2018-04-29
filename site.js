/* https://github.com/madmurphy/cookies.js (GPL3) */
var docCookies={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(e,o,n,t,r,c){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(n)switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:s="; expires="+n;break;case Date:s="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+s+(r?"; domain="+r:"")+(t?"; path="+t:"")+(c?"; secure":""),!0},removeItem:function(e,o,n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(o?"; path="+o:""),!0):!1},hasItem:function(e){return!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),o=e.length,n=0;o>n;n++)e[n]=decodeURIComponent(e[n]);return e}};"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=docCookies);

$.noConflict();
(function($) {
  var fname = $('#fname').val();
  var lname = $('#lname').val();
  var number = $('#number').val();
  var email = $('#email').val();
  var birthday = $('#birthday').val();

  /* page one: search */
  $('#flightsearch').on('submit', function(e) {

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
    var departlocation = $("#deparloc").val();

    adult = +adult;
    senior = +senior;
    children = +children;
    infant = +infant;

    docCookies.setItem("adult", adult);
    docCookies.setItem("senior", senior);
    docCookies.setItem("children", children);
    docCookies.setItem("infant", infant);
    docCookies.setItem("departlocation", departlocation);

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
    //  e.preventDefault();
        switch('') {
          case $("#deparloc").val():
            $(".errormessage").remove();
            $(".loc").before("<li class=errormessage>Please enter your departure location!</li>");
            console.log("Please enter your departure location!");
            break;
          case $("#arriveloc").val():
            $(".errormessage").remove();
            $(".loc").before("<li class=errormessage>Please enter your arrival location!</li>");
            console.log("Please enter your arrival location!");
            break;
          case $("#departdate").val():
            $(".errormessage").remove();
            $(".dates").before("<li class=errormessage>Please enter your departure date!</li>");
            console.log("Please enter your departure date!");
            break;
          }
          if(document.getElementById('roundtrip').checked){

            switch('') {
              case $("#returndate").val():
                $(".errormessage").remove();
                $(".dates").before("<li class=errormessage>Please enter your return date!</li>");
                console.log("Please enter your return date!");
                break;
            }
          } else {
            /* todo: hide the return date entirely when not selected */
          }
        } else {

          $(".errormessage").remove();
          $(".tickets").before("<li class=errormessage>You must have at least one adult or senior ticket.</li>");
        console.log("You must have at least one adult or senior ticket per order.");
      }
    } else {

      $(".errormessage").remove();
      $(".tickets").before("<li class=errormessage>No more than six tickets per customer!</li>");
      console.log("No more than 6 tickets per customer.");
    }
  //e.preventDefault();

  });

  /* prettier, easier buttons
  $('#adult').after('<a id="more" href="#null">+</a>');
  $('#adult').before('<a id="less" href="#null">-</a>');
  $('#senior').after('<a id="more" href="#null">+</a>');
  $('#senior').before('<a id="less" href="#null">-</a>');
  $('#children').after('<a id="more" href="#null">+</a>');
  $('#children').before('<a id="less" href="#null">-</a>');
  $('#infant').after('<a id="more" href="#null">+</a>');
  $('#infant').before('<a id="less" href="#null">-</a>');
  /* page two: search results */


  $('#flightselection').on('submit', function(d)
  {
      console.log("submit clicked");

    /* serialize array for form inputs */
    var formTwoData = $(this).serializeArray();
    console.log(formTwoData);

    $.each(formTwoData, function(i, field) {
      console.log(field.name, field.value);

      docCookies.setItem(field.name, field.value, null, '/');
      console.log(field.name + ": " + docCookies.getItem(field.name));
    });


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
          $('#searchsubmit').after('<li id="errormessage">You have information missing! Please select your flight/flights!</li>');
        }
  });

  /* page three: seat selection */

/*  var unavailable = ["A1", "A2"];
  $.each(unavailable, function(i,v) {
    $('.seats a[href="#'+v'"]').addClass('unavailable').prepend('<h6>Seat unavailable.</h6>');
  }); */
  $('#seatSelection').on('submit', function(e) {
    var seatSelectionData = $(this).serializeArray();
  })
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
    docCookies.setItem('seatsFlightOne', seats, null, '/');
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
    docCookies.setItem('seatsFlightTwo', seats, null, '/');
    console.log("flight two seats cookie: " + docCookies.getItem('seatsFlightTwo'));
  });


  /* page whatever: user information */
  $('#uinformation').on('submit', function(d)
    {
      var fname = $('#fname').val();
      var lname = $('#lname').val();
      var number = $('#number').val();
      var email = $('#email').val();
      var birthday = $('#birthday').val();
      var uinformation = $(this).serializeArray();
      console.log(uinformation);

      $.each(uinformation, function(i, field) {
        console.log(field.name, field.value);
        docCookies.setItem(field.name, field.value);
        console.log(field.name + ": " + docCookies.getItem(field.name));
      });


      if(document.getElementById("fname").value === '' || document.getElementById("lname").value === '' || document.getElementById("number").value === '' || document.getElementById("email") === ''){
        d.preventDefault();
        $('#error2').before('<li id="errormessage">You have information missing!</li>');
      }
      // check if input boxes are empty
      if(document.getElementById("fname").value !== '' && document.getElementById("lname").value !== '' && document.getElementById("number").value !== '' && document.getElementById("email").value !== '')
      {
        if(d.target instanceof HTMLAnchorElement) d.preventDefault();
        // remove the error messages
        $('#errormessage').remove();
        $('#h2card').after('<p id="reciept">RECIEPT: You requested ' + docCookies.getItem('quantity') + ' tickets, so the total for your departing and arrival flight will be $460 + $390 = $850</p>');

        docCookies.setItem("fname", fname, null, '/');
        docCookies.setItem("lname", lname, null, '/');
        docCookies.setItem("number", number, null, '/');
        docCookies.setItem("email", email, null, '/');
        docCookies.setItem("birthday", birthday, '/');

        console.log(docCookies.getItem("lname"));
        console.log(docCookies.getItem("fname"));
        console.log(docCookies.getItem("number"));
        console.log(docCookies.getItem("email"));
        console.log(docCookies.getItem("birthday"));
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

      var paymentInformation = $(this).serializeArray();
      console.log(paymentInformation);

      $.each(paymentInformation, function(i, field) {
        console.log(field.name, field.value);
        docCookies.setItem(field.name, field.value);
        console.log(field.name + ": " + docCookies.getItem(field.name));
      });

      var cardnum = $('#cardnumber').val();
      var expmonth = $('#expmonth').val();
      var expyear = $('#expyear').val();
      var username = $('#username').val();
      var address = $('#address').val();
      var city = $('#city').val();
      var zipcode = $('#zipcode').val();
      var state = $('#state').val();

      if(document.getElementById("cardnumber").value === '' || document.getElementById("expmonth").value === ''
       || document.getElementById("expyear").value === '' || document.getElementById("username").value === ''
      || document.getElementById("address").value === '' || document.getElementById("city").value === ''
      || document.getElementById("zipcode").value === '' || document.getElementById("state").value === '' ){
        d.preventDefault();
        $('#error').before('<li id="errormessage">There is missing information</li>');
        //$('#h2card').after('<p id="reciept">RECIEPT: You requested ' + docCookies.getItem('quantity') + ' tickets, so the total for your departing and arrival flight will be $460 + $390 = $850</p>');
      }

      if(document.getElementById("cardnumber").value !== '' && document.getElementById("expmonth").value !== ''
      && document.getElementById("expyear").value !== '' && document.getElementById("username").value !== ''
      && document.getElementById("address").value !== '' && document.getElementById("city").value !== ''
      && document.getElementById("zipcode").value !== '' && document.getElementById("state").value !== '' ) {
        if(d.target instanceof HTMLAnchorElement) d.preventDefault();
        $('#errormessage').remove();

        docCookies.setItem('cardnum', cardnum, null, '/');
        docCookies.setItem('expmonth', expmonth, null, '/');
        docCookies.setItem('expyear', expyear, null, '/');
        docCookies.setItem('address', address, null, '/');
        docCookies.setItem('state', state, null, '/');
        docCookies.setItem('zipcode', zipcode, null, '/');
        docCookies.setItem('city', city, null, '/');
        docCookies.setItem('username', username, null, '/');

        console.log(docCookies.getItem('cardnum'));
        console.log(docCookies.getItem('username'));
        console.log(docCookies.getItem('expmonth'));
        console.log(docCookies.getItem('expyear'));
        console.log(docCookies.getItem('address'));
        console.log(docCookies.getItem('city'));
        console.log(docCookies.getItem('state'));
        console.log(docCookies.getItem('zipcode'));

    }
  });
 departdate = $('#departdate').val()
  console.log(document.cookie);
  $('#personalinsert').append('<b> Your first name: ' + docCookies.getItem('fname') + '</b>' + '<p> Your last name: '
  + docCookies.getItem('lname') + '</p>' + '<p> Your birthday is: ' + docCookies.getItem('birthday') + '</p>'
  + '<p> Your number is: ' + docCookies.getItem('number') + '</p>' + '<p> Your email address is: ' + docCookies.getItem('email') + '</p>' );

  $('#paymentinsert').append('<p> Your card number: ' + docCookies.getItem('cardnum') + '</p>' +
  '<p> The expiration month is: ' + docCookies.getItem('expmonth') + '</p>' +
   '<p> The expiration year is: ' + docCookies.getItem('expyear') + '</p>' +
  '<p> The full name displayed on the card: ' + docCookies.getItem('username') + '</p>' +
  '<p> The address: ' + docCookies.getItem('address') + '</p>' +
  '<p> The city: ' + docCookies.getItem('city') + '</p>' +
  '<p> The zipcode: ' + docCookies.getItem('zipcode') + '</p>' +
  '<p> The state: ' + docCookies.getItem('state') + '</p>');

  $('#flightinsert').append('<p> Your ticket quantity: ' + docCookies.getItem('quantity') + '</p>' +
  '<p> The number of adult tickets: ' + docCookies.getItem('adult') + '</p>' +
  '<p> The number of senior tickets: ' + docCookies.getItem('senior') + '</p>' +
  '<p> The number of children tickets: ' + docCookies.getItem('children') + '</p>' +
  '<p> The number of infant tickets: ' + docCookies.getItem('infant') + '</p>');

  $('#ticketinsert').append('<p> Your departing flight is: ' + docCookies.getItem('departflight') + '</p>' +
  '<p> Your arriving flight is: ' + docCookies.getItem('returnflight') + '</p>');

  $('#seatinsert').append('<p> Your selected seats for flight one: ' + docCookies.getItem('seatsFlightOne') + '</p>' +
  '<p> Your selected seats for flight two: ' + docCookies.getItem('seatsFlightTwo') + '</p>');

  $('#confirmationpg').append('<p> Hello ' + docCookies.getItem('fname') + '</p>' +
  '<p>Quantity of tickets: ' + docCookies.getItem('quantity') + '</p>' + '<p> Adults: ' + docCookies.getItem('adult') + '</p>' +
  '<p> Seniors: ' + docCookies.getItem('senior') + '</p>' + '<p> Children: ' + docCookies.getItem('children') + '</p>' +
  '<p> Have a safe and enjoyable trip!!</p>');
})(jQuery);
