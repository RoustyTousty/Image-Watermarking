var prompt = document.getElementById("prompt");
prompt.style.visibility = "hidden";

document.getElementById("upload-image").addEventListener("change", function () {
  prompt.style.visibility = "hidden";
  var file = this.files[0];

  if (file && file.type.startsWith("image/")) {
    var img = new Image();
    var watermark = "IT Eksāmens";
    var canvas = document.getElementById("image");
    var ctx = canvas.getContext("2d");

    var reader = new FileReader();
    reader.onload = function (e) {
      img.onload = function () {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

        var watermarkFontSize = 0.15 * canvas.width;
        ctx.font = "bold " + watermarkFontSize + "px Arial";
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";

        var textWidth = ctx.measureText(watermark).width;
        var textX = (canvas.width - textWidth) / 2;
        var textY = canvas.height / 2;

        ctx.fillText(watermark, textX, textY);

        let anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = "watermark.png";
        anchor.click();
        anchor.remove();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    prompt.style.visibility = "visible";
    this.value = null;
  }
});