// Niklas Magnusson, 8/6 2015, niklasmagnusson123@gmail.com
// Flickr Picture Game arbetsprov
//
// JavaScript Document
//---------------------------------------------------
//  JS Class to search for a picture with flickrs REST API
//---------------------------------------------------
var FlickrRequest = function() {
	self = this;
	this.picArray = [];
}
//Function to search for a picture(tag) equal to the given parameter
FlickrRequest.prototype.searchForPic = function(s) {
	FlickrRequest.call(this);
	//Empty the array to avoid old pics
	self.picArray.splice(0, self.picArray.length);
	var xmlhttp = new XMLHttpRequest();
	//url containing my api key to flickr
	var url="https://api.flickr.com/services/rest/?method=flickr.photos.search&text="
	+escape(s)+"&per_page=20&api_key=e4250121b37f5a01ae17b9c9a784f2fc&secret=fb59db20999c2533";
	xmlhttp.open("GET",url,false);
	xmlhttp.send();
	//if the responce containing more then 1 pic, push url into array
	if (xmlhttp.responseXML.getElementsByTagName("photo").length > 0){
		var xmlDoc = xmlhttp.responseXML;
		for (i = 0; i < xmlDoc.getElementsByTagName("photo").length; i++) {
			var photo = xmlDoc.getElementsByTagName("photo")[i];
			var picId = photo.getAttributeNode('id').nodeValue;
			var farm = photo.getAttributeNode('farm').nodeValue;
			var server = photo.getAttributeNode('server').nodeValue;
			var secret = photo.getAttributeNode('secret').nodeValue;
	    	self.picArray.push("http://farm"+farm+".static.flickr.com/"+server+"/"+picId+"_"+secret+"_z.jpg");
		}
	}
	return self.picArray;
}