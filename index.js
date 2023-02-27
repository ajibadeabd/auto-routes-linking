 
const fs = require('fs');
const path = require('path');
const check = (file) => {
  return (file.indexOf('.') !== 0 &&
          file !== ".DS_Store" &&
          file.slice(-3) === '.js' &&
          file.indexOf('test.js') === -1);
};

const readDirectory = (apiPrefix) => {
console.log("------------------------------------------------")

  const __readDirectory = (app, directory,prefix="") => {
  fs.readdirSync(directory)
  .sort((a ,b) => {
    if (a  && b ) {
      const aHasBrackets = a.includes("[") && a.includes("]");
      const bHasBrackets = b.includes("[") && b.includes("]");
      if (aHasBrackets && !bHasBrackets) {
        return 1;
      } else if (!aHasBrackets && bHasBrackets) {
        return -1;
      } else {
        return 0;
      }
    } else if (aIsString && !bIsString) {
      return -1;
    } else if (!aIsString && bIsString) {
      return 1;
    } else {
      return 0;
    }
  })
  .forEach(file => {
    const filePath = path.join(directory, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      __readDirectory(app, filePath,
     prefix +   "/"+file.replace("]","")
      .replace("[",":"));
    } else if (check(file)) {
      const eachFile = require(filePath);
      let route = file.split(".")[0]
      .replace("index","")
      .replace(/\s+/g, '');
      for (let rout in eachFile) {
         console.log(`|${apiPrefix}${prefix}/${route}`, rout +  "request")
        app[rout](`/${apiPrefix}${prefix}/${route}`, eachFile[rout]);
console.log("------------------------------------------------")
      }
    }  
  });
  
};

return __readDirectory
};

module.exports = (app,apiPrefix="api", routePath="/src/routes") => {
  readDirectory(apiPrefix)(app,process.cwd()+ "/" +routePath)
};

 