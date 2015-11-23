$(document).ready(function(){
    /*
     Listens for a blog page number to be clicked and then changes the content of current work to
     match the number clicked
     */
    var numberID = 0;
    $('.numbersBox').on("click", ".blogNumber", function(event){
        if(numberID != event.target.id){
            numberID = event.target.id;
            $('.cwContent').empty();
            $('.cwContent').html(blogArray[numberID]);
        }
        else{}
    });
});

