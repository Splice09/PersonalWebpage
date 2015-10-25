function getData(pageName){
    var posting = $.post("public/node_modules/server.js", {
        page_name: pageName
    },function(data){},"json");

    posting.done(function(data){
        alert(data);
    });
    posting.fail(function(){
        alert("failed");
    });
}

$(document).ready(function(){
    getData("currentWork");
});
