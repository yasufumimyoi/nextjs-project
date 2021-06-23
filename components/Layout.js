import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-11/12 mx-auto xl:max-w-7xl xl:mx-auto">
      <Header />
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
