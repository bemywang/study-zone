$(document).ready(function() {

    // silder value
    var sliders = $(".slider");
    sliders.val(0);


    // audio files
    const audioFiles = {
        "cafe-section": "audio/cafe.mp3",
        "rain-section": "audio/rain.mp3",
        "fire-section": "audio/fire.mp3",
        "temple-section": "audio/temple.mp3"
    };
    // make sure html has audio corresponding element
    const audioElements = {};
    for (var key in audioFiles) {
        if (audioFiles.hasOwnProperty(key)) {
            var audio = new Audio(audioFiles[key]);
            audio.loop = true; //continuous playback
            audioElements[key] = audio;
        }
    }
    //console.log(audioElements);
    
    // when drag slider bar: 
    sliders.on("input", function() {
        //slider value 
        var value = $(this).val();
        // **** opacity *****
        var opacity1 = 0.8;
        var opacity2 = 1;
        // get the corresponding section
        var section = $(this).parent();

        if ((value / 100) > 0.5) {
            section.css("opacity", opacity2);
        } else if ((value / 100) > 0) {
            section.css("opacity", opacity1);
        } else {
            section.css("opacity", 0.3)
        }


        // Get the corresponding section's identifier: cafe, fire, rain, temple
        var sectionId = section.attr("class").split(" ")[0];

        // track user interaction, starting false
        var isUserInteracted = false;



        // power volume and make sure btw 0 and 1
        const volume = Math.pow(value, 1.05) / 100;
        // Math.min Math.max ensure 0-1
        audioElements[sectionId].volume = Math.min(Math.max(volume, 0), 1);

        if (!isUserInteracted && volume > 0) {
            audioElements[sectionId].play();
            isUserInteracted = true;
        }  else {
            audioElements[sectionId].pause();
        }

    });



});