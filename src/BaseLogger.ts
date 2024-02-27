import ILogger from './ILogger';

abstract class BaseLogger implements ILogger {
  env: string;
  options: Record<string, string>;
  loggerClient: ILogger;

  constructor(env: string, options: any) {
    this.env = env;
    this.options = options;
  }

  abstract log(message: string): void;

  abstract info(message: string): void;

  abstract warning(message: string): void;

  abstract error(message: string): void;
}

export default BaseLogger;
