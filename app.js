function parseDom(arg) {
  var objE = document.createElement('div');
  objE.innerHTML = arg;
  return objE.childNodes;
}

const header = `<header class="he-code-header">
<div>
  <a class="to-sources-code" href="../" target="_blank">源码</a>
</div>
</header>`;

function addHeaders() {
  const _dom = parseDom(header)[0];
  document.getElementsByTagName('body')[0].appendChild(_dom);
}

(() => {
  addHeaders();
})();
