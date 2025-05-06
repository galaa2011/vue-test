// 责任链模式
enum LogLevel {
  INFO,
  DEBUG,
  ERROR,
}

abstract class Logger {
  protected nextLogger: Logger | null = null;
  setNext(logger: Logger): Logger {
    this.nextLogger = logger;
    return logger; // 支持链式调用
  }

  log(level: LogLevel, message: string): void {
    if (this.handle(level, message) && this.nextLogger) {
      this.nextLogger.log(level, message);
    }
  }

  abstract handle(level: LogLevel, message: string): boolean;
}

class InfoLogger extends Logger {
  handle(level: LogLevel, message: string): boolean {
    if (level === LogLevel.INFO) {
      console.log(`INFO: ${message}`);
      return false;
    }
    return true;
  }
}

class DebugLogger extends Logger {
  handle(level: LogLevel, message: string): boolean {
    if (level === LogLevel.DEBUG) {
      console.log(`DEBUG: ${message}`);
      return false;
    }
    return true;
  }
}

class ErrorLogger extends Logger {
  handle(level: LogLevel, message: string): boolean {
    if (level === LogLevel.ERROR) {
      console.log(`ERROR: ${message}`);
      return false;
    }
    return true;
  }
}

// 使用责任链模式
const infoLogger = new InfoLogger();
const debugLogger = new DebugLogger();
const errorLogger = new ErrorLogger();

infoLogger.setNext(debugLogger).setNext(errorLogger);
infoLogger.log(LogLevel.INFO, "This is an info message.");
infoLogger.log(LogLevel.DEBUG, "This is a debug message.");
infoLogger.log(LogLevel.ERROR, "This is an error message.");
// Output:
// INFO: This is an info message.
// DEBUG: This is a debug message.
// ERROR: This is an error message.
