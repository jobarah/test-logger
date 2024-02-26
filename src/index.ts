import SupportedLoggers from "./SupportedLoggers";
import ILogger from "./BaseLogger";

export class AderantLogger {

  serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  createLogger(env: string, options: Record<string, string>): ILogger {
    if (SupportedLoggers[this.serviceName]) {
      return new SupportedLoggers[this.serviceName](env, options);
    }

    return new console.log(env, options);
  }
}