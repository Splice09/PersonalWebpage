/*
 Draws a table based on query results and inserts the html into WebFrame.html
 */
//var nameData = jQuery.parseJSON(stringNames);
var myTable = "<table class=\"projectsTable\"><tr><th>Project Name</th>";
myTable+= "<th>Project Description</th></tr>";
//projNames.length == projDesc.length
if(true){
    //console.log("=========== project names info =======" + nameData[0]);
    for(var i = 0; i < 1; i++){
        myTable+= "<tr><td> patrick </td><td> fleming </td></tr>";
    }
}
else if(projNames.length == 0){
    console.log("SOMETHING IS UP WITH OUR DATABASE READ IN");
}
else{
    //console.log("table arrays aren't the same length.")
}
myTable+= "</table>";
$('.ppContent').html(myTable);