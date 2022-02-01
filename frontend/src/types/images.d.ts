declare global {
    interface Window {
      api?: any;
      ReactNativeWebView?: any;
      opera?: any;
      document?:any;
    }
  }
  declare module "*.pdf";
  declare module "*.jpg";
  declare module "*.jpeg";
  declare module "*.svg";
  declare module "*.png" {
    const value: any;
    export = value;
  }
  declare module "rimble-ui";
  declare module "react-jazzicon";
  declare module "qrcode";
  declare module "uuid";
  declare module "nprogress";
  declare module "lodash";
  declare module "react-tabs";