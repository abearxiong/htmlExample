// 获取除开node_modules的文件列表
import fs from "fs";
let filesPath = ".";

let getNeedFiles = [];
let getFiles = fs.readdirSync(filesPath);
getFiles = getFiles.filter(item => {
  if (item.startsWith(".")) return false;
  else if (item === "node_modules") return false;
  else if (item.startsWith("0000-00")) {
    console.log(item, "配置文件,不要");
    return false;
  }
  return true;
});
getFiles.forEach(item => {
  let stats = fs.statSync(item);
  if (stats.isDirectory()) {
    getNeedFiles.push(item);
  }
});
console.log("获取的列表", getNeedFiles);

let writeUrl = getNeedFiles.map(item => {
  // return `<a class="example-list" target="__blank" href="./${item}/dist/index.html">${item}</a>`;
  return `<a class="example-list" target="_blank" href="./${item}/dist/index.html">${item}</a>`;
});
writeUrl = writeUrl.join(" ");
let html = `
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>我的例子</title>
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
`;
fs.writeFileSync("index.html", html);
