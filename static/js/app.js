// Constants

// Location area size in pixels
const LOCATION_AREA_HEIGHT_IN_PIXELS = 600;
const LOCATION_AREA_WIDTH_IN_PIXELS = 1200;

// Scaling factor to convert location area pixels to meters
const LOCATION_AREA_HEIGHT_PIXELS_TO_METERS_SCALING_FACTOR = 100.0;

/*
$("form").on("submit", function (e) {
    e.preventDefault();
})
*/

/** Initialization on page load */
$(window).load(function(){ 
        
        // Clear location area button click handler
        $("#clearLocationAreaButton").click(function(){
            clearMobileDevices();
        });

        // Inject message button click handler
        $("#injectMessageButton").click(function(){

            addMobileDevice();
        }); 

        /* Prevent form submit from reloading document */
        $("form").on("submit", function (e) {
            e.preventDefault();
        });

        console.log(
            "Setting location area to: " + LOCATION_AREA_HEIGHT_IN_PIXELS + " pixels by " +
            LOCATION_AREA_WIDTH_IN_PIXELS + " pixels"
        );

        $(".container").width(LOCATION_AREA_WIDTH_IN_PIXELS);

        // Set the wifi location area size in pixels
        $(".wifiLocationArea").height(LOCATION_AREA_HEIGHT_IN_PIXELS);
        $(".wifiLocationArea").width(LOCATION_AREA_WIDTH_IN_PIXELS);

   });

/** Remove mobile devices displayed in the location area */
function addMobileDevice(){
    $( ".wifiLocationArea" ).append( "<div>Hello<divc>" );
}

/** Remove mobile devices displayed in the location area */
function clearMobileDevices(){
    alert("oo");
    $("#mobileDevice").remove();
}