const fs = require("fs");
const path = require("path");
const {
  rejects
} = require("assert");
const {
  resolve
} = require("path");
const {
  promises
} = require("dns");
const search = require("../utils/binarySearch");
const dbJson = require("../db/data.json");

// Set path for database
let p;
exports.setDbPath = (thePath) => {
  console.log(thePath);

  p = thePath;
}

// Read data from file
console.log(dbJson);

exports.readDataPro = (file = p) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject("Something went wrong while reading file");
      resolve(data);
    });
  });

exports.writeDataPro = (data, file = p) =>
  new Promise((resolve, reject) => {
    const dbObj = JSON.parse(dbJson);
    const id = dbObj.length + 1;
    data.id = id;
    dbObj.push(data);
    fs.writeFile(file, JSON.stringify(dbObj), err => {
      if (err) reject("Could not right file!");
      // const newData
      resolve(data);
    });
  });

exports.updateDataPro = (id, body, file = p) =>
  new Promise((resolve, reject) => {
    let dataObj;
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject("Could not read data");
      dataObj = JSON.parse(data);
      let dataValue = search(dataObj, id);
      if (!dataValue) reject("Document not found!");
      dataValue = {
        ...dataValue,
        ...body
      };
      dataObj = {
        ...dataValue
      };
      fs.writeFile(file, dataObj, err => {
        if (err) reject("Could not update data");
        resolve(dataValue);
      })
    })
  });

// module.exports = {

// }