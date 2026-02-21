export const environment = {
  production: __DEV__ ? false : true,
  apiUrl: __DEV__
    ? "http://localhost:5000/v1/api"
    : "https://your-production-api.com",
  subscriberId: "protocol.lbnp.preprod.aarambh.cloud",
};
