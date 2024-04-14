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
   }

   info(...params) {
      console.info(`[INFO] ${this.getTime()} | ${this.moduleInfo}`, ...params);
   }

   warn(...params) {
      console.warn(`[WARN] ${this.getTime()} | ${this.moduleInfo}`, ...params);
   }

   log(...params) {
      console.log(`[LOG] ${this.getTime()} | ${this.moduleInfo}`, ...params);
   }

   error(...params) {
      console.error(`[ERROR] ${this.getTime()} | ${this.moduleInfo}`, ...params);
   }

   debug(...params) {
      console.debug(`[ERROR] ${this.getTime()} | ${this.moduleInfo}`, ...params);
   }

   getTime() {
      const now = new Date();
      const time = now.toTimeString().slice(0, 8);
      const millisecond = now.getMilliseconds();

      return `${time}.${millisecond.toString().padStart(3, '0')}`;
   }

}


export const log = Object.freeze(new Debugger());