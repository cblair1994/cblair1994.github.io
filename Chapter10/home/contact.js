/*
	CIS166AA: Book Blog
	Author: Chelsea Blair
	Date: 2/25/2017
*/

function insertPlaceholders()
	  {
         if (!Modernizr.input.placeholder)
		 {
            document.getElementById("fname").value = "First Name";
            document.getElementById("lname").value = "Last Name";
            document.getElementById("userEmail").value = "address@example.com";
            
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
var userInfo = {};
var objectString;
var arrayString;
var genreInfo = [];
var fnameValid = false;
var lnameValid = false;
var emailValid = false;

function validateFname() {
	var fNameInput = document.getElementById("fname");
	var errorMsg = document.getElementById("errorMsg");
	
	try{
		if (fNameInput.value === "") //check for empty first name field
			throw "Please tell us your first name";
		
		//add first name to userInfo object
		userInfo.firstName = fNameInput.value;
		//set fnameValid to true
		fnameValid = true;
		//remove input styling
		fNameInput.style.background = "";
	}
	catch (msg) {
		//display error message
		errorMsg.innerHTML = msg;
		errorMsg.style.display = "block";
		fNameInput.style.background = "rgb(255,233,233)";
		fnameValid = false;
		delete userInfo['firstName']; //delete firstName from userInfo object
	}
}

function validateLname() {
	var lNameInput = document.getElementById("lname");
	var errorMsg = document.getElementById("errorMsg");
	
	try{
		if (lNameInput.value === "") //check for empty first name field
			throw "Please tell us your last name";
		
		//add last name to userInfo object
		userInfo.lastName = lNameInput.value;	
		//set lnameValid to true
		lnameValid = true;
		//remove input styling
		lNameInput.style.background = "";
	}
	catch (msg) {
		//display error message
		errorMsg.innerHTML = msg;
		errorMsg.style.display = "block";
		lNameInput.style.background = "rgb(255,233,233)";
		lnameValid = false;
		delete userInfo['lastName']; //delete last name from userInfo object
	}
}

//validates email address for proper formatting
function validateEmail() {
	var emailInput = document.getElementById("userEmail");
   var errorMsg = document.getElementById("errorMsg");
   var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
   
   try {

	if (emailCheck.test(emailInput.value) === false) {
	   throw "Please provide a valid email address";
   }

      // convert email address to lowercase
	emailInput.value = emailInput.value.toLowerCase();
	  // copy valid email value to profile object
	userInfo.email = emailInput.value;
	//set emailValid to true	
	emailValid = true;
	//remove input styling
	emailInput.style.background = "";
   }
   catch(msg) {
		// display error message
		errorMsg.innerHTML = msg;
		errorMsg.style.display = "block";
		// change input style
		emailInput.style.background = "rgb(255,233,233)";
		emailValid = false; //set emailValid to false
		delete userInfo['email']; //delete email from userInfo object
   }
}

//handle checkbox activity, add to langInfo array if checked, remove if unchecked
function registerInfo(event) {
	if (event === undefined) { //get caller element in IE8
		event = window.event;
	}
	var callerElement = event.target || event.srcElement;
	var infoName = callerElement.value;
	
	if (callerElement.checked) { //when box is checked
		genreInfo.push(infoName); //add checkbox value to infoName array
	}
	else { //if checkbox is unchecked
		for (var i = 0; i < langInfo.length; i++) {
			if (callerElement.value === genreInfo[i]){
				genreInfo.splice(i, 1);
				
				break;
			}
		}
	}
}

//convert info to string
function convertToString() {
	arrayString = genreInfo.toString();
	objectString = JSON.stringify(userInfo);
}

function displayInfo() {
	document.getElementById("infoDisplay").style.display = "block";
	var fnameDisplay = document.getElementById("firstName");
	var lnameDisplay = document.getElementById("lastName");
	var emailDisplay = document.getElementById("emailString");
	var infoDisplay = document.getElementById("infoString");
	
	fnameDisplay.innerHTML = "First Name: " + userInfo.firstName;
	lnameDisplay.innerHTML = "Last Name: " + userInfo.lastName;
	emailDisplay.innerHTML = "Email: " + userInfo.email;
	infoDisplay.innerHTML = "Favorite Genres: "
	
	for (var i = 0; i < genreInfo.length; i++) {
		infoDisplay.innerHTML += genreInfo[i].toString() + ", ";
	}
}

//this runs when the submit button is clicked
function submitInfo() {
	document.getElementById("infoDisplay").style.display = "none"; //hide infoDisplay until info is validated
	
	//run validation functions
	validateFname();
	validateLname();
	validateEmail();
	//convert object/array to strings
	convertToString();
	
	//if info validates, display info collected
	if ((emailValid === true)  && (fnameValid === true) && (lnameValid === true)){
		document.getElementById("errorMsg").style.display = "none";
		displayInfo();
	}
}

//create event listeners for the page
function createEventListeners() {
	var emailInput = document.getElementById("userEmail");
	var fNameInput = document.getElementById("fname");
	var lNameInput = document.getElementById("lname");
	if (emailInput.addEventListener) {
		fNameInput.addEventListener("change", validateFname, false);
		lNameInput.addEventListener("change", validateLname, false);
		emailInput.addEventListener("change", validateEmail, false);
	} else if (emailInput.attachEvent) {
		emailInput.attachEvent("onchange", validateEmail);
		fNameInput.attachEvent("onchange", validateFname);
		lNameInput.attachEvent("onchange", validateLname);
	}
	
	var submit = document.getElementById("submitBtn")
	if (submit.addEventListener){
		submit.addEventListener("click", submitInfo, false);
	}else if (submit.attachEvent){
		submit.attachEvent("onclick", submitInfo);
	}
	
	var genres = document.getElementsByName("favGenre");
   if (genres[0].addEventListener) {
      for (var i = 0; i < genres.length; i++) {
         genres[i].addEventListener("change", registerInfo, false);
      }
   } else if (genres[0].attachEvent) {
      for (var i = 0; i < genres.length; i++) {
         genres[i].attachEvent("onchange", registerInfo);
      }
   }
}

//run on page load (calls createEventListeners)
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}