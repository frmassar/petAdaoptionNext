type StatusCode = 400 | 404 | 500 | 401;

export const getHttpStatusMessage = (code: StatusCode) => {
  switch (code) {
    case 400:
      return "Bad request.";
    case 404:
      return "Not found.";
    case 500:
      return "Internal server error.";
      case 401:
        return "Unauthorized";
    default:
      return "unknow error";
  }
};
