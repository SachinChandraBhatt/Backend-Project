class ApiError extends Error {

  //   constructor(
//     statusCode,
//     message = "Something went wrong",
//     error = [],
//     statck = ""
//   ) {
//     super(message);
//     this.statusCode = statusCode;
//     this.data = null;
//     //check this.data
//     this.message = message;
//     this.success = false;
//     this.errors = error;

//     if (statck) {
//       this.stack = statck;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }

  constructor(statusCode , massage="something went wrong" , error=[] , stack = ""){
    super(massage)
    this.statusCode = statusCode;
    this.data = null;
    this.message = massage
    this.success = false
    this.errors = error
    if (stack) {
        this.stack = stack;
    } else {
        Error.captureStackTrace(this , this.constructor);
    }
  }
}

export { ApiError };
