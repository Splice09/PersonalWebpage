$(document).ready(function()
{
    $("div.bodyTriangle1").hover(
        function () {
            $("div.fadeText1").fadeIn('slow');
        },
        function () {
            $("div.fadeText1").fadeOut('slow');
        }
    );
});
