const fs = require('fs');
const path = require('path'); 

class AutoRoute {
  static instance = () => {
    if (this.newInstance) return
    this.routePath = "src/routes";
    this.dirname = process.cwd() + "/";
    this.debug = true;
    this.apiPrefix = "api";
    this.newInstance = this.newInstance ? this.newInstance : new this();
    return this;
  };

  static setDebugger = (debug) => {
    this.debug = debug;
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
          const eachFile = require(filePath);
          let route = file.split(".")[0]
            .replace("index", "")
            .replace(/\s+/g, "");
          for (const eachRoute in eachFile["route"]) {
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
            let overallMiddleware = eachFile['middleware']["all"];
            if (overallMiddleware && overallMiddleware.length > 0) {
              middleWare.push(...overallMiddleware);
            }
            if (eachRoute in eachFile['middleware']) {
              middleWare.push(eachFile['middleware'][eachRoute]);
            }
            this.app[eachRouteMethod](...middleWare, eachFile["route"][eachRoute]);
            if (this.debug) {
              console.log("------------------------------------------------");
            }
          }
        }
      });
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
