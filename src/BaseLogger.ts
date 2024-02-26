import LoggerInterface from './ILogger';

abstract class ILogger implements LoggerInterface {
  env: string;
  options: Record<string, string>;
  loggerClient: ILogger;

  constructor(env: string, options: any) {
    this.env = env;
    this.options = options;
  }

  log(message: string): void {}

  info(message: string): void {}

  warning(message: string): void {}

  error(message: string): void {}
}

export default ILogger;
