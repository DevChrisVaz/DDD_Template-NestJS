export abstract class LoggerService {
  abstract info(message: string, context?: any): void;
  abstract warning(message: string, context?: any): void;
  abstract error(message: string, context?: any): void;
}
