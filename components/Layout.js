import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { GlobalProvider } from "../context/GlobalState";

const Layout = ({ children }) => {
  return (
    <GlobalProvider>
      <div className="w-11/12 mx-auto xl:max-w-7xl xl:mx-auto">
        <Header />
        <Nav />
        {children}
        <Footer />
      </div>
    </GlobalProvider>
  );
};

export default Layout;
