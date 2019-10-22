export class UserData {
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber: number;

  constructor({
                displayName = null,
                email = null,
                photoURL = null,
                phoneNumber = null,
  } = {}) {
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
    this.phoneNumber = phoneNumber;
  }
}
