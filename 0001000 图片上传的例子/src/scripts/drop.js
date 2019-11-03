let dropUpload = document.querySelector("#drop-upload")
let dropPreview = document.querySelector("#drop-preview")
dropUpload.addEventListener("drop", function( e ) {
    e.preventDefault();
    e.stopPropagation();
    console.log(event,"event",this.files," e.dataTransfer.files",e.dataTransfer.files)
    // document.body.appendChild("<b>添加内容</b>")
    var files = this.files || e.dataTransfer.files
    // 一、图片上传
    if(files.length == 0){
        alert("非拖动文件到页面")
        return false
    }
    if(files[0].type.indexOf('image')=== -1){
        alert("托的不是图片")
        return false
    }
    // 拖动图片预览
    var imgContent = window.webkitURL.createObjectURL(files[0])
    var filename = files[0].name //图片名称
    var filesize = Math.floor((files[0].size)/1024)
    if(filesize>500){
        alert("上传大小不能超过500k");// 浏览器支持？？
        return false;
    }
    dropPreview.append(imgContent,"标题",filename," 大小："+filesize)
    const img = document.createElement('img');  //  创建 img 标签
    img.src = imgContent;  //  设置 img 的 src
    dropPreview.appendChild(img);  //  把创建的 img 插入到 body 中

    // 二、 如果是文件
    // var reader = new FileReader()
    // reader.readAsText(files[0], 'utf-8')
    // reader.onload = function (evt) {
    //     var text = evt.target.result
    //     dropPreview.innerText = text
    // }
}, false);
dropUpload.addEventListener("dragenter", e=>{
    e.preventDefault();
    e.stopPropagation();
})
dropUpload.addEventListener("dragover", e=>{
    e.preventDefault();
    e.stopPropagation();
})