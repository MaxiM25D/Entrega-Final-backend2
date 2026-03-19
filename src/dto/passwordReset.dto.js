export class PasswordResetDTO {
  constructor(data) {
    this.email = data.email
    this.newPassword = data.newPassword
    this.token = data.token
  }
}