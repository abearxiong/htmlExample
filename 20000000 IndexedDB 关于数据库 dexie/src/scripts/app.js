console.log("app.js")
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}

// 1. 打开数据库
var request = window.indexedDB.open("MyTestDatabase");
// 2. 