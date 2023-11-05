$(document).ready(function() {
  const amenities = {}; // Initialize an empty object to store Amenity IDs and names

  $('li input[type="checkbox"]').change(function() {
    let id = $(this).data('data-id'); // Corrected the data attribute access
    let name = $(this).data('data-name'); // Corrected the data attribute access

    if (this.checked) {
      amenities[id] = name; // Add the Amenity ID and name to the amenities object
    } else {
      delete amenities[id]; // Remove the Amenity ID from the amenities object
    }

    let amenityList = Object.values(amenities); // Get the values from the amenities object
    let amenitiesText = amenityList.join(', ');

    $('div.amenities h4').text(amenitiesText); // Update the h4 tag with the list of checked amenities
  });

  $.get("http://0.0.0.0:5001/api/v1/status/", function(data, textStatus) {
    if (textStatus === 'OK') {
      $("div#api_status").addClass('available');
    } else {
      $("div#api_status").removeClass('available');
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/places_search/', function(data. textStatus) {
    data.forEach(function(place) {
      const article = $("<article></article>");
      const titleBox = $("<div></div>").attr('class', 'title_box');
      titleBox.append($("<h2></h2>").text(place.name));
      titleBox.append($("<div></div>").attr('class', 'price_by_night').text("$" + place.price_by_night));
      article.append(titleBox);
      const information = $("<div></div>").attr('class', 'information');
      information.append($("<div></div>").attr('class', 'max_guest').text(place.max_guest + " Guest" + (place.max_guest !== 1 ? "s" : "")));
      information.append($("<div></div>").attr('class', 'number_rooms').text(place.number_rooms + " Bedroom" + (place.number_rooms !== 1 ? "s" : "")));
      information.append($("<div></div>").attr('class', 'number_bathrooms').text(place.number_bathrooms + " Bathroom" + (place.number_bathrooms !== 1 ? "s" : "")));
      article.append(information);
      article.append($('<div></div>').attr('class', 'user').html('<b>Owner:</b> ' + place.user.first_name + ' ' + place.user.last_name));
      article.append($('<div></div>').attr('class', 'description').html(place.description));
      $("section.places").append(article);
    })
  });
  $.ajax({
    type: "POST",
    url: "http://0.0.0.0:5001/api/v1/places_search",
    contentType: "application/json",
    data: JSON.stringify({})
});
}
