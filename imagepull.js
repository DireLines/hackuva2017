//imagepull.js

$(document).ready(function() {
    years_array = new Array(16)
    images_array = new Array(16)
    count = 0;
    
    for (query_date = 1850; query_date < 2010; query_date += 10) {
   	 $.ajax({
   		 url: "http://loc.gov/pictures/search",
   		 dataType: "JSONP",
   		 data: {
   			 fo: 'json',
   			 c: 50,
   			 q: query_date + Math.floor(Math.random()*10)
   		 },
   		 success: function(data) {
   			 years_array[Math.floor(data.search.query/10)-185] = data;
   			 console.log(years_array);
   			 count++;
   		 }
   	 });
    }
    
    
    (function ($) {
   	 $.fn.load_images = function(decade){
   		 set = years_array[(decade-1850)/10]
   		 found = new Array();
   		 
   		 set.results.forEach(function(item) {
   		 	//console.log(found);
   			 //console.log(item.image.full);
   			 if(item.created_published_date.indexOf(set.search.query) !== -1 &&
   			 item.image.full.indexOf("jpg") !== -1) {
   				 found.push(item.image.full);
   				console.log(found);
   			 }
   		 });
   		 
   		 return found;
   	 };
    })(jQuery);
});
