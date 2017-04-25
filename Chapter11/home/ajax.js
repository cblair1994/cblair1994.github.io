var pageCounter = 1;
var bookContainer = document.getElementById("book-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://cblair1994.github.io/JSON/books-' + pageCounter +'.json');

	ourRequest.onload = function() {
	var ourData = JSON.parse(ourRequest.responseText);
	renderHTML(ourData);
	
	};

	ourRequest.send();
	pageCounter++;
	if(pageCounter > 2){
		btn.classList.add("hide-me");
	}
});

function renderHTML(data){
	var htmlString = "";
	
	for(i = 0; i < data.length; i++)
	{
		htmlString += "<p>The book title is " + data[i].title 
			+ ", the author's name is " + data[i].author 
			+ " and the genre is " + data[i].genre + ".</p>";
	}
	
	bookContainer.insertAdjacentHTML('beforeend', htmlString);
}