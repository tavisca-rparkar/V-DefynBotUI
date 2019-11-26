export class LauncherData {
  environment: string;
  client: string;
  language: string;
  userFirstName: string;
  userId: string;
  pointBalance: number;
  logInfo: any;
  error: string;

  constructor(
    environment: string,
    client: string,
    language: string,
    userFirstName: string,
    userId: string,
    pointBalance: number,
    logInfo: any,
    error: string
  ) {
    this.environment = environment;
    this.client = client;
    this.language = language;
    this.pointBalance = pointBalance;
    this.userFirstName = userFirstName;
    this.userId = userId;
    this.logInfo = logInfo;
    this.error = error;
  }
}
