// 引入放第一个位置
const { ipcMain } = require('electron')


ipcMain.on('footer', (event, value) => {
  console.log("footer event",event, value)
})