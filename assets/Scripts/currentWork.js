function getWorkData(pageName){
    var posting = $.post("public/node_modules/server.js", {
        page_name: pageName
    },function(data){},"json");

    posting.done(function(cdata){
        alert(cdata[0]);
    });
    posting.fail(function(){
        alert("failed");
    });
}

$(document).ready(function(){
    getWorkData("currentWork");
});
