import "../styles/globals.css";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import store from "../redux/store";
import Auth from "../components/Auth";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Auth />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
