import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div className="bg-white min-h-screen dark:bg-gray-900">
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
