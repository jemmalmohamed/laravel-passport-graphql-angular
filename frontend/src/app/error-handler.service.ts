import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  errors: any;
  constructor() { }


  handleError(error) {

    if (error.graphQLErrors) {
      console.log(`[Network error]: ${error.graphQLErrors}`);
      error.graphQLErrors.map((extensions, message, debugMessage) => {

        if (extensions['category'] === 'validation') {
          this.errors = extensions['extensions'].validation;
        } else {
          this.errors = extensions['debugMessage'];

        }
      }
      );
    }

    if (error.networkError) {
      console.log(`[Network error]: ${error.networkError}`);
      console.log(error.networkError);

      return error.networkError;
    }
    if (error.operation) {
      console.log(`[Operation error]: ${error.operation}`);
      return error.operation;
    }
    if (error.response) {
      console.log(`[Response error]: ${error.response}`);
      return error.response;
    }

    return this.errors;
  }
}
