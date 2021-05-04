export class ResponseModel<T> {
  content?: T;
  message?: string;
  statusCode?: number;

  constructor(content?: T, message?: string, statusCode?: number) {
    this.content = content;
    this.message = message;
    this.statusCode = statusCode;
  }
}
