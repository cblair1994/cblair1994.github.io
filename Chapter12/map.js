"use strict";
function setUpPage(){
	var e=document.querySelectorAll("#room div");
	zIndexCounter=e.length+1;
	for(var t=0;t<e.length;t++){
		e[t].style.msTouchAction="none";
		e[t].style.touchAction="none";
		if(e[t].addEventListener){
			e[t].addEventListener("mousedown",startDrag,false);
			e[t].addEventListener("touchstart",startDrag,false);
			e[t].addEventListener("mspointerdown",startDrag,false);
			e[t].addEventListener("pointerdown",startDrag,false)
		}
		else if(e[t].attachEvent){
			e[t].attachEvent("onmousedown",startDrag)
		}
	}
	document.querySelector("nav ul li:first-of-type").addEventListener("click",loadSetup,false);
	document.querySelector("nav ul li:last-of-type").addEventListener("click",loadDirections,false)
}

function startDrag(e){
	this.style.zIndex=zIndexCounter;zIndexCounter++;
	if(e.type!=="mousedown"){
		e.preventDefault();
		this.addEventListener("touchmove",moveDrag,false);
		this.addEventListener("mspointermove",moveDrag,false);
		this.addEventListener("pointermove",moveDrag,false);
		this.addEventListener("touchend",removeTouchListener,false);
		this.addEventListener("mspointerup",removeTouchListener,false);
		this.addEventListener("pointerup",removeTouchListener,false)
	}
	else{
		this.addEventListener("mousemove",moveDrag,false);
		this.addEventListener("mouseup",removeDragListener,false)
	}
	pos=[this.offsetLeft,this.offsetTop];
	origin=getCoords(e)
}

function moveDrag(e){
	var t=getCoords(e);
	var n=t[0]-origin[0];
	var r=t[1]-origin[1];
	this.style.left=pos[0]+n+"px";
	this.style.top=pos[1]+r+"px"
}
	
function getCoords(e){
	var t=[];
	if(e.targetTouches&&e.targetTouches.length){
		var n=e.targetTouches[0];
		t[0]=n.clientX;t[1]=n.clientY
	}
	else{
		t[0]=e.clientX;
		t[1]=e.clientY
	}
	return t
}

function removeDragListener(){
	this.removeEventListener("mousemove",moveDrag,false);
	this.removeEventListener("mouseup",removeDragListener,false)
}

function removeTouchListener(){
	this.removeEventListener("touchmove",moveDrag,false);
	this.removeEventListener("mspointermove",moveDrag,false);
	this.removeEventListener("pointermove",moveDrag,false);
	this.removeEventListener("touchend",removeTouchListener,false);
	this.removeEventListener("mspointerup",removeTouchListener,false);
	this.removeEventListener("pointerup",removeTouchListener,false)
}

function loadSetup(){
	document.querySelector("nav ul li:first-of-type").className="current";
	document.querySelector("nav ul li:last-of-type").className="";
	document.getElementById("setup").style.display="block";
	document.getElementById("location").style.display="none";
}

function loadDirections(){
	document.querySelector("nav ul li:first-of-type").className="";
	document.querySelector("nav ul li:last-of-type").className="current";
	document.getElementById("setup").style.display="none";
	document.getElementById("location").style.display="block";
	if(typeof google!=="object"){
		var e=document.createElement("script");
		e.src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=geoTest";
		document.body.appendChild(e)
	}
}

function geoTest(){
	waitForUser=setTimeout(fail,1e4);
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(createDirections,fail,{timeout:1e4})
	}
	else{
		fail()
	}
}

function createDirections(e){
	clearTimeout(waitForUser);
	var t=e.coords.latitude;
	var n=e.coords.longitude;
	var r={center:new google.maps.LatLng(t,n),zoom:11};
	var i=new google.maps.Map(document.getElementById("map"),r);
}

function fail(){
	document.getElementById("map").innerHTML="Unable to access your current location.";
}

var zIndexCounter;
var pos=[];
var origin;
var waitForUser;
if(window.addEventListener){
	window.addEventListener("load",setUpPage,false)
}