let app = document.querySelector("#app")

// header
let toHome = document.querySelector("#home")
let toShowUpload = document.querySelector("#to-show-upload")
let toShowFile = document.querySelector("#to-show-file")
let toShowSetting = document.querySelector("#to-show-setting")

// footer
let imgUploadFooter = document.querySelector("#footer-upload-images")
let imgUpload = document.querySelector("#image-upload")
let imgFromUpload = document.querySelector("#image-from-upload")
let imgPreview = document.querySelector("#image-preview")

// header function 
toHome.onclick = function(){
    
}
toShowUpload.onclick = function(){
    if(imgUploadFooter.style.display==="")
    imgUploadFooter.style.display="none"
    else if(imgUploadFooter.style.display==="none"){
        imgUploadFooter.style.display=""
    }   
}
toShowSetting.onclick = function(){
    app.append(xxsetting.import.body)
}


// footer function
imgUpload.onclick = function(e){
    imgFromUpload.click()
}
