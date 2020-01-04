console.log("剪贴板加载成功")
//  给 document 添加 paste 事件
document.addEventListener('paste', ev => {
    const items = ev.clipboardData.items;  //  获取剪贴板中的数据
    let files = null;  //  用来保存 files 对象
    
    if (items.length > 0) {
        //  判断剪贴板中是否是文件
        if (items[0].kind == "file") {
            files = items[0].getAsFile();  //  获取文件
            //  判断是否是图片
            if (files.type == 'image/jpeg' || files.type == 'image/png') {
                const reader = new FileReader();  //  创建 FileReader 对象
                reader.readAsDataURL(files);  //  读取文件
                
                //  读取完成后触发
                reader.addEventListener('load', ev => {
                    const img = document.createElement('img');  //  创建 img 标签
                    img.src = ev.target.result;  //  设置 img 的 src
                    // document.body.appendChild(img);  //  把创建的 img 插入到 body 中
                    imgPreview.appendChild(img)
                    app.append(imgPreview)
                });
            }
        }
    }    
});