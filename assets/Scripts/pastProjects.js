var myTable = "<table class=\"projectsTable\"><tr><th>Project Name</th>";
myTable+= "<th>Project Description</th></tr>";
/*
 if(projNames.length == 0){
 //console.log("SOMETHING IS UP WITH OUR DATABASE READ IN");
 }
 */
//projNames.length == projDesc.length
if(true){
    //console.log("=========== project names info =======" + projNames[0]);
    for(var i = 0; i < 1; i++){
        myTable+= "<tr><td> patrick </td><td> fleming </td></tr>";
    }
}
else{
    //console.log("table arrays aren't the same length.")
}
myTable+= "</table>";
//Look into surrounding ppContent with single quotes
$('.ppContent').html(myTable);