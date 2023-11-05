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
});
