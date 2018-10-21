$(document).ready( function() {

	// This block can be safely removed
	// Address switchers handlers 
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

	// ^ This block can be safely removed

	// Dropdown submenus handlers

	$('.dropdown-submenu > a').on("click", function(e) {
	    var submenu = $(this);
	    $('.dropdown-submenu .dropdown-menu').removeClass('show');
	    submenu.next('.dropdown-menu').addClass('show');
	    submenu.parent().addClass('show');
	    e.stopPropagation();
	});

	$('.dropdown').on("hidden.bs.dropdown", function() {
	    // hide any open menus when parent closes
	    $('.dropdown-menu.show').removeClass('show');
	    $('.dropdown-submenu.show').removeClass('show');
	});

	// Mobile menu handler

	$('.navbar-toggler').on('click', function() {
		$(this).toggleClass('show');
		$(this).next('.collapse').toggleClass('show');
	});

});