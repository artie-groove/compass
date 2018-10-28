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

	//https://www.youtube.com/embed/1dGCSqNZbRk
	$('#ytplayer').on('show.bs.modal', function(e) {
		let ytvid = $(e.relatedTarget).data('ytvid');
		let src = `https://www.youtube.com/embed/${ytvid}?&autoplay=1`;
		$(this).find('iframe').attr('src', src);
	});

	$('#ytplayer').on('hide.bs.modal', function(e) {
		$(this).find('iframe').removeAttr('src');
	});

	$('.audio-cover').on('click', function() {
		if ( $(this).hasClass('playing') ) {
			$(this).toggleClass('playing');
		}
		else {
			$('.audio-cover').removeClass('playing');
			$(this).addClass('playing');
		}
	});

	function getRibbonParams(button) {
		let ribbon = $($(button).attr('href'));
		let ribbonInner = ribbon.find('.ribbon-inner');
		let offset = ribbonInner.position().left;
		let itemsPerStep = $(button).parent().data('items-per-step') || 1;
		let itemWidth = ribbonInner.find('.ribbon-item').outerWidth();
		let stepWidth = itemWidth * itemsPerStep;
		return {
			ribbon,
			ribbonInner,
			offset,
			itemWidth,
			stepWidth 
		}
	}

	$('.ribbon-control-next').on('click', function(e) {
		e.preventDefault();
		let params = getRibbonParams(this);
		let maxOffset = params.ribbonInner.children().length * params.itemWidth - params.ribbon.width();
		if ( params.offset + maxOffset - params.stepWidth > 0 ) {
			params.ribbonInner.animate({ left: params.offset - params.stepWidth });
		}
		else {
			params.ribbonInner.animate({ left: -maxOffset });
		}
	});

	$('.ribbon-control-prev').on('click', function(e) {
		e.preventDefault();
		let params = getRibbonParams(this);
		if ( params.offset < 0 ) {
			let newOffset = params.offset + params.stepWidth;
			if ( params.offset + params.stepWidth > 0 ) newOffset = 0;
			params.ribbonInner.animate({ left: newOffset });
		}
	});


});