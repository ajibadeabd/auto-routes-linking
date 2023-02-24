 
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
      for (const  eachRoute in eachFile["route"]) {
       let  [ eachRouteMethod , sur ] = eachRoute.split(".")
         let apiRoute  = `/${apiPrefix}${prefix}/${route}` 
         if (sur) {
          sur =sur.replace(":","/:")
          apiRoute+=sur
        }
         console.log(apiRoute, eachRouteMethod + " "+ "request")
       let middleWare =  [apiRoute]
       let overallMiddleware = eachFile['middleware']["all"]
       if(eachRoute in eachFile['middleware']){
        middleWare.push(eachFile['middleware'][eachRoute])
       }
       if( overallMiddleware && overallMiddleware.length>0){
        middleWare.push(...overallMiddleware)
       }
      app[ eachRouteMethod ](...middleWare,eachFile["route"][eachRoute])

       
       
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

 