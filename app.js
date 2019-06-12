// https://24ways.org/2010/calculating-color-contrast/

$(document).ready(function() {
  var hexcolor, result;

  $(document).ready(function() {
    $(window).keydown(function(event) {
      if (event.keyCode == 13) {
        setValues();
        event.preventDefault();
        return false;
      }
    });
  });

  function setValues() {
    var hexcolor = document.getElementById("hexcolor").value;
    // console.log("#" + hexcolor);
    getContrastYIQ(hexcolor);
    $("input[type=color]").val("#" + hexcolor);
  }

  $("#colorpicker").change(function() {
    var colorpicker = document.getElementById("colorpicker").value;
    // console.log(colorpicker);
    var colorID = colorpicker.substring(1, colorpicker.length);

    $("input[type=text]").val(colorID);

    setValues();
  });

  function getContrastYIQ(hexcolor) {
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    //return (yiq >= 128) ?  'black' : 'white';
    $("body").css("background-color", "#" + hexcolor);
    if (yiq >= 128) {
      $("#hexcolor, span, #submit, #colorpicker").css({
        color: "#000000",
        "border-color": "#000000"
      });
      $("path.fullcolor, #colorpicker-icon ").css({ fill: "#000000" });
      $("path.halfcolor ").css({ fill: "#000000", opacity: 0.4 });

      $("input").removeClass("white");
      $("input").addClass("dark");

      $(" #submit").css({
        "background-color": "#000000",
        color: "#" + hexcolor
      });
    } else {
      $("#hexcolor,span,#submit, #colorpicker").css({
        color: "#ffffff",
        "border-color": "#ffffff"
      });
      $("path.halfcolor, path.fullcolor, #colorpicker-icon ").css({
        fill: "#ffffff"
      });
      $("input").removeClass("dark");
      $("input").addClass("white");

      $("path.halfcolor ").css({ fill: "#ffffff", opacity: 0.8 });
      $(" #submit").css({
        "background-color": "#ffffff",
        color: "#" + hexcolor
      });
    }
  }
});
