$(document).ready(function () {
    "use strict";

    // navbar javascript
    window.onscroll = function () {
        if (pageYOffset <= 0) {
            document.querySelector("#navbar").style.backgroundColor = "unset";
            document.querySelector("header").style.height = "80px";
            document.getElementById("link1").style.paddingTop = "30px"
            document.getElementById("link2").style.paddingTop = "30px"
            document.getElementById("link3").style.paddingTop = "30px"
            document.getElementById("link4").style.paddingTop = "30px"
        } else {
            document.querySelector("#navbar").style.backgroundColor = "rgba(0, 0, 0, 0.9)";
            document.querySelector("header").style.height = "60px"
            document.getElementById("link1").style.paddingTop = "20px"
            document.getElementById("link2").style.paddingTop = "20px"
            document.getElementById("link3").style.paddingTop = "20px"
            document.getElementById("link4").style.paddingTop = "20px"
        };
    };

    //animation delay for loading screen    
    setTimeout(function () {
        $('#head_section1').css('visibility', 'visible')
    }, 3000);
    //navlinks
    setTimeout(function () {
        $('#link1').css('visibility', 'visible')
    }, 2000);
    setTimeout(function () {
        $('#link2').css('visibility', 'visible')
    }, 2000);
    setTimeout(function () {
        $('#link3').css('visibility', 'visible')
    }, 2000);
    setTimeout(function () {
        $('#link4').css('visibility', 'visible')
    }, 2000);

    setTimeout(function () {
        $('#text_section1').css('visibility', 'visible')
    }, 2000);
    setTimeout(function () {
        $('#main-logo').css('visibility', 'visible')
    }, 2000);
    setTimeout(function () {
        $('#reviewimg').css('visibility', 'visible')
    }, 2000);
    setTimeout(function () {
        $('#headerVideoLink').css('visibility', 'visible')
    }, 2000);

    // SMOOTH SCROLLING TO ANCHORS
    $('a[href*=\\#]:not([href=\\#]):not(.control-right, .control-left)').on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 100
                }, 1000);
                return false;
            }
        }
    });

    // LAZY LOADING IMAGES
    var bLazy = new Blazy();

    // ANIMATIONS
    var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top + 150;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
            }
        });
    }
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    // LIGHTBOX OPTIONS
    lightbox.option({
        'resizeDuration': 400,
        'imageFadeDuration': 400,
        'wrapAround': true
    });

    // NEWSLETTER SIGNUP SCRIPTS
    $("#newsletter").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            signupError();
            signupMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitSignup();
        }
    });

    function submitSignup() {
        // Initiate Variables With Form Content
        var emailsign = $("#emailsign").val();


        $.ajax({
            type: "POST",
            url: "php/newsletter-process.php",
            data: "&emailsign=" + emailsign,
            success: function (text) {
                if (text === "success") {
                    signupSuccess();
                } else {
                    signupError();
                    signupMSG(false, text);
                }
            }
        });
    }

    function signupSuccess() {
        $("#newsletter")[0].reset();
        signupMSG(true, "Awesome! Thank you for subscribing!")
    }

    function signupError() {
        $("#newsletter").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function signupMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#msgSignup").removeClass().addClass(msgClasses).text(msg);
    }

    //PRIVACY FORM SCRIPTS
    $("#privacyForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        // initiate variables with form content
        var name = $("#pname").val();
        var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();

        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms,
            success: function (text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
    }

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    //COPYRIGHT YEAR
    var date = new Date().getFullYear();
    document.getElementById("year").innerHTML = date;

});
window.onload = function () {
    // HIDE LOADING SCREEN WHEN PAGE IS LOADED
    $('#progress').animate({ width: '100%' }, 300, function () {
        $('#loader-wrapper').addClass('loaded');
    });

}

// Addtional js
$(document).ready(function () {
    $('#headerVideoLink').magnificPopup({
        type: 'inline',
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
});