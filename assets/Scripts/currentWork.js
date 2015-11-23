var blogArray;

function getWorkData(pageName){
    var posting = $.post("public/node_modules/server.js", {
        page_name: pageName
    },function(data){},"json");

    posting.done(function(cdata){
        blogArray = cdata;
        $('.cwContent').html(cdata[0]);
        for(var i = 0; i < cdata.length; i++){
            var tempNum = i + 1;
            var tempString = "<p class=\"blogNumber\" id=\"" + i + "\">" + tempNum + "</p>";
            $('.numbersBox').html(tempString);
        }
    });
    posting.fail(function(){
        alert("failed");
    });
}

$(document).ready(function(){
    getWorkData("currentWork");
});
