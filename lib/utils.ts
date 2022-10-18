export const fetcher = async (url: string, params: RequestInit = {}) => {
  // move in utils
  return await (await fetch(url, params)).json();
};

export const parseQueryParam = (param: string | string[] | undefined) => {
  return Array.isArray(param) ? param[0] : param;
};
