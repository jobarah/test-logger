import LoggerInterface from './LoggerInterface';

abstract class ILogger implements LoggerInterface {

  // logger: LoggerInterface;
  env: string;
  options: Record<string, string>;
  loggerClient: ILogger;

  /*
    constructor(loggingLibraryInstance: LoggerInterface)
    export default Logger = new AderantLogger(supportedLoggers[env](options));
  */

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
