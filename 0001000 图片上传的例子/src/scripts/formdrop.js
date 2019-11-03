let fromDropUpload= document.querySelector("#from-drop-upload")
let fromDropPreview = document.querySelector("#from-drop-preview")
function formPreview(files){
    if (!files.length) {
        fromDropPreview.innerHTML = "<p>No files selected!</p>";
    } else {
        fromDropPreview.innerHTML = "";
        var list = document.createElement("ul");
        fromDropPreview.appendChild(list);
        for (var i = 0; i < files.length; i++) {
          var li = document.createElement("li");
          list.appendChild(li);
          
          var img = document.createElement("img");
          img.src = window.URL.createObjectURL(files[i]);
          img.height = 60;
          img.onload = function() {
            window.URL.revokeObjectURL(this.src);
          }
          li.appendChild(img);
          var info = document.createElement("span");
          info.innerHTML = files[i].name + ": " + Math.round(files[i].size/1024) + " k";
          li.appendChild(info);
        }
    }
}