$(document).ready(function()
{
    $("div.pageHead").hover(
        function () {
            $("div.fadeText1").fadeIn('slow');
        },
        function () {
            $("div.fadeText1").fadeOut('slow');
        }
    );
});
