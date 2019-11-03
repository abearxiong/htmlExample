// 获取除开node_modules的文件列表
import fs from 'fs';
let filesPath =  '.'

let getNeedFiles = []
let getFiles = fs.readdirSync(filesPath)
getFiles = getFiles.filter(item=>{
    if(item.startsWith("."))return false
    else if(item === "node_modules")return false
    else if(item.startsWith("000000")){
        console.log(item, "配置文件,不要")
        return false
    }
    return true
})
getFiles.forEach(item=>{
    let stats = fs.statSync(item)
    if(stats.isDirectory()){
        getNeedFiles.push(item)
    }
})
console.log("获取的列表",getNeedFiles)

let writeUrl = getNeedFiles.map(item=>{
    return `<a class="example-list" href="./${item}/dist/index.html">${item}</a>`
})
writeUrl = writeUrl.join(" ")
let html =`
<html>
    <head>
        <title>我的例子的列表</title>
        <style>
        .example-list{
            display:block;
        }
        body{
            width: 80%;
            margin: auto;
        }
        </style>
    </head>
    <body>
    ${writeUrl}
    </body>
</html>
`
fs.writeFileSync("index.html",html)