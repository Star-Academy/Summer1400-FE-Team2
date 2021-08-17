export default class User{
    constructor(user:any){
        this.id = user.id;
        this.username = user.username;
        this.token = user.token;
        this.email = user.email;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.avatar = user.avatar;
        this.gender = user.gender;
        this.birthDate = user.birthDate;
        this.password = user.password;
    }
    public id:number;
    public username:string;
    public first_name:string;
    public last_name:string;
    public email:string;
    public token:string;
    public avatar:string;
    public gender:Boolean;
    public birthDate:string;
    public password:string;
}