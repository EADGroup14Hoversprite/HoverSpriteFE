/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();

    this.type = message;
  }
}

export class InvalidEmailPasswordError extends AuthError {
  static type = "Wrong email or password";
}

export class NotExistEmail extends AuthError {
  static type = "This email not registered";
}

export class UserAlreadyExistsError extends AuthError {
  static type = "User already exists";
}