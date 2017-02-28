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
            document.getElementById("bookinput").value = "Twilight by Stephenie Meyers";
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
	var userBook;
	userName = document.getElementById("nameinput").value;
	userEmail = document.getElementById("emailinput").value;
	userBook = document.getElementById("bookinput").value;
	try
	{
		if(userName.length == 0)
		{
			throw alert("Please enter your name.");
		}
		if(userEmail.length == 0)
		{
			throw alert("Please enter your email.");
		}
		if(userBook.length == 0)
		{
			throw alert("Please enter your book. ");
		}		
	}
	catch(error)
	{
		document.getElementById("message").innerHTML = "warning: " + error.message;
	}
}