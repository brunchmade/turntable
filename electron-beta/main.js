var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');

var force_quit = false;

var menu = Menu.buildFromTemplate([
  {
    label: 'Tumtable',
    submenu: [
      {
        label: 'About Tumtable',
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function() {mainWindow.reload();}
      },
      {
        label: 'Hide Tumtable',
        accelerator: 'CmdOrCtrl+H',
        click: function() {mainWindow.hide();}
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit Tumtable',
        accelerator: 'CmdOrCtrl+Q',
        click: function() {force_quit=true; app.quit();}
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Alt+Command+I';
          else
            return 'Ctrl+Shift+I';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.toggleDevTools();
        }
      },
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Tumtable on GitHub',
        click: function() { require('electron').shell.openExternal('https://github.com/brunchmade/tumtable') }
      },
    ]
  }
]);

// Report crashes to our server.
//electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  Menu.setApplicationMenu(menu);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 700,
    minHeight: 550,
    'node-integration': false,
    'title-bar-style': 'hidden-inset'
  });

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000');

  // open _blank links in same window
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('shell').openExternal(url);
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('close', function(e){
    if(!force_quit){
      e.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('closed', function(){
    mainWindow = null;
    app.quit();
  });

  app.on('activate', function(){
    mainWindow.show();
  });
});