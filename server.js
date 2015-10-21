var connect = require("connect"),
my_http = require("http"),
path = require("path"),
url = require("url"),
fileSys = require("fs"),
app = connect(),
port = process.env.PORT || 5000,
stats,
htmlPath = "WebFrame.html",
pg = require('pg');


//This function uses the connect middleware to fetch the requested .css files or .js files
app.use('/public/', function(request, response){
    console.log("you are in the first app.use() function");
    var my_path = url.parse(request.url).pathname;
    console.log(path.join(url.parse(request.url).pathname, "This is the requested path"));
    console.log("The full path is ---")
    var fullPath = path.join(process.cwd(), my_path);
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
                        console.log("if we got this far, Kayla is awesome!");
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
        console.log("yo shit is broke mang forreal");
    }
});
//This use function uses the connect middleware to fetch the requested WebFrame.html file
app.use('/', function(request, response){
    console.log("you are in the second app.use() function");
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
        console.log("yo shit is broke mang");
    }
});
my_http.createServer(app).listen(port);
console.log('Connected via port ' + port);
