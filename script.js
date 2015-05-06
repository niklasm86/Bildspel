var Main = {
	searchTxt : null,
	showGallery : false,

	init : function(){
		Main.initEventListeners();
	},
	
	initEventListeners : function(){
		document.getElementById('btn-submit').addEventListener('click', Main.newFlickrReq);
		document.getElementById('btn-add-gallery').addEventListener('click', Main.buildGallery);
		document.getElementById('btn-play-gallery').addEventListener('click', Main.playGallery);
		document.getElementById('btn-clear-gallery').addEventListener('click', Main.ClearGallery);
	},

	ClearGallery : function(){
		var gallDiv = document.getElementById('GalleryDiv');
		Main.disposePicsFromDiv(gallDiv);
	},

	newFlickrReq : function(){
		if (Main.hasClass(document.getElementById('GalleryDiv'),'show-gallery-pic')) document.getElementById('GalleryDiv').removeAttribute('class', 'GalleryDiv');
		Main.disposeGalleryPics();
		Main.disposePicsFromDiv(document.getElementById("imageDiv"));
		Main.searchTxt = document.getElementById("search-txt").value;
		Main.buildPics(FlickrRequest.searchForPic(Main.searchTxt));
	},

	buildPics : function(picsArray){
		for (i = 0; i < picsArray.length; i++) {
			var img = document.createElement("IMG");
			img.setAttribute('src', picsArray[i]);
			img.setAttribute('class', 'medium-image');
			document.getElementById("imageDiv").appendChild(img);
			img.addEventListener('click', Main.toggleChoosenPic);
		}
	},

	disposePicsFromDiv : function(images){
		while (images.firstChild) {
    		images.removeChild(images.firstChild);
		}
	},

	toggleChoosenPic : function(){
		if(!Main.hasClass(this.parentNode, 'Gallery')){
			if(Main.hasClass(this, 'addImg')){
				this.removeAttribute('class', 'addImg');
				this.setAttribute('class', 'medium-image');
			}
			else{
				this.setAttribute('class', 'addImg');
			}
		}
		else{
			if(!Main.hasClass(this, 'expand-single-gallery-pic') && Main.showGallery == true){
				Main.minimizeAllPicsIsGallery();
				this.setAttribute('class', 'expand-single-gallery-pic');
			}
			else{
				this.setAttribute('class', 'medium-image');
			}
		}
		
	},

	minimizeAllPicsIsGallery : function(){
		var gal = document.getElementById('GalleryDiv').children;
		for (i = 0; i < gal.length; i++) {
			gal[i].setAttribute('class', 'medium-image');
		}
	},

	hasClass : function(element, className){
    	return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
	},

	buildGallery : function(){
		var array = document.getElementsByClassName('addImg');
			for (i = 0; i < array.length; i++) {
				Main.addImgToGallery(array[i]);
			}
	},

	addImgToGallery : function(imgas){
		document.getElementById("GalleryDiv").appendChild(imgas);
	},

	disposeGalleryPics : function(){
		var imageDiv = document.getElementById('imageDiv');
		while (imageDiv.firstChild) {
    		imageDiv.removeChild(imageDiv.firstChild);
		}
		
	},

	playGallery : function(){
		Main.showGallery = true;
		document.getElementById('GalleryDiv').setAttribute('class', 'show-gallery-pic Gallery');
		Main.disposeGalleryPics();
	},

}

addEventListener("load", Main.init);