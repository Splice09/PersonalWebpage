/*
Shows and hides the content boxes on triangle clicks.
 */
$( document ).ready(function() {
    $('.bodyTriangle1').click(function(){
        $('.currentWork').fadeOut('fast');
        $('.pastProjects').fadeOut('fast');
        $('.aboutMe').fadeToggle('slow');
        $('.triText2').fadeIn('slow');
        $('.triText3').fadeIn('slow');
        $('.triText1').fadeToggle('fast');

    });
    $(".bodyTriangle2").click(function(){
        $('.aboutMe').fadeOut('fast');
        $('.pastProjects').fadeOut('fast');
        $('.currentWork').fadeToggle('slow');
        $('.triText1').fadeIn('slow');
        $('.triText3').fadeIn('slow');
        $('.triText2').fadeToggle('fast');
    });
    $('.bodyTriangle3').click(function(){
        $('.aboutMe').fadeOut('fast');
        $('.currentWork').fadeOut('fast');
        $('.pastProjects').fadeToggle('slow');
        $('.triText1').fadeIn('slow');
        $('.triText2').fadeIn('slow');
        $('.triText3').fadeToggle('fast');
    });
});