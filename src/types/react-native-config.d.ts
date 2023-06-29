declare module 'react-native-config' {
  interface Env {
    REACT_APP_API_URL: string;
  }
  const Config: Env;
  export default Config;
}
