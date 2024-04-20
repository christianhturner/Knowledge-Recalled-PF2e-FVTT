let instance;
/**
 * @typedef logLevel
 */

class Debugger {
   constructor() {
      if (instance) {
         throw new Error("Only one debugger class is allowed");
      }
      instance = this;
      this.moduleInfo = "Knowledge Recalled:";
      this.sessionLog = [];
   }

   info(...params) {
      const logInfo = `[INFO] ${this.getTime()} | ${this.moduleInfo}`;
      const logObjects = params.filter(param => typeof param === 'object' || Array.isArray(param));
      const logEntry = [logInfo, ...logObjects];
      this.sessionLog.push(logEntry);
      console.info(`[INFO] ${this.getTime()} | ${this.moduleInfo}`, ...params, this.sessionLog);
   }

   warn(...params) {
      const logInfo = `[WARN] ${this.getTime()} | ${this.moduleInfo}`;
      const logObjects = params.filter(param => typeof param === 'object' || Array.isArray(param));
      const logEntry = [logInfo, ...logObjects];
      this.sessionLog.push(logEntry);
      console.warn(`[WARN] ${this.getTime()} | ${this.moduleInfo}`, ...params);
   }

   log(...params) {
      const logInfo = `[LOG] ${this.getTime()} | ${this.moduleInfo}`;
      const logObjects = params.filter(param => typeof param === 'object' || Array.isArray(param));
      const logEntry = [logInfo, ...logObjects];
      this.sessionLog.push(logEntry);

      console.log(`[LOG] ${this.getTime()} | ${this.moduleInfo}`, ...params, this.sessionLog);
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
      const logObjects = params.filter(param => typeof param === 'object' || Array.isArray(param));
      const logEntry = [logInfo, ...logObjects, new Error(errorMessage, { cause })];
      this.sessionLog.push(logEntry);
      if (cause) {
         console.error(`[ERROR] ${this.getTime()} | ${this.moduleInfo}`, ...params, new Error(errorMessage, { cause }));
      } else {
         console.error(`[ERROR] ${this.getTime()} | ${this.moduleInfo}`, ...params, new Error(errorMessage));
      }
   }

   /**DEBUG
    * @function 
    *
    * @param {...*} params - accept all types including objects
    *
    *@returns {void}
    */
   error(...params) {
      const logInfo = `[ERROR] ${this.getTime()} | ${this.moduleInfo}`;
      const logObjects = params.filter(param => typeof param === 'object' || Array.isArray(param));
      const logEntry = [logInfo, ...logObjects, new Error()];
      this.sessionLog.push(logEntry);
      console.debug(`[ERROR] ${this.getTime()} | ${this.moduleInfo}`, ...params, new Error());
   }

   /**
    * @function
    *
    * @param {...*} params - accepts all types including objects
    *
    * @returns {void}
    */
   debug(showStack, ...params) {
      const logInfo = `[DEBUG] ${this.getTime()} | ${this.moduleInfo}`;
      const logObjects = params.filter(param => typeof param === 'object' || Array.isArray(param));
      const logEntry = [logInfo, ...logObjects];
      this.sessionLog.push(logEntry);
      console.debug(`[DEBUG] ${this.getTime()} | ${this.moduleInfo}`, ...params);
   }

   /**
   * @private
   * @function
   * @return {string} - Returns time as a string in `HH:MM:SS.mmm` based on local time
   */
   getTime() {
      const now = new Date();
      const time = now.toTimeString().slice(0, 8);
      const millisecond = now.getMilliseconds();

      return `${time}.${millisecond.toString().padStart(3, '0')}`;
   }

   //    /**
   //     * @private
   //     * @function
   //     * @return {string} - Returns source file and line number, `File: example.js, Line: 5`
   //     */
   //    getFileAndLine = () => {
   //       const error = String(new Error());
   //       if (!error) {
   //          try {
   //             throw new Error();
   //          } catch (e) {
   //             error = e;
   //          }
   //       }
   //       const stackLines = error.split('\n');
   //       const callerLine = stackLines[2].trim();
   //       const matchResult = callerLine.match(/\s*at\s+\S+\s+\((.*?)\)/);
   //       if (matchResult) {
   //          const [, filePathLine] = matchResult;
   //          const [fileName, lineNumber, columnNumber] = filePathLine.split(/:(\d+):(\d+)/);
   //          return `File: ${fileName}, Line: ${lineNumber}, Column: ${columnNumber}`;
   //       }
   //       return 'File and line information not available';
   //    }

}


export const log = Object.freeze(new Debugger());