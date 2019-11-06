export class LauncherData{
    environment:string;
    client:string;
    language:string;
    userFirstName:string;
    userId:string;
    pointBalance:number;
    
    constructor(environment,client,language,userFirstName,userId,pointBalance){
        this.environment = environment;
        this.client = client;
        this.language = language;
        this.pointBalance= pointBalance;
        this.userFirstName = userFirstName;
        this.userId = userId;
    }
}