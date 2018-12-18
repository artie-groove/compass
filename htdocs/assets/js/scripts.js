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

	$('#mainMenu .navbar-toggler').on('click', function() {
		$(this).toggleClass('show');
		$(this).next('.collapse').toggleClass('show');
	});

	$('.navbar-secondary .navbar-toggler').on('click', function() {
		$(this).toggleClass('show');
		$(this).siblings('.collapse').toggleClass('show');
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

	// Formats time to HH:MM:SS
	function formatTime(duration) {
		let hours = Math.floor(duration / 60 / 60);
		let minutes = Math.floor(duration / 60 - hours * 60);
		let seconds = Math.floor(duration - hours * 3600 - minutes * 60);
		if ( hours > 0 && minutes < 10 ) minutes = '0' + minutes;
		if ( seconds < 10 ) seconds = '0' + seconds;
		let timeStack = hours > 0 ? [hours] : [];
		timeStack.push(minutes, seconds);
		return timeStack.join(':');
	}

	function updateAudioTimeline(timeline, percentage, total) {
		let progressbar = timeline.find('.progress-bar');
		let currentPosition = timeline.find('.current-pos');
		let time = formatTime(total * percentage / 100);
		progressbar.css('width', percentage + '%');
		currentPosition.html(time);
	} 

	function setAudioPlaybackPosition(card, percentage) {
		let track = card.find('audio')[0];
		let timeline = card.find('.audio-timeline');
		updateAudioTimeline(timeline, percentage, track.duration);
		let newTime = track.duration * percentage / 100;
		track.currentTime = newTime;
	}

	let playbackTimer = null;

	$('.audio-cover').on('click', function() {
		let track = $(this).siblings('audio')[0];
		if ( $(this).hasClass('playing') ) {
			$(this).toggleClass('playing');
			track.pause();
		}
		else {
			$('.audio-cover').each( function() {
				if ( $(this).hasClass('playing') ) {
					$(this).removeClass('playing');
					$(this).prev()[0].pause();
					clearInterval(playbackTimer);
				}
			});
			$(this).addClass('playing');
			track.play();
			playbackTimer = setInterval( function(card, track) {
				updateAudioTimeline(card, track.currentTime / track.duration * 100, track.duration);
			}, 1000, $(this).closest('.card'), track);
		}
	});

	$('.audios .progress').on('click', function(e) {
		let card = $(this).closest('.card');
		let paddingY = $(this).outerWidth() - $(this).width();
		let pos = (e.pageX - $(this).offset().left - paddingY / 2) / $(this).width() * 100;
		if ( pos < 0 ) pos = 0;
		if ( pos > 100 ) pos = 100;
		setAudioPlaybackPosition(card, pos);
	});


	$('.audios audio').each( function() {
		this.addEventListener('play', function() {
			let duration = this.duration;
			$(this).closest('.card').find('.duration').html(formatTime(duration));
		});
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
		//let maxOffset = params.ribbonInner.children().length * params.itemWidth - params.ribbon.width();
		let lastItem = params.ribbonInner.children(':last-child');
		let maxOffset = lastItem.position().left + lastItem.outerWidth() - params.ribbon.width();
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
		let newOffset = 0;
		if ( params.offset < 0 ) {
			newOffset = params.offset + params.stepWidth;
			if ( params.offset + params.stepWidth > 0 ) newOffset = 0;
			
		}
		params.ribbonInner.animate({ left: newOffset });
	});


	if ( typeof pickmeup === 'function' ) {
		
		pickmeup.defaults.locales['ru'] = {
			days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
			daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
		};

		function getPosition(elementSelector) {
			let pos = $(elementSelector).offset();
			pos.top += $(elementSelector).outerHeight();
			pos.top += 'px';
			pos.left += 'px';
			return pos;
		}

		function getDatePickerPosition() {
			return getPosition('#customerDate');
		}

		function getDatePickerPosition2() {
			return getPosition('#customerDateRange');
		}

		function pmu_update_range(e) {
			let range = $(this).find('.date-range');
			let date1 = range.find('.date').eq(0);
			let date2 = range.find('.date').eq(1);
			let fdate1 = e.detail.formatted_date[0].split(' ');
			let fdate2 = e.detail.formatted_date[1].split(' ');
		    date1.find('.day').html(fdate1[0]);
		    date1.find('.month').html(fdate1[1]);
		    date1.find('.day-of-week').html(fdate1[2]);
		    date2.find('.day').html(fdate2[0]);
		    date2.find('.month').html(fdate2[1]);
		    date2.find('.day-of-week').html(fdate2[2]);
		    $(this).find('.date-range-wrapper .placeholder').hide();
		    range.css('display', 'flex');
		}

		function attach_range(selector, extra_settings) {
			let settings = Object.assign({
				default_date: false,
				format: 'd B A',
				locale: 'ru',
				mode: 'range',
				hide_on_select: true,
				prev: '',
				next: ''
			}, extra_settings);
			pickmeup(selector, settings);
			$(selector).on('pickmeup-change', pmu_update_range);
		}

		pickmeup('#customerDate input', {
			default_date: false,
			format: 'd b Y',
			hide_on_select: true,
			locale: 'ru',
			position: getDatePickerPosition,
		});

		attach_range('#customerDateRange', { position: getDatePickerPosition2 });
		attach_range('#tripDuration');
		attach_range('#previousTripDuration');

		// pickmeup('#customerDateRange', {
		// 	default_date: false,
		// 	format: 'd B A',
		// 	locale: 'ru',
		// 	mode: 'range',
		// 	hide_on_select: true,
		// 	position: getDatePickerPosition2,
		// 	prev: '',
		// 	next: ''
		// });

		// pickmeup('#tripDuration', {
		// 	default_date: false,
		// 	format: 'd B A',
		// 	locale: 'ru',
		// 	mode: 'range',
		// 	hide_on_select: true,
		// 	prev: '',
		// 	next: ''
		// });

		// $('#tripDuration').on('pickmeup-change', pmu_update_range);
		// $('#customerDateRange').on('pickmeup-change', pmu_update_range);
		// $('#previousTripDuration').on('pickmeup-change', pmu_update_range);
	}

	if ( typeof $('').timepicker === 'function' ) {
		// timepicker
		$('#customerTime input').timepicker({
		    timeFormat: 'HH:mm',
		    interval: 60,
		    minTime: '10',
		    maxTime: '6:00pm',
		    defaultTime: '0',
		    startTime: '10:00',
		    dynamic: false,
		    dropdown: true,
		    scrollbar: true
		});
	}	

	
	// Tourvisor workarounds

	let panels = ['TVLocationPanel', 'TVCountryCombo', 'TVDataPicker', 'TVChooseDrop', 'TVTouristDrop'];

	function TVPopup(btn, panel) {
		panels.forEach(function(className) {
			let panel = $(`.${className}`);
			if ( ! panel.hasClass('TVHide') ) panel.addClass('TVHide');
		});
		let posX = $(btn).offset().top + $(btn).outerHeight(true);
		$(panel).css('top', posX);
		$(panel).css('left', 0)
		$(panel).toggleClass('TVHide');
	}

	$('.TVLocationButton').on('click', function(e) {
		TVPopup(this, $('.TVLocationPanel')[0]);
	});

	$('.TVCountry').on('click', function(e) {
		TVPopup(this, $('.TVCountryCombo')[0]);
	});

	$('.TVDates').on('click', function(e) {
		TVPopup(this, $('.TVDataPicker')[0]);
	});

	$('.TVNights').on('click', function(e) {
		TVPopup(this, $('.TVChooseDrop')[0]);
	});

	$('.TVTourists').on('click', function(e) {
		TVPopup(this, $('.TVTouristDrop')[0]);
	});


	$('.selector-option').on('click', function() {
		$('.selector-option input').removeAttr('checked');
		$(this).find('input').attr('checked', 'checked');
	});



	// Form manipulation
	function incrementId(id) {
		let lastChar = id.slice(-1);
		if ( ! isNaN(lastChar - parseFloat(lastChar)) ) {
			n = parseInt(lastChar) + 1;
			return id.slice(-1) + n; 
		}
		return id + '1';
	}


	$('.add-period').on('click', function() {
		let range = $(this).parent().prev().clone();
		let newId = incrementId(range.attr('id'));
		range.attr('id', newId); 
		range.insertBefore($(this).parent());
		attach_range('#' + newId);
	});

	$('.add-child').on('click', function() {
		let block = $(this).parent().prev().clone();
		block.find('input').each( function() {
			let newId = incrementId($(this).attr('id'));
			$(this).attr('id', newId);
			$(this).val('');
		});
		block.insertBefore($(this).parent());
	});

	$('#content-about .ribbon-item').on('click', function() {
		let modal = $('#imgLightbox');
		let src = $(this).children('img').attr('src');
		let dotPos = src.lastIndexOf('.');
		src = src.slice(0, dotPos) + '-lg' + src.slice(dotPos);
		modal.find('.img-wrapper img').attr('src', src);
		modal.modal('show');
	});

	$('.img-lightbox').on('click', function(e) {
		e.preventDefault();
		let modal = $('#imgLightbox');
		let src = $(this).attr('href');
		modal.find('.img-wrapper img').attr('src', src);
		modal.modal('show');
	});

	$('.early-booking-offer .togglers a').on('click', function() {
		$(this).siblings().removeClass('active');
		$(this).toggleClass('active');
		let idx = $(this).index();
		let hiddenContainer = $(this).closest('.card-body').find('.hidden');
		let target = hiddenContainer.children('div').eq(idx);
		target.siblings().hide();
		target.toggle();
		if ( $(this).hasClass('active') ) hiddenContainer.show();
		else hiddenContainer.hide();
	});

	$('#barGraph .graph-inner > div > div:first-child > div').tooltip({
		title: function() { return 'От ' + $(this).data('price') + ' р.' },
		boundary: 'viewport'
	});


	$('.filter-modal-toggler').on('click', function() {
		// if ( ! $(this).hasClass('show') ) {
		// 	$('#hotelsFilter').show();
		// }
		// else {
		// 	$('#hotelsFilter').hide();
		// }
		$('#hotelsFilter').toggle();
		$(this).toggleClass('show');
	});



});