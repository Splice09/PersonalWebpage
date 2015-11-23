$(document).ready(function(){
    /*
     Listens for a blog page number to be clicked and then changes the content of current work to
     match the number clicked
     */
    $('.blogNumber').on("click", function(event){
        var numberID = event.target.id;
        //$('.cwContent').empty();
        alert(numberID);
        //$('.cwContent').html(blogArray[numberID]);
    });
});

