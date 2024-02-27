import SupportedLoggers from "./SupportedLoggers";
import ILogger from "./BaseLogger";

export class AderantLogger {

  serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  createLogger(env: string, options: Record<string, string>): ILogger {
    if (SupportedLoggers[this.serviceName]) {
      return SupportedLoggers[this.serviceName]({ env, options });
    }

    throw new Error(`Logger for ${this.serviceName} is not supported`);
  }
}