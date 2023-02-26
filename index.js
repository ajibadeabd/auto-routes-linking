const fs = require('fs');
const path = require('path'); 

class AutoRoute {
  static instance = () => {
    if (this.newInstance) return this
    this.routePath = "src/routes";
    this.dirname = process.cwd() + "/";
    this.debug = true;
    this.apiPrefix = "api";
    this.packages = {}
    this.validator = {}
    this.newInstance = this.newInstance ? this.newInstance : new this();
    return this;
  };

  static setDebugger = (debug) => {
    this.debug = debug;
    return this;
  };

  static setValidator = (validator) => {
    this.validator =  validator
    return this;
  };

  static injectPackages = () => {
    // only compile package your installed not inbuilt package
    const  packageJson =  fs.readFileSync("./package.json", "utf8");

    // Parse contents as JSON object
    const packageObject = JSON.parse(packageJson);

    for (let eachPackages in packageObject.dependencies) {
    this.packages[eachPackages] = require(eachPackages)
}
    return this;
  };

  static setRoutePath = (path) => {
    this.routePath = path;
    return this;
  };

  static setApiPrefix = (apiPrefix) => {
    this.apiPrefix = apiPrefix;
    return this;
  };

  static sortFile = (directory) => {
    return fs.readdirSync(directory).sort((a, b) => {
      if (a && b) {
        const aHasBrackets = a.includes("[") && a.includes("]");
        const bHasBrackets = b.includes("[") && b.includes("]");
        if (aHasBrackets && !bHasBrackets) {
          return 1;
        } else if (!aHasBrackets && bHasBrackets) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });
  };

  static init = (app) => {
    this.app = app;
    let createRoute = (directory, prefix) => {
      this.sortFile(directory).forEach((file) => {
        const filePath = path.join(directory, file);
        if (fs.statSync(filePath).isDirectory()) {
          return createRoute(filePath, prefix + "/" + file.replace("]", "").replace("[", ":"));
        } else if (this.validateFile(file)) {
          const eachFile = require(filePath)
          let route = file.split(".")[0]
            .replace("index", "")
            .replace(/\s+/g, "");
            let injectableClasses = {}
            let injectableModels = {}
            const  injectableClass = eachFile['injectableClass']
            const  injectableModel = eachFile['injectableModel']
            const injectableModelFunction = (injectableClass)=>{
              return injectableClass.reduce((initialValue,currentModels)=>{
                   initialValue[currentModels.modelName] = currentModels
                    return initialValue
                  },{})
              }
            const injectableFunction = (injectableClass)=>{
            return injectableClass.reduce((initialValue,currentClass)=>{
                let innerClass = null
                let innerModel = null
                if(currentClass.injectableClass?.length>0){
                  innerClass =  injectableFunction(currentClass.injectableClass)
                }
                
                if(currentClass.injectableModel?.length>0){
                  innerModel = injectableModelFunction(currentClass.injectableModel)
                }
                const newClass = new currentClass.class(
                  {
                    packages: this.packages,
                    ...this.validator ,
                     models: innerModel
                  }
                  ,innerClass)
                  initialValue[currentClass.class.name] = newClass
                  return initialValue
                },{})
            }
             
          if(injectableClass){
            injectableClasses = injectableFunction(injectableClass)
          }
          if(injectableModel){
            injectableModels = injectableModelFunction(injectableModel)


          }
          if(eachFile["route"]){
            const routeClass = new eachFile["route"]( {
                    packages: this.packages ,
                    ...this.validator ,
                    models: injectableModels,
                    services: injectableClasses,
                  })
          for (const eachRoute in routeClass) {
            let [eachRouteMethod, sur] = eachRoute.split(".");
            if(!["post","get","delete","put","patch"].includes(eachRouteMethod)){
              console.log('\x1b[31m%s\x1b[0m', 'function name must start with a "post","get","delete","put","patch" method');
              console.log('\x1b[31m%s\x1b[0m', `Also ensure you make all non function property private like #${eachRouteMethod}`);
              return
               }
            let apiRoute = `/${this.apiPrefix}${prefix}/${route}`;
            // console.log(eachRouteMethod)
            if (sur) {
              sur = sur.replace(":", "/:");
              apiRoute += sur;
            }
            if (this.debug) {
              console.log(apiRoute, eachRouteMethod + " request");
            }
            let middleWare = [apiRoute];

            if(eachFile['middleware']){
             // console.log( this.validator.validator.ValidatorFactory )
            const classMiddleware = new eachFile['middleware'](
              {
                    packages: this.packages,
                    ...this.validator ,
                     services: injectableClasses,
                  })
            if (classMiddleware[eachRoute] && classMiddleware[eachRoute]().length>0) {
              middleWare.push(...classMiddleware[eachRoute]());
            }
            let overallMiddleware = classMiddleware["all"]();
            if (overallMiddleware && overallMiddleware.length > 0) {
              middleWare.push(...overallMiddleware);
            }
          }
          

            
        this.app[eachRouteMethod](...middleWare, routeClass[eachRoute]);
            if (this.debug) {
              console.log("------------------------------------------------");
            }
          }
        }
        }
      });
      return this
    };
    return createRoute(this.dirname + this.routePath, "");
  };

  static validateFile = (file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== ".DS_Store" &&
      file.slice(-3) === '.js' &&
      file.indexOf('test.js') === -1
    );
  };
}

module.exports = AutoRoute;
