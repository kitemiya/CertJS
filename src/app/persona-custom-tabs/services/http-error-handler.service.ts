/**
 * This service handles the error response.
 */
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class HttpErrorHandlerService {
  constructor() {}

  public handleError(error: Response | any) {
    let errorDetails;
    let message;
    if (error) {
      errorDetails = error;
      message = errorDetails.errorMessage;
    } else {
      message = "Error occured!";
    }
    return throwError(message);
  }

  public handleErrorData(error: Response | any) {
    let errorDetails;
    errorDetails = error ? error : {};
    return throwError(errorDetails);
  }
}
