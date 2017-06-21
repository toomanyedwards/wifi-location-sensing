

/** Initialization on page load */
$(window).load(function(){ 

    // Prevent reload on form submit
    $("form").on("submit", function (e) {
        e.preventDefault();
    });

    var socket = io();

    // Debug channel on mesage handler
    socket.on(DEBUG_CHANNEL_NAME, function(msg){
        // Add the debug message to the message list
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, document.body.scrollHeight);
    });


    // Clear button click handler
    $("#clearButton").click(function(){
        // Remove all elements from the debug message list
        $('ul').empty();
    });

    // Pause/Resume button click handler
    $("#pauseResumeButton").click(function(){
        if( $('#pauseResumeButton').text() == "Pause" ){
            // Switch the button text to "Resume"
            $('#pauseResumeButton').html("Resume");
            var socket = io();

            // Stop listening on the debug channel
            socket.removeAllListeners(DEBUG_CHANNEL_NAME);
        }
        else {
            // Switch the button text to "Pause"
            $('#pauseResumeButton').html("Pause");

            // Add the debug channel message handler back
            var socket = io();
            socket.on(DEBUG_CHANNEL_NAME, function(msg){
                $('#messages').append($('<li>').text(msg));
                window.scrollTo(0, document.body.scrollHeight);
                });
        }
        
        
    });
}); 
