$(document).ready(function()
{
    $("div.bodyTriangle2").hover(
        function () {
            $("div.fadeText1").fadeIn('slow');
        },
        function () {
            $("div.fadeText1").fadeOut('slow');
        }
    );
});
