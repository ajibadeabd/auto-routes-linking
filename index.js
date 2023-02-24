const fs = require('fs');
const path = require('path'); 

class AutoRoute {
  static instance = () => {
    if (this.newInstance) return
    this.routePath = "src/routes";
    this.dirname = process.cwd() + "/";
    this.debug = true;
    this.apiPrefix = "api";
    this.packages = {}
    this.newInstance = this.newInstance ? this.newInstance : new this();
    return this;
  };

  static setDebugger = (debug) => {
    this.debug = debug;
    return this;
  };

  static setPackages = (newPackage) => {
    this.packages = {...this.packages,...newPackage}
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
            // console.log(new eachFile["route"](this.app))
            const routeClass = new eachFile["route"](this.packages)
          for (const eachRoute in routeClass) {
            let [eachRouteMethod, sur] = eachRoute.split(".");
            let apiRoute = `/${this.apiPrefix}${prefix}/${route}`;
            if (sur) {
              sur = sur.replace(":", "/:");
              apiRoute += sur;
            }
            if (this.debug) {
              console.log(apiRoute, eachRouteMethod + " request");
            }
            let middleWare = [apiRoute];
            const classMiddleware = new eachFile['middleware'](this.packages)
            let overallMiddleware = classMiddleware["all"]();
            if (overallMiddleware && overallMiddleware.length > 0) {
              middleWare.push(...overallMiddleware);
            }
            if (classMiddleware[eachRoute]) {
              middleWare.push(...classMiddleware[eachRoute]());
            }
            this.app[eachRouteMethod](...middleWare, routeClass[eachRoute]);
            if (this.debug) {
              console.log("------------------------------------------------");
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
