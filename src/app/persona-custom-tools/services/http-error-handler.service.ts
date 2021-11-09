import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

/**
 * This service handles the error response.
 */
@Injectable()
export class HttpErrorHandlerService {
  constructor() {}

  public handleError(error: any) {
    let errorDetails;
    console.log(error);
    let message;
    if (error) {
      errorDetails = error;
      message = errorDetails.errorMessage;
    } else {
      message = "Error occured!";
    }
    return throwError(message);
  }

  public handleErrorData(error: any) {
    let errorDetails;
    errorDetails = error ? error : {};
    return throwError(errorDetails);
  }
}
