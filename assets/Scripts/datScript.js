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

<script>
var myTable = "<table><tr><td>Project Name</td>";
myTable+= "<td>Project Description</td></tr>";

if(projNames.length == 0){
    console.log("SOMETHING IS UP WITH OUR DATABASE READ IN");
    }
else if(projNames.length == projDesc.length){
    console.log("=========== project names info =======" + projectNames[0]);
    for(var i = 0; i < projNames.length; i++){
    myTable+= "<tr><td>" + projectNames[i] + "</td><td>" + projectDesc[i] + "</td></tr>";
    }
}
else{
    console.log("table arrays aren't the same length.")
    }
myTabe+= "</table>";
document.getElementsByClassName(ppContent).innerHTML(myTable);
</script>