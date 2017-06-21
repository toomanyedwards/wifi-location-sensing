

/** Initialization on page load */
$(window).load(function(){ 

    // Prevent reload on form submit
    $("form").on("submit", function (e) {
        e.preventDefault();
    });

    var socket = io();

    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, document.body.scrollHeight);
    });


    $("#clearButton").click(function(){
        $('ul').empty();
    });

    $("#pauseResumeButton").click(function(){
        if( $('#pauseResumeButton').text() == "Pause" ){
            $('#pauseResumeButton').html("Resume");
            var socket = io();

            socket.removeAllListeners("chat message");
        }
        else {
            $('#pauseResumeButton').html("Pause");

            var socket = io();
             socket.on('chat message', function(msg){
                $('#messages').append($('<li>').text(msg));
                window.scrollTo(0, document.body.scrollHeight);
                });
        }
        
        
    });
}); 
