function checkStatus(callback) {
  callback(deviceReady)
}

/*
 * copy applicationdir/www to datadir/www if it does not exist
 */

function copyDirInit() {
  window.resolveLocalFileSystemURI(cordova.file.applicationDirectory + "www",
    function (sourceDir) {
      let srcDir = 'csybot-pa-mic';
      let destDir = 'csybot-pa-mic';
      sourceDir.getDirectory(srcDir, {
          create: false
        }, function (directory) {
          window.resolveLocalFileSystemURI(cordova.file.dataDirectory + "www",
            function (parentDir) {
              directory.copyTo(parentDir, destDir, function () {}, function (e) {})
            }, null);
        },
        function () {});
    },
    function () {});
}

function init(whichFile) {
  /* alert('init') */
  /* alert(cordova.file.dataDirectory) */
  window.resolveLocalFileSystemURI(cordova.file.dataDirectory,
    function (tmp) {
      /* alert('inside init') */
      /* alert(cordova.file.dataDirectory) */
      /* alert(cordova.file.dataDirectory + "www/csybot-pa-mic/" + whichFile) */
      window.resolveLocalFileSystemURI(cordova.file.dataDirectory + "www/csybot-pa-mic/" + whichFile,
        function (fileEntry) {
          /* alert('inside inside init') */
          //create this directory if it does not exist
          window.resolveLocalFileSystemURI(cordova.file.dataDirectory,
            function (mainDir) {
              try {
                window.resolveLocalFileSystemURI(cordova.file.dataDirectory + "www/csybot-pa-mic",
                  function (subDir) {},
                  function () {
                    mainDir.getDirectory('www', {
                      create: true
                    }, function (dirEntry) {
                      /* alert('up to here') */
                      copyDirInit();
                    }, function (e) {});
                  }
                );
              } catch (e) {}
            },
            function (err) {
              /* alert('error3') */;
              /* alert(JSON.stringify(err)) */
            }
          );
        }
        ,
        function (err) {
          /* alert('error2') */;
          /* alert(JSON.stringify(err)) */
          window.resolveLocalFileSystemURI(cordova.file.dataDirectory,
            function (mainDir) {
              try {
                window.resolveLocalFileSystemURI(cordova.file.dataDirectory + "www/csybot-pa-mic",
                  function (subDir) {},
                  function () {
                    mainDir.getDirectory('www', {
                      create: true
                    }, function (dirEntry) {
                      /* alert('up to here') */
                      copyDirInit();
                    }, function (e) {});
                  }
                );
              } catch (e) {}
            },
            function (err) {
              /* alert('error3') */;
              /* alert(JSON.stringify(err)) */
            }
          );
        }
        
        
        
        );
    },
    function (err) {
      /* alert('error1') */;
      /* alert(JSON.stringify(err)) */
    }
  );
}

function openFile_(callback, whichFile) {
  /* alert(whichFile) */
  window.resolveLocalFileSystemURI(whichFile,
    function (fileEntry) {
      /* alert('passed') */
      fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function (e) {
          return callback(null, this.result);
        }
        reader.readAsText(file);
      })
    },
    function (err) {
      /* alert('some err') */
      /* alert(JSON.stringify(err)) */
      callback(true);
    }
  );
}

function openFile(callback, whichFile) {
  let path = cordova.file.dataDirectory + "www/csybot-pa-mic/" + whichFile
  /* alert("OPNE:" + path) */
  openFile_(function (err, result) {
    /* alert(err) */
    /* alert(result) */
    if (err) {
      init(whichFile)
      path = cordova.file.dataDirectory + "www/csybot-pa-mic/" + whichFile
      openFile_(function (err, result) {
        if (err);
        return callback(err, result);
      }, path)
    } else {
      return callback(err, result);
    }
  }, path)
}

function createDirectory(callback, dir, indir) {
  if (indir === undefined) indir = '';
  window.resolveLocalFileSystemURI(cordova.file.dataDirectory + "www/csybot-pa-mic" + indir,
    function (rootDirEntry) {
      /* alert('rootdir') */
      rootDirEntry.getDirectory(dir, {
        create: true
      }, function (dirEntry) {
        /* alert(dirEntry) */
        return callback();
      }, function (err) {
        /* alert(err) */
        /* alert(err) */
        return callback(true);
      });
    },
    function (e) {
      callback(true);
    }
  );
}

function writeFile(callback, dataObj, whichFile) {
  window.resolveLocalFileSystemURI(cordova.file.dataDirectory + "www/csybot-pa-mic",
    function (dir) {
      dir.getFile(whichFile, {
        create: true,
        exclusive: false
      }, function (file) {
        let logOb = file;
        logOb.createWriter(function (fileWriter) {
          let blob = new Blob([dataObj], {
            type: 'text/plain'
          });
          fileWriter.write(blob);
          fileWriter.onwriteend = function () {
            callback(null);
          };
          fileWriter.onerror = function () {
            callback(true);
          };
        }, function () {
          callback(true);
        });
      }, function () {
        callback(true);
      });
    },
    function () {
      callback(true);
    },
  );
}

export default {
  checkStatus,
  openFile,
  writeFile,
  createDirectory,
};
