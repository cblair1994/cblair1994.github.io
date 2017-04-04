/*
	CIS166AA: Book Blog
	Author: Chelsea Blair
	Date: 2/25/2017
*/

function insertPlaceholders()
	  {
         if (!Modernizr.input.placeholder)
		 {
            document.getElementById("nameinput").value = "first and last name";
            document.getElementById("emailinput").value = "address@example.com";
            
         }
      }
      if (window.addEventListener)
	  {
         window.addEventListener("load", insertPlaceholders, false);
      } 
	  else if (window.attachEvent)
	  {
         window.attachEvent("onload", insertPlaceholders);
      } 

/*
	this function is used to make sure that the user had
	filled out the form.
	if not it will tell the user what they missed.
*/	  
function validateContactInfo()
{	
	var userName;
	var userEmail;
	
	var formValidity = true;
	userName = document.getElementById("nameinput").value;
	userEmail = document.getElementById("emailinput").value;
	
	try
	{
		if(userName.length == 0)
		{
			throw alert("Please enter your name.");
			formValidity = false;
		}
		if(userEmail.length == 0)
		{
			throw alert("Please enter your email.");
			formValidity = false;
		}
		if(userBook.length == 0)
		{
			throw alert("Please enter your book. ");
			formValidity = false;
		}		
	}
	catch(error)
	{
		document.getElementById("message").innerHTML = "warning: " + error.message;
		formValidity = false;
	}
}

//Favorite Geners array
var genres = [];
var arrayString;
var objectString;

function registerGenre(event) {
   if (event === undefined) { // get caller element in IE8
      event = window.event;
   }
   var callerElement = event.target || event.srcElement;
   var genreName = callerElement.value;
   if (callerElement.checked) { // if box has just been checked
      // add checkbox value to genres array
      genres.push(genreName);
   } 
   else { // if box has just been unchecked
      for (var i = 0; i < listItems.length; i++) {
         if (listItems[i].innerHTML === genreName) {
            // remove element at index i from array
            genres.splice(i, 1); 
            break;
         }
      }
   }
}

function createEventListeners() {
   var unInput = document.getElementById("nameinput");
   var emailInput = document.getElementById("emailinput");
   if (unInput.addEventListener) {
      unInput.addEventListener("change", validateContactInfo, false);  
      emailInput.addEventListener("change", validateContactInfo, false); 
   } else if (unInput.attachEvent) {
      unInput.attachEvent("onchange", validateContactInfo);
      emailInput.attachEvent("onchange", validateContactInfo);
   }	
	
   var favGenre = document.getElementsByName("favGenre");
   if (favGenre[0].addEventListener) {
      for (var i = 0; i < favGenre.length; i++) {
         lodgings[i].addEventListener("change", registerGenre, false);
      }
   } 
   else if (favGenre[0].attachEvent) {
      for (var i = 0; i < favGenre.length; i++) {
         favGenre[i].attachEvent("onchange", registerGenre);
      }
   } 
}

if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}