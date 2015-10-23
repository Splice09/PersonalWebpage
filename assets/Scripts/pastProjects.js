function getData(pageName){
    var posting = $.post("public/server.js", {
        page_name: pageName
    });

    posting.done(function(data){
        alert.(data);
    });
    posting.fail(function(){
        alert("failed");
    });
}

$(document).ready(function(){
    getData("pastProjects");
});