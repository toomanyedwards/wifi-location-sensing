// Constants

// Location area size in pixels
const LOCATION_AREA_HEIGHT_IN_PIXELS = 600;
const LOCATION_AREA_WIDTH_IN_PIXELS = 1200;

// Scaling factor to convert location area pixels to meters
const LOCATION_AREA_HEIGHT_PIXELS_TO_METERS_SCALING_FACTOR = .01


/* Initialization on page load */
$(window).load(function(){ 
        console.log(
            "Setting location area to: " + LOCATION_AREA_HEIGHT_IN_PIXELS + " pixels by " +
            LOCATION_AREA_WIDTH_IN_PIXELS + " pixels"
        );

        $(".container").width(LOCATION_AREA_WIDTH_IN_PIXELS);

        $(".wifiLocationArea").height(LOCATION_AREA_HEIGHT_IN_PIXELS);
        $(".wifiLocationArea").width(LOCATION_AREA_WIDTH_IN_PIXELS);
        
 
		console.log('foo')
   });

   

 function test2() {
     eqdqdq
     console.log('hello');
     alert('test');
 }

 function main()
{
	var canvas = document.getElementById("mainCanvas");
	var ctx=canvas.getContext("2d");
	ctx.fillStyle="#FF0000";
	ctx.fillRect(0,0,150,75);
	
	console.log("Drew rectangle");
}