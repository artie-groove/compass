$(document).ready( function() {
	$('.city .dropdown-item').click( function() {
		let i = 0;
		let city = $(this).html();
		// Searching for selected city in the map
		while ( city != cityToAddressMap[i].name ) i++;
		let current = $(this).parent().siblings('.nav-link');
		$(this).html(current.html());
		current.html(city);
		let addressGroup = $('.address');
		let currentAddress = addressGroup.find('.nav-link');
		currentAddress.children('div').html(cityToAddressMap[i].addresses[0].address);
		currentAddress.children('small').html(cityToAddressMap[i].addresses[0].details);
		// Refresh the list of extra addresses
	});

	$('.address .dropdown-item').click( function() {
		// Bubble up the selected one

		// Drown the current one
		
	});
});