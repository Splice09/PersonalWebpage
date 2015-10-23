var pg = require('pg');
/*
Connects to DATABASE_URL (heroku postgreSQL database)
 - then queries the database for past project information
 */
var connectionString = "postgres://xppbneritkkeqc:ORqdupmaW39VMbGad0hzgZVC-i@ec2-54-225-201-25.compute-1.amazonaws.com:5432/d34n1n2r66gvkb";
var projNames = [];
var projDesc = [];
pg.connect(connectionString, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    var nameQuery = client.query('SELECT projname FROM projects.pastProjects;');
    var descQuery = client.query('SELECT projdesc FROM projects.pastProjects;');
    nameQuery.on('row', function(row) {
        projNames.push(JSON.stringify(row));
        console.log('=============this is your project name: ' + projNames[0]);
    });

    descQuery.on('row', function(row) {
        projDesc.push(JSON.stringify(row));
        console.log('=============this is your project description: ' + projDesc[0]);
    });

});

/*
Draws a table based on query results and inserts the html into WebFrame.html
 */
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
$('.ppContent').html(myTable);