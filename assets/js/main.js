$( document ).ready(function() {

	function checkInputs() {
		var container = $( '.inner__row' ),
				input = container.find( 'input' );

			input.focusin( function( event ) {
				wichContainer = this.id;
				$( this ).parent().addClass( 'inputActive' );
				$(this).parent().find('.error-info').addClass('hideErrorInfo');
				$( this ).parent().addClass( 'iconFocus' )
			});

			input.focusout( function( event ) {
				$(this).parent().find('.error-info').removeClass('hideErrorInfo');
				$( this ).parent().removeClass( 'inputActive' );
				$( this ).parent().removeClass( 'iconFocus' );
			});

			input.keyup( function( event ) {
				var key=event.which?event.which:event.keyCode;
				if(key!=9){
					$(this).parent().find('.error-info').removeClass('hideErrorInfo');
					if ( $( this ).val().length == 0 ) {
						$( this ).parent().addClass( 'iconError' )
						.removeClass( 'iconCheck' );
					}
				}
			});
			input.on( 'change', function(event) {
				$(this).parent().find('.error-info').removeClass('hideErrorInfo');
				$(this.id + ' .inner__column').removeClass('iconError');
				if ( $( this ).val() != '' ) {
					$( this ).parent().addClass( 'inputWhite' );
				}
			});
	};

	function sendMail() {
		var link = "mailto:tabarinisergio@gmail.com"
				 + "?cc=" + escape(document.getElementById('email').value)
				 + "&subject=" + escape("Informacion sobre freelance " + escape(document.getElementById('name').value))
				 + "&body=" + escape(document.getElementById('message').value)
		;
		window.location.href = link;
	}

	$("#sendEmail").click(function(e) {
		e.preventDefault();
		sendMail();
	});

	checkInputs();

	$('.skills-bar-container li').each( function(){
		var $barContainer = $(this).find('.bar-container');
		var dataPercent = parseInt($barContainer.data('percent'));
		var elem = $(this).find('.progressbar');
		var percent = $(this).find('.percent');
		var width = 0;

		var id = setInterval(frame, 15);

		function frame() {
			if (width >= dataPercent) {
					clearInterval(id);
			} else {
				width++;
				elem.css("width", width+"%");
				percent.html(width+" %");
			}
		}
	});
});