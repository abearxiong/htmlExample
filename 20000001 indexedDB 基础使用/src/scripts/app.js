console.log("app.js")
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}

// 打开数据库
var request = window.indexedDB.open("MyTestDatabase");
request.onupgradeneeded = function (event) {
    
}

request.onsuccess = function(event) {
	//request === event.target;
}
request.onerror = function(event) {

}

// 练习增删改查数据库

/// ----创建存储空间----- ///
var request = window.indexedDB.open('test', 1);

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore('table1', {keyPath: 'id', autoIncrement: true});

    // 创建索引
    objectStore.createIndex('name', 'name', {unique: false});
}

request.onerror = function (event) {
    alert("Why didn't you allow my web app to use IndexedDB?!");
};

/// 增加数据
var request = window.indexedDB.open('test', 1);

request.onsuccess = function (event) {
    var db = event.target.result;

    var transaction = db.transaction(['table1'], 'readwrite');

    var objectStore = transaction.objectStore('table1');

    var index = objectStore.index('name');

    objectStore.add({name: 'a', age: 30, x: 'n'});
    objectStore.add({name: 'b', age: 40});

    var request = objectStore.delete(4);

    request.onsuccess = function (event) {
        console.log("删除数据")
    }
}

/// ----- 查找数据----
var request = window.indexedDB.open('test', 1);

request.onsuccess = function (event) {
    var db = event.target.result;

    var transaction = db.transaction(['table1'], 'readwrite');

    var objectStore = transaction.objectStore('table1');

    var request = objectStore.get(1);// 通过主键

    //var index = store.index('name'); // 通过索引
    //var request = index.get('a')
    request.onsuccess = function (event) {
        // 对 request.result 做些操作！
        console.log("查找数据")
        console.log(request.result);
    };

    request.onerror = function (event) {
        // 错误处理!
    };
}
/// ----- 通过游标获取数据 ------
var request = window.indexedDB.open('test', 1);

request.onsuccess = function (event) {
    var db = event.target.result;

    var transaction = db.transaction(['table1'], 'readwrite');

    var objectStore = transaction.objectStore('table1');

    var request = objectStore.openCursor();

    request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            // 使用Object.assign方法是为了避免控制台打印时出错
            console.log('游标获取',Object.assign(cursor.value));
            cursor.continue();
        }
    };

    request.onerror = function (event) {
        // 错误处理!
    };
}
