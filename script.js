// Niklas Magnusson, 8/6 2015, niklasmagnusson123@gmail.com
// Flickr Picture Game arbetsprov
//
// JavaScript Document
//---------------------------------------------------
//  Mainclass for the flickr picture gallery
//---------------------------------------------------
var Main = {
	searchTxt : null,
	showGallery : false,
	flikrReq : new FlickrRequest(),

	init : function(){
		Main.initEventListeners();
	},

	//init event listeners
	initEventListeners : function(){
		document.getElementById('btn-submit').addEventListener('click', Main.newFlickrReq);
		document.getElementById('btn-add-gallery').addEventListener('click', Main.buildGallery);
		document.getElementById('btn-play-gallery').addEventListener('click', Main.playGallery);
		document.getElementById('btn-clear-gallery').addEventListener('click', Main.ClearGallery);
	},

	//Clear gallery pictures
	ClearGallery : function(){
		var gallDiv = document.getElementById('GalleryDiv');
		Main.disposePicsFromDiv(gallDiv);
	},

	//removes old pictures from "imageDiv" and makes a new flickr request
	newFlickrReq : function(){
		if (Main.hasClass(document.getElementById('GalleryDiv'),'show-gallery-pic')) document.getElementById('GalleryDiv').removeAttribute('class', 'GalleryDiv');
		Main.disposeGalleryPics();
		Main.disposePicsFromDiv(document.getElementById("imageDiv"));
		Main.searchTxt = document.getElementById("search-txt").value;
		Main.buildPics(Main.flikrReq.searchForPic(Main.searchTxt));
	},

	//function to remove the pictires from "imageDiv"
	disposePicsFromDiv : function(images){
		while (images.firstChild) {
    		images.removeChild(images.firstChild);
		}
	},

	//adds the result (the pictures) to the site, adding eventlistener (toggle size when clicked) to every picture
	buildPics : function(picsArray){
		for (i = 0; i < picsArray.length; i++) {
			var img = document.createElement("IMG");
			img.setAttribute('src', picsArray[i]);
			img.setAttribute('class', 'medium-image');
			document.getElementById("imageDiv").appendChild(img);
			img.addEventListener('click', Main.toggleChoosenPic);
		}
	},

	//Toggle the class for pictures when clicked
	toggleChoosenPic : function(){
		//if the picture clicked are inside the gallery (a choosen pic)
		if(!Main.hasClass(this.parentNode, 'Gallery')){
			if(Main.hasClass(this, 'addImg')){
				this.removeAttribute('class', 'addImg');
				this.setAttribute('class', 'medium-image');
			}
			else{
				this.setAttribute('class', 'addImg');
			}
		}
		//if the picture clicked are not inside the gallery
		else{
			//if i click a picture, minimize all others and enlarge it
			if(!Main.hasClass(this, 'expand-single-gallery-pic') && Main.showGallery == true){
				Main.minimizeAllPicsIsGallery();
				this.setAttribute('class', 'expand-single-gallery-pic');
			}
			else{
				this.setAttribute('class', 'medium-image');
			}
		}
		
	},

	//minimize all pictures
	minimizeAllPicsIsGallery : function(){
		var gal = document.getElementById('GalleryDiv').children;
		for (i = 0; i < gal.length; i++) {
			gal[i].setAttribute('class', 'medium-image');
		}
	},

	//My function to termen a class for an element
	hasClass : function(element, className){
    	return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
	},

	//get all the chossen pictures to add to the gallery
	buildGallery : function(){
		var array = document.getElementsByClassName('addImg');
			for (i = 0; i < array.length; i++) {
				Main.addImgToGallery(array[i]);
			}
	},

	//Puts the choosen pictures on site
	addImgToGallery : function(imgas){
		document.getElementById("GalleryDiv").appendChild(imgas);
	},

	//removes the gallery pictures
	disposeGalleryPics : function(){
		var imageDiv = document.getElementById('imageDiv');
		while (imageDiv.firstChild) {
    		imageDiv.removeChild(imageDiv.firstChild);
		}
		
	},

	//enables the gallery mode
	playGallery : function(){
		Main.showGallery = true;
		document.getElementById('GalleryDiv').setAttribute('class', 'show-gallery-pic Gallery');
		Main.disposeGalleryPics();
	},

}

addEventListener("load", Main.init);