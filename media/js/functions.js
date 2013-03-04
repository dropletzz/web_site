// Global settings
_emaFeed = "http://ema.codiceplastico.com/atom.xml";
_aleFeed = "http://blog.codiceplastico.com/melkio/?feed=rss2";

// _emaFeed = "media/ema.xml";
// _aleFeed = "media/ale.xml";

// Google Analytics 
_uacct = "UA-149173-1";
urchinTracker();

$(function () {
	
	// Menu --------------------------------------------------------------------------------------------------------
	// Get current page name to activate the menu item
	function getPageName() {
		var lastSlash = window.location.href.lastIndexOf("/");
		var startOfExtension = window.location.href.indexOf(".html");
		var pageName = window.location.href.substring(lastSlash + 1, startOfExtension);
		return pageName;
	}

	
	// set the F3 suffix to the string (active menu img)
	function addF3(src) {
		return src.replace(".gif", "_f3.gif");
	}
	
	// load the menu from external source
	function loadMenu(pageName) {
		$("#subMainMenu").load("menu.html", function () {	
			if ((pageName === "http://www.codiceplastico.com/") || 
					(pageName === "http://codiceplastico.com/") || 
					(pageName === "http://codiceplastico.github.com/") || 
					(pageName === "") || 
					(pageName === null))
				pageName = "Home";
			var src = $(".isMenuItem[alt='" + pageName + "']").attr("src");
			src = addF3(src);
			$(".isMenuItem[alt='" + pageName + "']").attr("src", src)
		});
	};
	
	// Feed home page -----------------------------------------------------------------------------------------------
	var intervalFunc;
	var allItems = new Array();
	
	function compareItems(a, b)
	{
		return new Date(a.updated) < new Date(b.updated);
	}
	
	function showBlogItems()
	{	
		if (emaCompleted && aleCompleted)
		{
			clearInterval(intevalFunc);
			allItems.sort(compareItems);
			
			allItems.forEach(function (item) {
				var html = "<li><a href='"+ item.link +"'>" + item.title + "</a></li>";
				$("#subMainExtra ul").append(html);
			})
		}
	}
	
	function getFeeds()
	{
		
		$.ajax({
      url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=3&callback=?&q=' + encodeURIComponent(_emaFeed),
      dataType: 'json',
      success: function(data) {
        $(data.responseData.feed.entries).each(function (i, item) {
          allItems.push(item);
        });
				emaCompleted = true;
      },
      error: function() { console.log("error"); } 
    });
	
		$.ajax({
      url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=3&callback=?&q=' + encodeURIComponent(_aleFeed),
      dataType: 'json',
      success: function(data) {
        $(data.responseData.feed.entries).each(function (i, item) {
          allItems.push(item);
        });
				aleCompleted = true;
      },
      error: function() { console.log("error"); } 
    });	
	}
	
	var pageName = getPageName();
	loadMenu(pageName);
	
	if ((pageName === "Home") ||
		  (pageName === "home") ||
		  (pageName === "http://www.codiceplastico.com/") || 
		  (pageName === "http://codiceplastico.com/") || 
		  (pageName === "http://codiceplastico.github.com/") || 
		  (pageName === "") || 
		  (pageName === null)) {
		var emaCompleted = false;
		var aleCompleted = false;
		getFeeds();
		
		intevalFunc = setInterval(showBlogItems, 200);
	}	
})