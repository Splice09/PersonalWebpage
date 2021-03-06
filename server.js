var connect = require("connect"),
my_http = require("http"),
path = require("path"),
url = require("url"),
fileSys = require("fs"),
bodyParser = require("body-parser"),
app = connect(),
port = process.env.PORT || 5000,
stats,
htmlPath = "WebFrame.html",
pg = require('pg');
app.use(bodyParser.urlencoded({extended: false}));

//This function uses the connect middleware to handle GET and POST HTTP requests
app.use('/public/', function(request, response){
    console.log("you are in the first app.use() function");
   // console.log("=======================your REQ is: " + request.method);
    var my_path = url.parse(request.url).pathname;
    console.log(path.join(url.parse(request.url).pathname, "This is the requested path"));
    console.log("The full path is ---");
    var fullPath = path.join(process.cwd(), my_path);
    console.log(fullPath);

    //check for request method for either a GET or a POST
    if(request.method == 'POST'){
        console.log("*****************************" + request.body.page_name);
        //Check the value of page_name to determine where the post request came from
        //-- this forks which table gets queried.
        if(request.body.page_name == "pastProjects"){
            try{
                pastProjectsQuery(response);
            }
            catch (e){
                console.log("SOMETHING IS UP WITH YOUR pastProjects POST.");
            }
        }
        else{
            try{
                currentWorkQuery(response);
            }
            catch (e){
                console.log("SOMETHING IS UP WITH YOUR currentWork POST.");
            }
        }
    }
    else{
        try{
            stats = fileSys.lstatSync(fullPath);
            if(stats.isDirectory()){
                response.writeHeader(404, {"Content-Type": "text/plain"});
                response.write("404 Not Found\n");
                response.end();
            }
            else{
                fileSys.readFile(fullPath, "binary", function(err, file){
                    if(err){
                        response.writeHeader(500, {"Content-Type": "text/plain"});
                        response.write(err + "\n");
                        response.end();
                    }
                    else{
                        if(fullPath == "/app/assets/StyleSheets/myStyle.css"){
                            response.writeHeader(200, {"Content-Type": "text/css"});
                            response.write(file, "binary");
                            response.end();
                        }
                        else if(fullPath =="/app/assets/StyleSheets/myStyleSmall.css"){
                            response.writeHeader(200, {"Content-Type": "text/css"});
                            response.write(file, "binary");
                            response.end();
                        }
                        else if(fullPath =="/app/assets/StyleSheets/landscapeMobile.css"){
                            response.writeHeader(200, {"Content-Type": "text/css"});
                            response.write(file, "binary");
                            response.end();
                        }
                        else{
                            response.writeHeader(200);
                            response.write(file, "binary");
                            response.end();
                        }
                    }
                });
            }
        }
        catch (e){
            console.log("Something is horribly wrong!");
        }
    }
});

//This use function uses the connect middleware to fetch the requested WebFrame.html file
app.use('/', function(request, response){
    console.log("you are in the second app.use() function");
    console.log("=======================your REQ is: " + request.method);
    var fullPath = path.join(process.cwd(), htmlPath);
    console.log("The full path is:");
    console.log(fullPath);
    try{
        stats = fileSys.lstatSync(fullPath);
        if(stats.isDirectory()){
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
        }
        else{
            fileSys.readFile(fullPath, "binary", function(err, file){
                if(err){
                    response.writeHeader(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                }
                else{
                    response.writeHeader(200);
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    }
    catch (e){
        console.log("If you are reading this, you have bigger problems.");
    }
});
my_http.createServer(app).listen(port);
console.log('Connected via port ' + port);


/*
This function builds a table dynamically using the values returned in the query of projects.pastProjects
 */
function buildTable(pNames, pDesc){
    var myTable = "<table class=\"projectsTable\"><tr><th class=\"pHeader\">Project Name</th>";
    myTable+= "<th class=\"pHeader\">Project Description</th></tr>";

    if(pNames.length == pDesc.length){
        for(var i = 0; i < pNames.length; i++){
            myTable+= "<tr><td class=\"pData\">" + pNames[i]+ "</td><td class=\"pData\">" + pDesc[i] + "</td></tr>";
        }
    }
    else if(pNames.length == 0){
        console.log("SOMETHING IS UP WITH OUR DATABASE READ IN");
    }
    else{
        //console.log("table arrays aren't the same length.")
    }
    myTable+= "</table>";
    return myTable;
}

/*
This function connects to heroku postgres and runs a query to fetch data from projects.pastProjects
 */
function pastProjectsQuery(response){
    //Connects to DATABASE_URL (heroku postgreSQL database)
    var connectionString = "postgres://xppbneritkkeqc:ORqdupmaW39VMbGad0hzgZVC-i@ec2-54-225-201-25.compute-1.amazonaws.com:5432/d34n1n2r66gvkb";

    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        console.log('Connected to postgres! Getting schemas...');

        var projNames = [];
        var projDesc = [];

        //perform queries
        var nameQuery = client.query('SELECT projname FROM projects.pastProjects;');
        //store query results in array variables
        nameQuery.on('row', function(row) {
            projNames.push(row['projname']);

        });
        nameQuery.on('end',function(result){
            var descQuery = client.query('SELECT projdesc FROM projects.pastProjects;');
            descQuery.on('row', function(row) {
                projDesc.push(row['projdesc']);

            });
            descQuery.on('end', function(result){
                /*
                 console.log('=============this is your project name: ' + projNames[0]);
                 console.log('=============this is your project description: ' + projDesc[0]);
                 console.log('=============this is your project name: ' + projNames[1]);
                 console.log('=============this is your project description: ' + projDesc[1]);
                 */
                //Build the table from the arrays containing the database data
                var tableComplete = buildTable(projNames, projDesc);
                response.writeHeader(200, {'Content-type': 'application/json' });
                response.end(JSON.stringify(tableComplete));
            });
        });
    });
}

/*
 This function connects to heroku postgres and runs a query to fetch data from projects.currentWork
 */
function currentWorkQuery(response){
    //Connects to DATABASE_URL (heroku postgreSQL database)
    var connectionString = "postgres://xppbneritkkeqc:ORqdupmaW39VMbGad0hzgZVC-i@ec2-54-225-201-25.compute-1.amazonaws.com:5432/d34n1n2r66gvkb";

    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        console.log('Connected to postgres! Getting schemas...');

        var cwSummary = [];

        //perform queries
        var summaryQuery = client.query('SELECT summary FROM projects.currentWork;');
        //store query results in array variables
        summaryQuery.on('row', function(row) {
            cwSummary.push(row['summary']);

        });
        summaryQuery.on('end',function(result){
            response.writeHeader(200, {'Content-type': 'application/json' });
            response.end(JSON.stringify(cwSummary));
        });
    });
}