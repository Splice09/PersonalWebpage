/*
 This Function makes a post request to the server, passing it the pageName function to identify it as
 a post request from the Past Projects section.

 The post request returns query values that are dynamically added to the HTML for page scalability.
 */
function getData(pageName){
    var posting = $.post("public/node_modules/server.js", {
        page_name: pageName
    },function(data){},"json");

    posting.done(function(data){
        $('.ppContent').html(data);
    });
    posting.fail(function(){
        alert("failed");
    });
}

/*
Calls the getData function when the page is ready.
 */
$(document).ready(function(){
    getData("pastProjects");
});