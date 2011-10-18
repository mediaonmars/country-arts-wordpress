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
          var tip = ["<h4>What's on in the " + 
            _(region.replace("-", " ")).chain().words().
                                        map(function(w) {return _(w).capitalize()}).value().join(" ") + 
                      " Region</h4>"];
                      
          for(i=0; i<regionEvents.length; i++) {
            evt = regionEvents[i];
            tip.push("<p>" + evt.title + "</p>");
          }
          if (regionEvents.length > 0) {
            tip.push("<p>Click on the map for more info about the events in this region</p>");
          } else {
            tip.push("<p>There are no events for this region</p>");
          }
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
