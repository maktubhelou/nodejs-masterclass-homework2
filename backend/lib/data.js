const fs = require("fs");
const path = require("path");
const helpers = require("./helpers");

const lib = {};
lib.baseDir = path.join(__dirname, "/../.data/");

lib.create = (dir, file, data, callback) => {
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(data);
        fs.writeFile(fileDescriptor, stringData, err => {
          if (!err) {
            fs.close(fileDescriptor, err => {
              if (!err) {
                callback(false);
              } else {
                callback(500, { "Error:": "Could not close file." });
              }
            });
          } else {
            callback(500, { "Error:": "Could not write to new file." });
          }
        });
      } else {
        callback(500, {
          "Error:": "Could not create file. It may already exist"
        });
      }
    }
  );
};

lib.append = (dir, file, str, callback) => {
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "a",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        fs.appendFile(fileDescriptor, "\n" + str, err => {
          if (!err) {
            fs.close(fileDescriptor, err => {
              if (!err) {
                callback(false);
              } else {
                callback(500, {
                  Error: "error closing file that was being appended."
                });
              }
            });
          } else {
            callback("error appending to file");
          }
        });
      } else {
        callback("could not open file for appending.");
      }
    }
  );
};

lib.read = (dir, file, callback) => {
  fs.readFile(
    lib.baseDir + dir + "/" + file + ".json",
    "utf-8",
    (err, data) => {
      if (!err && data) {
        const parsedData = helpers.parseJsonToObject(data);
        callback(false, parsedData);
      } else {
        callback(err, data);
      }
    }
  );
};

lib.update = (dir, file, data, callback) => {
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(data);
        fs.ftruncate(fileDescriptor, err => {
          if (!err) {
            fs.writeFile(fileDescriptor, stringData, err => {
              if (!err) {
                fs.close(fileDescriptor, err => {
                  if (!err) {
                    callback();
                  } else {
                    callback(500, { Status: "Error closing file." });
                  }
                });
              } else {
                callback(500, { Status: "Error writing to file." });
              }
            });
          } else {
            callback(500, { Status: "Error truncating file." });
          }
        });
      } else {
        callback(404, {
          "Status:": "could not open file for updating. It may not exist yet."
        });
      }
    }
  );
};

lib.delete = (dir, file, callback) => {
  fs.unlink(lib.baseDir + dir + "/" + file + ".json", err => {
    if (!err) {
      callback(false, { Status: "File deleted." });
    } else {
      callback(500, { Error: "could not delete file." });
    }
  });
};

lib.list = (dir, callback) => {
  fs.readdir(lib.baseDir + dir + "/", (err, data) => {
    if (!err && data && data.length > 0) {
      const trimmedFileNames = [];
      data.forEach(fileName => {
        trimmedFileNames.push(fileName.replace(".json", ""));
      });
      callback(false, trimmedFileNames);
    } else {
      callback(err, data);
    }
  });
};

module.exports = lib;
