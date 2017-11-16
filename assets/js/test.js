var formApp = function(){
	var checkName = false;
		checkLastName = false;
		checkEmail = false;
		checkPhone = false;
		checkZipCode = false;
		checkerFlag = false;
		wichChecked = false;
		email = "";
		wichContainer = "";
		wichValidate = "";
		lastElement = "";
		typContainer = $('.uc-landing_container');
		currentElement = "#nameRow",
		containerHeight = typContainer.outerHeight(true),
		//New
		showText = "... <span class='uc_textDisplay'>Show more</span>",
		hideText = "<span class='uc_textDisplay'> Show less</span>",
		originalContent = [],
		previewContent = [],
		maxLenght = 0,
		slideCounter = 0,
		galleryFlag = false,
		sliderContentGal = '';


	return {
		validForm:false,
		controlList: [
            {
                name: "nameRow",
                selector: "#nameRow"
            },
            {
                name: "lastNameRow",
                selector: "#lastNameRow"
            },
            {
            	name: "emailRow",
                selector: "#emailRow"
            },
            {
            	name: "phoneRow",
                selector: "#phoneRow"
            },
        ],

		init:function(){
			var self=this;

			$('.slider-bg').each(function(index, el){
				var dataImg = $(el).data('img');
				$(el).css('background-image', 'url(' + dataImg + ')');
			});

			//clean input
			$('input').val("");
			$('input').parent().removeClass('iconCheck').removeClass('iconError');

			document.addEventListener("touchmove", ScrollStart, false);

			$('input').blur(function() {
				$('input').removeClass("focus");
			})
			.focus(function() {
				$(this).addClass("focus")
			});

			function ScrollStart() {
				if($(document).width() > 767){
					$('input').each(function(index, val) {
						if ($(this).hasClass('focus')) {
							$(this).blur();
						}
					});
					self.onScrollFixed();
				}
				self.scrollToCall();
			}

			//Events on inputs
			self.checkInputs();
			//Init
			//self.calcWidthContainer();
			//self.placeholderChange();

			if($(document).width() > 767){
				setTimeout( function() {
					self.onScrollFixed();
				}, 150);

				//If ipad
				/*if (navigator.userAgent.match(/iPad/i) != null) {
					$('.uc-circle').css('top', '24px');
				} else {
					if ($(document).width() <= 1024) {
						$('.uc-circle').css('top', '22px');
					} else {
						$('.uc-circle').css('top', '21px');
					}
				}*/
				$('#details_phone.able_phone').attr('');
			} else {
				self.scrollToCall();
				$('#details_phone.able_phone').attr('href', 'tel:8442059097');
			}

			//On window scroll
			$(window).scroll(function(event) {
				if($(document).width() > 767){
					self.onScrollFixed();
				} else {
					self.scrollToCall();
				}
			}),

			//Trigger fn of container resize
			$(window).on( 'orientationchange', function(){
				setTimeout( function() {
					self.onScrollFixed();
					self.scrollToCall();
					//self.placeholderChange();
					//self.calcWidthContainer();
					//self.arrowAnimation('resize');
					self.arrowAnimationUpdate();
					//self.containerResize();
				}, 100);
			});
			window.addEventListener("resize", function() {
				self.onScrollFixed();
				self.scrollToCall();
				//self.placeholderChange();
				//self.calcWidthContainer();
				//self.arrowAnimation('resize');
				self.arrowAnimationUpdate();
				//self.containerResize();
				//self.resizeGallery();
			});

			setTimeout( function() {
				//self.containerResize();
				self.calcTextToShow();
				//self.resizeGallery();
			}, 100);

			//Event of main button
			$('#button--findcar').on('click', function() {
				self.submitValidate();
			});

			//NEW

			$("body").on('click', ".uc_textDisplay", function(){
				var shortTextId = $(this).closest('.conent_info').attr('ucc_shortTextId');
				if($(this).text().toLowerCase()=="show more"){
					$(this).closest('.conent_info').empty().append(originalContent[shortTextId]+hideText);
				}else{
					$(this).closest('.conent_info').empty().append(previewContent[shortTextId]+showText);
				}
				setTimeout( function() {
					self.onScrollFixed();
				}, 150);
			});

			//Slider
			var swiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 1,
		        onInit: function(){
		        	$('.swiper-button-next').removeClass('swiper-btn-hidden');
		        },
		    });

			//Scroll to form
			$('#contactBtn').click(function(event) {
				var formPos = $('.container-fixedForm');
				$('html, body').animate({
					scrollTop: formPos.offset().top - 50
				}, 500);
			});

			//Close gallery
			/*$('.ucc-gal__close').click(function(){
				$('.ucc-maskOff').removeClass('ucc-gallery_show');
				$('html').removeClass('ucc-ht_fixed');
				sliderContentGal.destroySlider();
				$('.ucc-gal_slide').css('left', '0');
				$('#bx-pager p').html('1 / 10');
				$('.ucc-gal-mobile').removeClass('ucc-gal-containerHeight');
			});
			$('.ucc-maskBG').click(function(){
				$('.ucc-maskOff').removeClass('ucc-gallery_show');
				$('html').removeClass('ucc-ht_fixed');
				sliderContentGal.destroySlider();
				$('.ucc-gal_slide').css('left', '0');
				$('#bx-pager p').html('1 / 10');
				$('.ucc-gal-mobile').removeClass('ucc-gal-containerHeight');
			});*/

			$("body").on('click', "#button--findcarTyp", function() {
				$('.uc-submitMask').addClass('showConsentSubmit');
				$('html').addClass('ucc-ht_fixed');
			});

			$("body").on('click', ".uc-consent-yes, .uc-consent-no", function() {
				$('.uc-submitMask').removeClass('showConsentSubmit');
				$('html').removeClass('ucc-ht_fixed');
			});

			//NEW


			//Hide error on focus
			$('.uc-error-info').on('click', function() {
				$(this).parent().find('input').focus();
			});

			$('.openPrivacy').on('click', function() {
				$('.uc-privacyMask').addClass('uc-privacyMaskActive');
			});

			$('#closePrivacy').on('click', function() {
				$('.uc-privacyMask').removeClass('uc-privacyMaskActive');
			});

			//Events on Phone Input
			$("#phone--input").focusin(function () {
				setTimeout(self.phonePattern(), 100);
			});
			$("#phone--input").on("change keyup", function (e) {
				var k = e.which;
				if((k>=48&&k<=57)||(k>=96&&k<=105)){
					var position = this.selectionStart;
					position = self.phonePattern(position);
					this.setSelectionRange(position, position);
				}
			});

			//Events on Location Input
			$('body').on('keyup', '#zipcode--input', function(e){
				var key=e.which?e.which:e.keyCode;
				if(key!=37 && key!=39 && key!=8 && key!=46 && key!=16 ){
					$('#zipcode--input').val($('#zipcode--input').val().replace(/\D/g, ""));
				}
				if (!((key >= 48 && key <= 58) || key == 8 || key == 46 || key == 16) ) {
					e.preventDefault();
				}
			});
			$('body').on('keydown', '#zipcode--input', function(e){
				var key=e.which?e.which:e.keyCode;
				if (!((key >= 48) && (key <= 57)) && !((key >= 96) && (key <= 105)) && key != 8 && key != 13 && key != 37 && key != 39 && key != 46 && key != 16) { return false }
			});

			//Placeholder for older browsers
			$('input[type=email],input[type=text], input[type=tel]').placeholder();

			//Toggle Text fn
			$.fn.toggleText = function(t1, t2){
				if (this.text() == t1) this.text(t2);
				else                   this.text(t1);
				return this;
			};

		}, //End init funtion

		calcTextToShow: function() {
			var self=this;

			if($(document).width() > 767) {
				maxLenght = 176;
			} else {
				maxLenght = 65;
			}

			$(".conent_info").each(function(index){
				originalContent.push($(this).html());
				var shortText = $(this).html().slice(0,maxLenght);
				previewContent.push(shortText);
				$(this).html(shortText+showText).attr("ucc_shortTextId", index);
				setTimeout( function() {
					self.onScrollFixed();
				}, 150);
			});
		},

		/*resizeGallery: function() {
			var self=this,
				heightWindow = $('.ucc-maskOff').outerHeight(),
				heightContact = $('.uc-contactDealer').outerHeight(),
				heightContainerGal = $('.ucc-gal-mobile').outerHeight(),
				marginMask = 40,
				leftHeight = heightWindow - heightContact - marginMask;

			if(heightContainerGal > leftHeight) {
				$('.ucc-gal-mobile').addClass('ucc-gal-containerHeight');
			} else {
				$('.ucc-gal-mobile').removeClass('ucc-gal-containerHeight');
			}
		},*/

		//Calc width of container with fixed and absolute position
		/*calcWidthContainer: function() {
			$('.formMainContainer').width( $( '.container-fixedForm' )[0].getBoundingClientRect().width );
		},*/

		isIE: function() {
			var myNav = navigator.userAgent.toLowerCase();
			return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
		},

		//Focus In Out, KeyUp, Change of inputs to validate
		checkInputs: function() {
			var self=this;
				container = $( '.inner__row' ),
				input = container.find( 'input' );

			input.focusin( function( event ) {
				wichContainer = this.id;
				self.checkWichValidate(wichContainer);
				$( this ).parent().addClass( 'inputActive' );
				$(this).parent().find('.uc-error-info').addClass('uc-hideErrorInfo');

				$('.uc-contactDealer').addClass('uc-contactHideOnFocus');
				$( this ).parent().addClass( 'iconFocus' )
			});

			input.focusout( function( event ) {
				$(this).parent().find('.uc-error-info').removeClass('uc-hideErrorInfo');
				self.checkWichValidate(wichContainer);
				if (wichValidate) {
					$( this ).parent().addClass( 'iconCheck' )
					.removeClass( 'iconError' );
					wichChecked = true;
				} else if (wichValidate == false) {
					$( this ).parent().addClass( 'iconError' )
					.removeClass( 'iconCheck' );
					wichChecked = false;
				}
				$( this ).parent().removeClass( 'inputActive' );
				self.checkProgress();
				$( this ).parent().removeClass( 'iconFocus' );
				$('.uc-contactDealer').removeClass('uc-contactHideOnFocus');
			});

			input.keyup( function( event ) {
				var key=event.which?event.which:event.keyCode;
				if(key!=9){
					$(this).parent().find('.uc-error-info').removeClass('uc-hideErrorInfo');
					self.checkWichValidate(wichContainer);
					if (wichValidate) {
						$( this ).parent().removeClass( 'iconError' ).addClass( 'iconCheck' );
						wichChecked = true;
						if (checkerFlag == false){
							self.checkProgress();
							checkerFlag = true;
						}
					} else {
						$( this ).parent().addClass( 'inputWhite' )
						.removeClass( 'iconError' )
						.removeClass( 'iconCheck' );
						wichChecked = false;
					}
					if ( $( this ).val().length == 0 ) {
						$( this ).parent().addClass( 'iconError' )
						.removeClass( 'iconCheck' );
						wichChecked = false;
					}
				}
			});
			input.on( 'change', function(event) {
				$(this).parent().find('.uc-error-info').removeClass('uc-hideErrorInfo');
				$(this.id + ' .inner__column').removeClass('iconError');
				if ( $( this ).val() != '' ) {
					$( this ).parent().addClass( 'inputWhite' );
				}
			});
		},

		//Check wich kind of validation use
		checkWichValidate: function(element) {
			var self=this;

			switch (element) {
				case 'name--input': {
					name = $("#" + element).val();
					wichValidate = $("#" + element).val().length > 2 && self.validateName(name);
					checkName = wichChecked;
					break;
				}
				case 'lastName--input': {
					lastName = $("#" + element).val();
					wichValidate = $("#" + element).val().length > 2 && self.validateName(lastName);
					checkLastName = wichChecked;
					break;
				}
				case 'email--input': {
					email = $("#" + element).val();
					wichValidate = self.validateEmail(email);
					checkEmail = wichChecked;
					break;
				}
				case 'phone--input': {
					wichValidate = $("#" + element).val().replace(/\D/g, "").length >= 10;
					checkPhone = wichChecked;
					break;
				}
				case 'zipcode--input': {
					wichValidate = $("#" + element).val().length == 5;
					checkZipCode = wichChecked;
					break;
				}
			}
		},

		//Email validation pattern
		validateEmail: function(email) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},

		validateName: function(name) {
			var patternName=/^[A-Za-z ]{1,30}$/;
            name=name.trim();
            return patternName.test(name);
		},

		//Phone validation pattern
		phonePattern: function (pos) {
			var self=this;
				patt = "(___) ___-____";
				phoneValue = $("#phone--input").val();
				phoneDigits = phoneValue.replace(/\D/g, "");

			for (var i = 0; i < phoneDigits.length; i++) patt = patt.replace("_", phoneDigits.charAt(i));
			if (phoneDigits.length < 10) patt = patt.substring(0, patt.indexOf("_"));
			$("#phone--input").val(patt);
			if(pos<phoneValue.length){
				if(pos==1){
					return 2
				}else if(pos==4){
					return 6
				}else if(pos==5||pos==6){
					return 7
				}else if(pos==10){
					return 11
				}else{
					return pos
				}
			}else{
				return pos+(patt.length - phoneValue.length);
			}
		},

		arrowAnimation: function(element) {
			var self=this;
			var arrowMiddleHeight = $('.uc-stepsGuide').height() / 2;
			var sourcePosition = ($('#nameRow').offset().top + ($('#nameRow').height() / 2)) - arrowMiddleHeight;
			var targetPosition = ($(element).offset().top + ($(element).height() / 2)) - arrowMiddleHeight;
			var pixelSpace = 0;
			var pixelsToMove = (targetPosition - sourcePosition) + pixelSpace;

			$('.uc-stepsGuide').css({
				transform: 'translateY('+ pixelsToMove + 'px)'
			});
			self.currentElement = element;
		},

		arrowAnimationUpdate: function() {
			var self = this;

			if (self.currentElement != "" && self.currentElement != undefined) {
				self.arrowAnimation(self.currentElement);
			}
		},

		scrollToCall: function() {
			var self = this;

			if($(document).width() <= 767) {
				if($(window).scrollTop() >= $('.uc-tableMobile').offset().top) {
					$('.uc-contactDealer').addClass('uc-showContactDealer');
				} else {
					$('.uc-contactDealer').removeClass('uc-showContactDealer');
				};
			};
		},

		//Check the progress of the inputs filled
		checkProgress: function(){
			var self=this;
			var filledCounter=0;
			_.forEach(self.controlList, function(item) {
			switch(item.name){
				case "nameRow":
					if(checkName == true){
						filledCounter++;
						$(item.selector + ' .inner__column').removeClass('iconError');
						self.arrowAnimation('#lastNameRow');
					};
				break;
				case "lastNameRow":
					if(checkLastName == true){
						filledCounter++;
						$(item.selector + ' .inner__column').removeClass('iconError');
						self.arrowAnimation('#emailRow');
					};
				break;
				case "emailRow":
					if(checkEmail == true){
						filledCounter++;
						$(item.selector + ' .inner__column').removeClass('iconError');
						self.arrowAnimation('#phoneRow');
					};
				break;
				case "phoneRow":
					if(checkPhone == true){
						filledCounter++;
						$(item.selector + ' .inner__column').removeClass('iconError');
					};
				break;
			}
			});

			self.validForm=(filledCounter==self.controlList.length);

			if (self.validForm) {
				self.arrowAnimation('#button--findcar');
			}
		},

		//Validate the form
		validateForm: function(){
			var self=this;

			_.forEach(self.controlList, function(item) {
			switch(item.name){
				case "nameRow":
					if(checkName == false){
						$(item.selector + ' .inner__column').addClass('iconError');
						self.shakeForm($(item.selector));
					};
				break;
				case "lastNameRow":
					if(checkLastName == false){
						$(item.selector + ' .inner__column').addClass('iconError');
						self.shakeForm($(item.selector));
					};
				break;
				case "emailRow":
					if(checkEmail == false){
						$(item.selector + ' .inner__column').addClass('iconError');
						self.shakeForm($(item.selector));
					};
				break;
				case "phoneRow":
					if(checkPhone == false){
						$(item.selector + ' .inner__column').addClass('iconError');
						self.shakeForm($(item.selector));
					};
				break;
			}
			});
		},

		shakeForm: function(element) {
            var self=this;
            $(element).removeClass('uc-form-shakeForm uc-formRunning').addClass('uc-form-shakeForm uc-formRunning').one('animationend webkitAnimationEnd oAnimationEnd', function () {
                $(element).removeClass('uc-form-shakeForm uc-formRunning');
            });
        },

		//If all fields are ok redirect
		submitValidate: function() {
			var self=this

			if (self.validForm == true) {
				window.location =  'typ.html';
			} else {
				self.validateForm();
			}
		},

		onScrollFixed: function(){
			var self=this;
				contentBoxTopPos = $('.details-highlights').offset().top;
				contentBoxHeight = $('.details-highlights').outerHeight();
				fixedContainerHeight = $('.formMainContainer').outerHeight();
				finishScroll = contentBoxHeight - fixedContainerHeight;

			if($(document).width() > 1023){
				startScroll = contentBoxTopPos - 30;
			} else {
				startScroll = contentBoxTopPos - 10;
			}

			if ($("#container").hasClass('uc-typShow')) {
				var addTyp = $("#ty-message-container").height();
				finishScroll = finishScroll + addTyp;
			}

			$('.container-fixedForm').css('height', contentBoxHeight);

			if($(document).width() > 767){
				if($( window ).scrollTop() >= startScroll) {
					$('.formMainContainer').addClass('passToFixed');
				} else {
					$('.formMainContainer').removeClass('passToFixed');
				}
				if($( window ).scrollTop() >= finishScroll) {
					if($('.formMainContainer').hasClass('passToFixed')){
						$('.formMainContainer').removeClass('passToFixed').addClass('formAbsoluteBottom');
					} else {
						$('.formMainContainer').removeClass('formAbsoluteBottom').addClass('passToFixed');
					}
				} else {
					$('.formMainContainer').removeClass('formAbsoluteBottom');
				}
			} else {
				$('.formMainContainer').removeClass('passToFixed');
				$('.container-fixedForm').css('height', 'auto');
			};
		},

		//Container height resize
		/*containerResize: function() {
			$('.mainContainer').css('margin-bottom', '0');
			if($('#container').hasClass('uc-landing_container')) {
				var windowHeight = $(window).height();
					paddingContainer = parseInt(typContainer.css('padding-top').replace("px","")) + parseInt(typContainer.css('padding-bottom').replace("px",""));
					footerBarHeight = $('.footer__container').outerHeight(true);
				if(containerHeight + footerBarHeight < windowHeight) {
					typContainer.height(windowHeight - paddingContainer - footerBarHeight);
				} else {
					typContainer.height('auto');
				}
			}
		},*/

		/*placeholderChange: function(){
			console.log('Remove placeholderChange()');
			if($(document).width() <= 767){
				$('#name--input').attr('placeholder','First Name');
				$('#lastName--input').attr('placeholder','Last Name');
			} else {
				$('#name--input').attr('placeholder','First');
				$('#lastName--input').attr('placeholder','Last');
			}

		},*/

	}
}();

$( document ).ready(function() {
	formApp.init();
});