$(document).ready(function () {

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
    console.log('over', el)

    el.attr("src", el.attr("data-over-src"));
  },
  function() {
    var el = $(this);
    console.log('out', el, el.attr("data-orig-src"))
    el.attr("src", el.attr("data-orig-src"));
  });
})
;
