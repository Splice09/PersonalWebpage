var blogArray;

/*
This Function makes a post request to the server, passing it the pageName function to identify it as
a post request from the Current Work section.

The post request returns query values that are dynamically added to the HTML for page scalability.
 */
function getWorkData(pageName){
    var posting = $.post("public/node_modules/server.js", {
        page_name: pageName
    },function(data){},"json");

    posting.done(function(cdata){
        blogArray = cdata;
        $('.cwContent').html(cdata[0]);
        var tempString = "";
        for(var i = 0; i < cdata.length; i++){
            var tempNum = i + 1;
            tempString = tempString + "<p class=\"blogNumber\" id=\"" + i + "\">" + tempNum + "</p>";
        }
        $('.numbersBox').html(tempString);
    });
    posting.fail(function(){
        alert("failed");
    });
}

/*

 */
$(document).ready(function(){
    //Calls the getData function when the page is ready.
    getWorkData("currentWork");
});
