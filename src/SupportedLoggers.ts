import {
  AzureLogger,
  // other loggers
} from './Loggers/index';
import BaseLogger from './BaseLogger';

interface LoggerArguments {
  env: string;
  options: Record<string, string>;
}

const SupportedLoggers: Record<string, (args: LoggerArguments) => BaseLogger> = {
  'web': (args: LoggerArguments) => new AzureLogger(args.env, args.options),
};

export default SupportedLoggers;
