// 获取除开node_modules的文件列表
import fs from "fs";
import path from "path";
let currentPath = ".";

// 1. read  file  current directory
let getNeedTableOfContents = [];
let getFiles = fs.readdirSync(currentPath);
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
    getNeedTableOfContents.push(item);
  }
});
console.log("获取的列表", getNeedTableOfContents);
let myReadFiles = (readFiles, dir) => {
  console.log("dir", dir, path.resolve(dir));
  let getFiles = fs.readdirSync(path.resolve(dir), { withFileTypes: true });
  getFiles.map(item => {
    if (item.isDirectory()) {
      myReadFiles(readFiles, path.resolve(dir) + "/" + item.name);
    } else {
      item.filePath = path.resolve(dir) + "/" + item.name;
      readFiles.push(item);
    }
    return;
  });
};
// 2. read directory src
getNeedTableOfContents.map(item => {
  let readFiles = [];
  myReadFiles(readFiles, currentPath + "/" + item + "/src");
  console.log("获取的所有的文件的内容是：");
  let names = readFiles.map(item => {
    // return item.name;
    // return item.filePath.split("src")[1];
    let htmlPath = "." + item.filePath.split("src")[1];
    return htmlPath;
  });
  console.log(names);
});
// fs.writeFileSync("index.html", html);
