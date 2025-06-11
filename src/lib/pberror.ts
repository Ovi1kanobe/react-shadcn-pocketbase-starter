/* eslint-disable */
interface PocketBaseErrorData {
  url: string;
  status: number;
  response: {
    code: number;
    message: string;
    data: any;
    mfaId?: string; // Optional field for MFA ID
  };
  isAbort: boolean;
  originalError: any;
}

class PocketBaseError extends Error implements PocketBaseErrorData {
  url: string;
  status: number;
  response: {
    code: number;
    message: string;
    data: any;
    mfaId?: string; // Optional field for MFA ID
  };
  isAbort: boolean;
  originalError: any;

  constructor(
    url: string,
    status: number,
    response: { code: number; message: string; data: any },
    isAbort: boolean,
    originalError: any
  ) {
    super(response.message); // Set the error message
    this.name = "PocketBaseError"; // Set the error name
    this.url = url;
    this.status = status;
    this.response = response;
    this.isAbort = isAbort;
    this.originalError = originalError;

    // Maintains proper stack trace (only available on V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PocketBaseError);
    }
  }
}

export default PocketBaseError;
