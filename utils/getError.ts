export const getError = (error: any) => {
  let message = "Something Went Wrong";
  let statusCode = 500;
  if (error instanceof Error) {
    console.error(error);
    statusCode = 400;
    message = error.message;
    return {
      statusCode,
      message,
    };
  }

  return { statusCode, message };
};
