$(document).ready(function() {

	//Preloader
	setTimeout(function(){
		$('#preloader').fadeOut('slow',function(){$(this).remove();});
	}, 1000);

	// Img
	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	// Header hight
	function heightDetect() {
		$("#header").css("height", $(window).height() - 210);
	};
	
	if($(window).width() > 767) {
		heightDetect();
	} else {
		$("#header").css("height", $(window).height());
	}

	$(window).resize(function() {
		if($(window).width() > 767) {
			heightDetect();
		} else {
			$("#header").css("height", $(window).height());
		}
	});

	// Header full page
	function fullPageBg() {
		$(".header-full").css("height", $(window).height());
	};

	if($(window).width() > 992) {
		fullPageBg();
	}
	
	$(window).resize(function() {
		if($(window).width() > 992) {
			fullPageBg();
		} else {
			$(".header-full").css("height", "100%");
		}
	});

	// Particleground
	$('#header, #header-inner').particleground({
		dotColor: '#f6f6f6',
		lineColor: '#fff',
		lineWidth: .2,
		parallax: false,
		particleRadius: 3
	});

	// Typed Text
	$("#typed").typed({
		stringsElement: $('#typed-strings'),
		typeSpeed: 100,
        startDelay: 2000
	});

	// Wow
	new WOW().init();

	// Button click
	$('.stages-timer .white-button').click(function() {
		$(this).parent('.stages-timer').find('.avalible').fadeIn('slow');
	});

	$('.download-button').click(function() {
		$(this).parent('.coinminer-descr').find('.avalible').fadeIn('slow');
	});

	// Menu Toggle
	$('.main-menu-toggle').click(function() {
		$(this).toggleClass("on");
		$('.main-menu').slideToggle('slow');
	});

	// Scroll to id 
	$(".arrow-down").mPageScroll2id();

	// Magnific Popup
	$(".show-popup1, .show-popup2, .get-minecoin-button, .send-button, .receive-button, .notif_popup").magnificPopup({
		type:"inline",
		mainClass: 'mfp-fade',
		closeBtnInside: true,
		removalDelay: 300
	});

	$('.close-button').click(function() {
		$.magnificPopup.close();
	});

	// new Clipboard('.copy-id-button');

	// Captcha
	var progress_val = 20;

	$('#popup1').on('click', function(){
		progress_val = $('.progress-bar').attr('aria-valuenow');
		progress_val = parseInt(progress_val);

	  	if (progress_val < 100) {
	  		progress_val = progress_val + 20;
	  		$('.progress-bar').css('width', progress_val+'%').attr('aria-valuenow', progress_val);
	  		
	  		if (progress_val == 100) {
	  			$('.show-popup2').attr('disabled', false);
	  		}
		}
	});

	// Change input
	$('#btc-input').on('input',function(e){
		var btc_input = $(this).val();
    	$('#mnc-input').val(btc_input * 2000);
    });

    $('#mnc-input').on('input',function(e){
		var mnc_input = $(this).val();
    	$('#btc-input').val(mnc_input / 2000);
    });

    //Only Numbers
	$("#btc-input, #mnc-input").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

	// Google chart
	// google.charts.load('current', {packages: ['corechart', 'bar']});
	// google.charts.setOnLoadCallback(drawMultSeries);

	function drawMultSeries() {
      var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Motivation Level');
      data.addColumn('number', 'Energy Level');

      data.addRows([
        [{v: [8, 0, 0], f: '8 am'}, 1, .25],
        [{v: [9, 0, 0], f: '9 am'}, 2, .5],
        [{v: [10, 0, 0], f:'10 am'}, 3, 1],
        [{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
        [{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
        [{v: [13, 0, 0], f: '1 pm'}, 6, 3],
        [{v: [14, 0, 0], f: '2 pm'}, 7, 4],
        [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
        [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
        [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
      ]);

      var options = {
        title: 'Motivation and Energy Level Throughout the Day',
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          }
        },
        vAxis: {
          title: 'Rating (scale of 1-10)'
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('chart_div'));

      chart.draw(data, options);
    }

});
