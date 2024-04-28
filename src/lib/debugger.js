let instance;

/**
 * @enum {string}
 */
const logLevelStrings = {
   INFO: "INFO",
   ERROR: "ERROR",
   DEBUG: "DEBUG"
};

/**
 * @param {string} level - Takes INFO, ERROR, or DEBUG as arguments to set the logging level.
 *
 * @returns {logLevelStrings} - returns a log level validated to be accepted within the class.
 */
function validateLogLevel(level) {
   if (Object.values(logLevelStrings).includes(level)) {
      return level;
   }
   throw new Error(`Invalid log level: ${level}`);
}

class Debugger {
   /**
    * @param logLevel
    *
    * @class
    */
   constructor() {
      if (instance) {
         throw new Error("Only one debugger class is allowed");
      }
      instance = this;
      this.logLevel;
      this.moduleInfo = "Knowledge Recalled:";
      this.sessionLog = [];
      this.count = {
         info: 0,
         warn: 0,
         log: 0,
         debug: 0,
         error: 0,
      };
   }

   setLogLevel(logLevel) {
      const validatedLogLevel = validateLogLevel(logLevel);
      this.logLevel = validatedLogLevel;
      console.log(this.logLevel);
   }

   /**
    * @function
    *
    * @param {...*} params - accepts all types including objects, and prints to console.info();
    *
    * @returns {void}
    */
   info(...params) {
      if (this.logLevel === "INFO" || this.logLevel === "DEBUG" || this.logLevel === undefined) {
         const logInfo = `[INFO] ${this.getTime()} | ${this.moduleInfo}`;
         const logObjects = params.filter((param) => typeof param === 'object' || Array.isArray(param));
         const logEntry = [
            logInfo, ...logObjects
         ];
         this.sessionLog.push(logEntry);
         this.count.info++;
         console.info(`[INFO] ${this.getTime()} | ${this.moduleInfo}`, ...params, this.count, this.sessionLog);
      }
      return;
   }

   /**
    * @function
    *
    * @param {...*} params - accepts all types including objects, and prints to console.warn();
    *
    * @returns {void}
    */
   warn(...params) {
      const logInfo = `[WARN] ${this.getTime()} | ${this.moduleInfo}`;
      const logObjects = params.filter((param) => typeof param === 'object' || Array.isArray(param));
      const logEntry = [
         logInfo, ...logObjects
      ];
      this.sessionLog.push(logEntry);
      this.count.warn++;
      console.warn(`[WARN] ${this.getTime()} | ${this.moduleInfo}`, ...params, this.count, this.sessionLog);
   }

   /**
    * @function
    *
    * @param {...*} params - accepts all types including objects, and prints to console.log();
    *
    * @returns {void}
    */
   log(...params) {
      if (this.logLevel === "INFO" || this.logLevel === "DEBUG" || this.logLevel === undefined) {
         const logInfo = `[LOG] ${this.getTime()} | ${this.moduleInfo}`;
         const logObjects = params.filter((param) => typeof param === 'object' || Array.isArray(param));
         const logEntry = [
            logInfo, ...logObjects
         ];
         this.sessionLog.push(logEntry);
         this.count.log++;
         console.log(`[LOG] ${this.getTime()} | ${this.moduleInfo}`, ...params, this.count, this.sessionLog);
      }
   }

   /**
    * @function
    *
    * @param {...*} params - accepts all types including objects 
    *
    * @param {string} errorMessage - Passes a message into the Error constructor
    *
    * @param {Error} cause - Pass an error returned by a function or method into the Error.cause field
    *
    * @example
    * ```
    *   try {
    *     performSomeMethod();
    *   } catch (err) {
    *     log.catchError(someObject, "an error has occured", err);
    *   }
    * ```
    */
   catchError(errorMessage, cause, ...params) {
      const logInfo = `[ERROR] ${this.getTime()} | ${this.moduleInfo}`;
      const logObjects = params.filter((param) => typeof param === 'object' || Array.isArray(param));
      const logEntry = [
         logInfo, ...logObjects, new Error(errorMessage, { cause })
      ];
      this.sessionLog.push(logEntry);
      this.count.error++;
      console.error(`[ERROR] ${this.getTime()} | ${this.moduleInfo}`, ...params, new Error(errorMessage, { cause }), this.count, this.sessionLog);
   }

   /**
    * @function 
    *
    * @param {...*} params - accept all types including objects and prints to console.error();
    *
    *@returns {void}
    */
   error(...params) {
      const logInfo = `[ERROR] ${this.getTime()} | ${this.moduleInfo}`;
      const logObjects = params.filter((param) => typeof param === 'object' || Array.isArray(param));
      const logEntry = [
         logInfo, ...logObjects, new Error()
      ];
      this.sessionLog.push(logEntry);
      this.count.error++;
      console.debug(`[ERROR] ${this.getTime()} | ${this.moduleInfo}`, ...params, new Error(), this.count, this.sessionLog);
   }

   /**
    * @function
    *
    * @param {...*} params - accepts all types including objects and prints to console.debug();
    *
    * @returns {void}
    */
   debug(...params) {
      if (this.logLevel === undefined || this.logLevel === "DEBUG") {
         const logInfo = `[DEBUG] ${this.getTime()} | ${this.moduleInfo}`;
         const logObjects = params.filter((param) => typeof param === 'object' || Array.isArray(param));
         const logEntry = [
            logInfo, ...logObjects
         ];
         this.sessionLog.push(logEntry);
         this.count.debug++;
         console.debug(`[DEBUG] ${this.getTime()} | ${this.moduleInfo}`, ...params, this.count, this.sessionLog);
      }
   }

   /**
    * @private
    *
    * @function
    *
    * @returns {string} - Returns time as a string in `HH:MM:SS.mmm` based on local time
    */
   getTime() {
      const now = new Date();
      const time = now.toTimeString().slice(0, 8);
      const millisecond = now.getMilliseconds();

      return `${time}.${millisecond.toString().padStart(3, '0')}`;
   }


}
// const logLevelSettingParam = getSetting("debug");
// console.log(logLevelSettingParam);
export const log = new Debugger();