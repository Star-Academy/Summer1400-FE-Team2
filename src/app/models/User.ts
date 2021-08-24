export default class User {
  constructor(user: any) {
    this.id = user.id;
    this.username = user.username;
    this.token = user.token;
    this.email = user.email;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.avatar = user.avatar?user.avatar:'../assets/Icons/user-profile.svg';
    this.gender = user.gender;
    this.birthDate = user.birthDate;
    this.password = user.password;
  }
  public id: number;
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public token: string;
  public avatar: string;
  public gender: Boolean;
  public birthDate: string;
  public password: string;
}
