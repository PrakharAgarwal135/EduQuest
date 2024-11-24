import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    // HTTP method (e.g., GET, POST, PUT, DELETE)
    method,

    // Endpoint URL
    url,

    // Request body (for POST/PUT requests)
    data: bodyData || null,

    // Additional headers (e.g., Authorization)
    headers: headers || null,

    // Query parameters (for GET requests)
    params: params || null,
  });
};
