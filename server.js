var connect = require("connect"),
my_http = require("http"),
path = require("path"),
url = require("url"),
fileSys = require("fs"),
app = connect(),
port = process.env.PORT || 5000,
htmlPath = "WebFrame.html";

app.use('/', function(request, response){
    console.log("you are in the first app.use() function");
    var requestedPath = url.parse(request.url).pathname;
    console.log("The joined cwd and requested path is --");
    console.log(path.join(process.cwd(), requestedPath));
    if(request.url.length() > htmlPath.length()){
        var full_path = path.join(process.cwd(), requestedPath);
    }
    else{
        var full_path = path.join(process.cwd(), htmlPath);
    }
    path.exists(full_path,function(exists){
        if(!exists){
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
        }
        else{
            fileSys.readFile(full_path, "binary", function(err, file){
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
    });
});

app.use('/assets/', function(request, response){
    console.log("you are in the second app.use() function");
    var my_path = url.parse(request.url).pathname;
    console.log(path.join(url.parse(request.url).pathname, "This is the requested path"));
    var full_path = path.join(process.cwd(), my_path);
    console.log(path.join(full_path, "this is my full path."));
    path.exists(full_path,function(exists){
        if(!exists){
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
        }
        else{
            fileSys.readFile(full_path, "binary", function(err, file){
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
    });
});
my_http.createServer(app).listen(port);
console.log('Connected via port ' + port);