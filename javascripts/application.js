$(document).ready(function() {
  var map = $("#wamap");
  if (map.length > 0) {
    var container = $("#home-right");
    var position = [container.offset().left,container.offset().top];
    container.simpletip({content: "", fixed: true, hidden: true, position: position});
    map.children().
      mouseover(function(e) {
        var region = e.target.id
        var regionInfo = RegionEvents[region];
        var regionEvents = regionInfo.events;
        if (regionEvents) {
          var tip = ["<h4>What's on in the " + region + " region</h4>"];
          for(index in regionEvents) {
            var evt = regionEvents[index];
            tip.push("<p>" + evt.title + "</p>");
          }
          tip.push("<p>Click on the region to see the events for that region</p>");
          var homeRight = $("#home-right");
          var popup = container.eq(0).simpletip();
          popup.update(tip.join(""));
          popup.show();
        }
      }).
      click(function(e) {
        var region = e.target.id
        var regionInfo = RegionEvents[region];
        window.location.href = "/around-the-state/event-calendar/?region=" + regionInfo.id
        e.preventDefault();
      });
  }
  
  // Make the home button link to /
  var home = $("#menu a[href*='home']");
  home.attr("href", "/");
})
;
