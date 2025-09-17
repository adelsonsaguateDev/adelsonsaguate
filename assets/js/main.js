/*!
=========================================================
* Adelson Landing page
=========================================================

* Copyright: 2025 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com & Adelson Saguate

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });

    // Explicitly initialize Bootstrap Scrollspy
    $('body').scrollspy({ target: '.custom-navbar', offset: 40 });

    $(document).on("click", "#baixar_cv", function (e) {
        e.preventDefault();
        window.open("assets/cv/Adelson_Manuel_Saguate_CV.pdf", "_blank");
      });
});

// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});