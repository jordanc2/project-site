var isMobile = {
Android: function () {
	return navigator.userAgent.match(/Android/i);
}, BlackBerry: function () {
	return navigator.userAgent.match(/BlackBerry/i);
}, iOS: function () {
	return navigator.userAgent.match(/iPhone|iPad|iPod/i);
}, Opera: function () {
	return navigator.userAgent.match(/Opera Mini/i);
}, Windows: function () {
	return navigator.userAgent.match(/IEMobile/i);
}, any: function () {
	return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
}};



//When the page is fully loaded, invoke the function to setup our page interactions
$(document).ready(function () {
	if (isMobile.any()) {
		var css = $("<link></link>");
		css.attr("rel","stylesheet");
		css.attr("href","css/mobile.css");
		$("head").append(css);
	}

	$("#menu").click(function () {
		$("nav").toggleClass("shown");
	});
	
	$("nav > a").click(function() {
		$("nav").toggleClass("shown");
	});
	
	//remember the last this we swiped in, so we can swipe it out later. This is initially #page1
	var lastOnscreen = $("#page1");
	//When we click on any of the nav links, invoke the function
	$("nav > a").click(function () {
		$("nav").removeClass("shown");
		//whatever we last swiped in, swipe it out
		lastOnscreen.removeClass("onscreen");
		//remember: $(this) is the element that the current event (click) is for
		var page = $(this).attr("href");
		//remember is this is the first page since it is a bit different than the others
		var skipBlock = page === "#page1";
		//Crazy! Since the string value of the variable page looks like a selector, use it as a selector
		page = $(page);
		//swipe this element in
		page.addClass("onscreen");
		//if the swiped in element is not the first page, do this code
		if (!skipBlock) {
			//You've got to think 4th dimensionally, Marty! Schedule this function to execute after
			//the swipe in completes.
			setTimeout(function () {
				//swipe out what we just swiped in (the image)
				page.removeClass("onscreen");
				//get the div that follows the image and swipe it in (the text)
				page.next(".block").addClass("onscreen");
				//remember the last thing we swiped in so we can swipe it out on the next click
				lastOnscreen = page.next(".block");
			}, 700);
		} else {
			lastOnscreen = page;
		}
		//since we clicked on a link (<a> tag), we have to prevent the link from being followed.
		return false;
	});

	$("#contact + .block a, #contact + .block > div > div").hover(function() {
		$(this).find("img").addClass("enlarge");
	}, function() {
		$(this).find("img").removeClass("enlarge");
	});
		
});
