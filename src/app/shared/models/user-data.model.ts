export class UserData {
  name: string;
  email: string;
  avatar: string;

  constructor({
                name = null,
                email = null,
                avatar = null
  } = {}) {
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }
}
