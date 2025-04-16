import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { APP_CONFIG, IAppConfig } from 'src/app.config';
import { createLogger, transports, format, Logger } from 'winston';

export const WinstonProvider: Provider = {
  provide: Logger,
  inject: [ConfigService],
  useFactory: (/* configService: ConfigService */): Logger => {
    // const appConfig = configService.getOrThrow<IAppConfig>(APP_CONFIG);
    const logger = createLogger({
      level: 'info',
      format: format.combine(
        format.json(),
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message, ...meta }) => {
          let logMessage = `${timestamp} [${level}] - ${message}`;
          if (Object.keys(meta).length) {
            logMessage += ` ${JSON.stringify(meta)}`;
          }
          return logMessage;
        }),
      ),
      transports: [
        //
        // - Write all logs with importance level of `error` or higher to `error.log`
        //   (i.e., error, fatal, but not other levels)
        //
        new transports.File({ filename: 'error.log', level: 'error' }),
        //
        // - Write all logs with importance level of `info` or higher to `combined.log`
        //   (i.e., fatal, error, warn, and info, but not trace)
        //
        new transports.File({ filename: 'combined.log' }),
      ],
    });

    // if (appConfig.environment !== 'production') {
    //   logger.add(
    //     new transports.Console({
    //       format: format.simple(),
    //     }),
    //   );
    // }

    return logger;
  },
};
