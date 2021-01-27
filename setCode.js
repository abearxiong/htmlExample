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
getNeedTableOfContents.map(getNeedTableOfContent => {
  let readFiles = [];
  let components = [];
  let scripts = [];
  let styles = [];
  let images = [];
  let others = [];
  let results = "";
  myReadFiles(readFiles, currentPath + "/" + getNeedTableOfContent + "/src");
  console.log("获取的所有的文件的内容是：");
  let names = readFiles.map(item => {
    // return item.name;
    // return item.filePath.split("src")[1];
    let htmlPath = item.filePath.split("src")[1];
    return htmlPath;
  });
  console.log(names);
  results = names.map(item => {
    if (item.startsWith("/components/")) {
      // console.log("components filename", path.basename(item));
      components.push({ name: path.basename(item), path: "./src" + item });
    } else if (item.startsWith("/scripts")) {
      scripts.push({ name: path.basename(item), path: "./src" + item });
    } else if (item.startsWith("/styles")) {
      styles.push({ name: path.basename(item), path: "./src" + item });
    } else if (item.startsWith("/images")) {
      images.push({ name: path.basename(item), path: "./src" + item });
    } else {
      others.push({ name: path.basename(item), path: "./src" + item });
    }
  });
  let htmlHead = `
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${getNeedTableOfContent}</title>
    <style>
    html,body {
      width: 100%;
      height: 100%;
      margin: 0px;
      padding: 0px;
    }
    .ace-content {
      width: 80%;
      height: 100%;
      float: left;
      margin: 0px;
    }
    .list-tree {
      width: 20%;
      height: 100%;
      float: left;
      overflow-y: scroll;
    }
    .list-tree-title {
      margin-top: 20px;
      display: block;
      width: 100%;
      font-size: 1.8rem;
    }
    .list-tree-item {
      margin: auto;
      margin-top: 20px;
      font-size: 1.5rem;
    }
    .list-tree-item .show-tree {
      margin-left: 10px;
    }
    .directory {
      display: none;
      font-size: 1rem;
      padding-inline-start: 0px;
    }
    .directory > li {
      list-style: none;
      padding-left: 20px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .directory > li:not(:first-child) {
      border-top: 1px solid;
    }
    .active {
      display: block;
    }
    .editor {
      width: 100%;
      height: 100%;
    }
    /*
    中间线的去掉
    */
    .ace_print-margin{
        /* left: -1px; !important; */
        width: 0px !important;
    }
    .choosed {
      color: blue;
    }
    </style>
    `;
  let htmlComponentsContent = components
    .map(
      component =>
        `<li class="show-code" title="${component.path}">${component.name}</li>`
    )
    .join("");
  let htmlScriptsContent = scripts
    .map(
      component =>
        `<li class="show-code" title="${component.path}">${component.name}</li>`
    )
    .join("");
  let htmlStylesContent = styles
    .map(
      component =>
        `<li class="show-code" title="${component.path}">${component.name}</li>`
    )
    .join("");
  let htmlImagesContent = images
    .map(
      component =>
        `<li class="show-code" title="${component.path}">${component.name}</li>`
    )
    .join("");
  let htmlOthersContent = others
    .map(
      component =>
        `<li class="show-code" title="${component.path}">${component.name}</li>`
    )
    .join("");
  let htmlComponents =
    htmlComponentsContent !== ""
      ? `<div class="list-tree-item"><a class="show-tree">component</a><ul class="directory" >${htmlComponentsContent}</ul></div>`
      : "";
  let htmlScripts =
    htmlScriptsContent !== ""
      ? `<div class="list-tree-item"><a class="show-tree">scripts</a><ul class="directory">${htmlScriptsContent}</ul></div>`
      : "";
  let htmlStyles =
    htmlStylesContent !== ""
      ? `<div class="list-tree-item"><a class="show-tree">styles</a><ul class="directory" >${htmlStylesContent}</ul></div>`
      : "";
  let htmlImages =
    htmlImagesContent !== ""
      ? `<div class="list-tree-item"><a class="show-tree">images</a><ul class="directory">${htmlImagesContent}</ul></div>`
      : "";
  let htmlOthers =
    htmlOthersContent !== ""
      ? `<div class="list-tree-item"><a class="show-tree">index</a><ul class="directory">${htmlOthersContent}</ul></div>`
      : "";

  let htmlBody = `
<body>
<div class="list-tree">
<a href="./dist/index.html" class="list-tree-title">${getNeedTableOfContent}</a>
${htmlComponents}
${htmlScripts}
${htmlStyles}
${htmlImages}
${htmlOthers}
</div>
<div class="ace-content">
<div class="editor" id="show-code-editor">
</div>
</div>
`;
  let script = `
      let listDirectory = document.querySelectorAll('.show-tree')
      let showCode = document.querySelectorAll('.show-code');
      listDirectory.forEach(item => {
        item.onclick = ( e ) => {
          let nextElement = e.target.nextElementSibling;
          nextElement.classList.toggle('active');
        }
      })
      showCode.forEach(item => {
        item.onclick = async ( e ) => {
          let href = e.target.title;
          console.log('请求链接', href);
          axios.get(href).then(res => {
            console.log("get code", res);
            if(href.endsWith("html")){
              editor.session.setMode("ace/mode/html");
            }else if(href.endsWith("js")) {
              editor.session.setMode("ace/mode/javascript");
            }else if(href.endsWith("css")) {
              editor.session.setMode("ace/mode/css");
            }else{
              window.open(href, "_blank");
              return;
            }
            editor.setValue(res.data)
          })
          let chooseds = document.querySelectorAll('.choosed');
          chooseds.forEach( (choosed,i,chooseds)=>{
            console.log("choosed",choosed, chooseds[i])
            choosed.classList.remove('choosed')
          })
          e.target.classList.add('choosed')
        }
      })
  `;
  let htmlTail = `
  <script src="https://cdn.bootcss.com/ace/1.4.6/ace.js"></script>
  <script src="https://cdn.bootcss.com/ace/1.4.6/theme-chrome.js"></script>
  <script src="https://cdn.bootcss.com/ace/1.4.6/mode-javascript.js"></script>
  <script src="https://cdn.bootcss.com/ace/1.4.6/mode-html.js"></script>
  <script src="https://cdn.bootcss.com/ace/1.4.6/mode-css.js"></script>
  <script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>
  <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
  <script>
      ${script}
      var editor = ace.edit("show-code-editor");
      editor.setTheme("ace/theme/chrome");
  </script>
  </body>
  </html>`;
  fs.writeFileSync(
    getNeedTableOfContent + "/index.html",
    htmlHead + htmlBody + htmlTail
  );
});
// fs.writeFileSync("index.html", html);
