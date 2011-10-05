(function () {

  var MarsFX = {
  
    /* This will cause img tags with class='mars-rollover' to rollover to the image file named -over.ext
     * i.e. <img class='mars-rollover' src='logo.png' /> will rollover to logo-over.png
     */
    rollovers: function() {
      var images = $("img.mars-rollover");
    
      function overImageName(image) {
        url = image.src.split(".");
        url[url.length-2] += "-over"
        return url.join(".");
    
      }
    
      // precache 
      images.each(function() {
        var el = $(this);
        el.attr("data-orig-src", el.attr("src"));
        el.attr("data-over-src", overImageName(this))
        $("<img src='" + overImageName(this)  + "'></img>");
      })
    
      images.hover(function() {
        var el = $(this);
        el.attr("src", el.attr("data-over-src"));
      },
      function() {
        var el = $(this);
        el.attr("src", el.attr("data-orig-src"));
      });
    },
  
    /* This will clear a search box when clicked in 
     * Decorate an input with class='mars-search-clear'
     */
    searchClear: function() {
      var search = $("input.mars-search-clear");
      search.each(function() {
        var orig = search.val();
        function clear() {
          if (search.val() != orig) return;
          search.val("");
        }
        function set() {
          // if there is something in there return
          if (!!search.val()) return;
          search.val(orig);
        }
        $(this).focus(clear).blur(set);
      });
      
  
    }
  
  }

  $(document).ready(function () {
    for (fn in MarsFX) MarsFX[fn]();
  });

})();
