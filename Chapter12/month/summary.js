/* 
    Author: Chelsea Blair
    Date:   5/1/2017

    Filename: summary.js
	
	for my jquery
*/

function display(event) {
   $(event.currentTarget).next().fadeIn("slow");
}

$("h3").click(display);