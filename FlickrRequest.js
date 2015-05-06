// JavaScript Document
//---------------------------------------------------
//  JS Class to search for a picture with flickrs REST API
//---------------------------------------------------
var FlickrRequest = {
	xmlhttp : null,
	picArray : [],
	xmlDoc : null,

	searchForPic : function(s){
		FlickrRequest.picArray.splice(0, FlickrRequest.picArray.length);

		FlickrRequest.xmlhttp = new XMLHttpRequest();
		var url="https://api.flickr.com/services/rest/?method=flickr.photos.search&text="
		+escape(s)+"&per_page=20&api_key=e4250121b37f5a01ae17b9c9a784f2fc&secret=fb59db20999c2533";
		FlickrRequest.xmlhttp.open("GET",url,false);
		FlickrRequest.xmlhttp.send();

		if (FlickrRequest.xmlhttp.responseXML.getElementsByTagName("photo").length > 0){
			FlickrRequest.xmlDoc = FlickrRequest.xmlhttp.responseXML;
			for (i = 0; i < FlickrRequest.xmlDoc.getElementsByTagName("photo").length; i++) {
					var photo = FlickrRequest.xmlDoc.getElementsByTagName("photo")[i];
					var picId = photo.getAttributeNode('id').nodeValue;
					var farm = photo.getAttributeNode('farm').nodeValue;
					var server = photo.getAttributeNode('server').nodeValue;
					var secret = photo.getAttributeNode('secret').nodeValue;
			    	FlickrRequest.picArray.push("http://farm"+farm+".static.flickr.com/"+server+"/"+picId+"_"+secret+"_z.jpg");
			}
		}
		return FlickrRequest.picArray;


	}
}

