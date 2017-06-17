;(($)=> {
	'use strict';

	$('a[href*="#"]').on('click', function() {
			event.preventDefault();

			$('body').animate({
				scrollTop: $( $(this).attr('href') ).offset().top
			}, 600);

	});

	$(window).on('load', function() { $('.cd-slider').slick({
		autoplay: true,
		infinite: true,
		dots: true,
	});

		var map = null;

	function createMap() {

		var $markers = $('.cd-marker');

		map = new google.maps.Map( $('.cd-map')[0], {
			zoom: 14,

			center: new google.maps.LatLng(0,0),
			scrollwheel: false
		});

		addMarkers($markers, map);
		centerMap($markers, map);

	}

	function addMarkers( $markers, map ) {
		$markers.each( function() {
			var lat = $(this).data('lat');
			var lng = $(this).data('lng');
			var icon = $(this).data('icon');
			var marker = new google.maps.Marker({
				position: { lat: lat, lng: lng },
				map: map,
				icon: icon,
			});

			var content = $(this).find('.description').html();

			var infoWindow = new google.maps.InfoWindow({
				content: content,
			});

			marker.addListener('click', function() {
				infoWindow.open(map, marker);
			});

		});
	}

	function centerMap($markers, map) {

		if ($markers.length == 1) {

			var lat = $markers.data('lat');
			var lng = $markers.data('lng');
			var latLng = new google.maps.LatLng( lat, lng );
			map.setCenter(latLng);

		} else {

			var bounds = new google.maps.LatLngBounds();

			$markers.each( function() {
				var lat = $(this).data('lat');
				var lng = $(this).data('lng');
				var latLng = new google.maps.LatLng( lat, lng );
				bounds.extend(latLng);
			});

			map.fitBounds(bounds);

		}

	}

	createMap();


    });



})(jQuery);
