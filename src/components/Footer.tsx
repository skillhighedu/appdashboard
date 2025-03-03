const Footer = () => {
  return (
    <footer className="w-full p-4 bg-primary rounded-t-3xl  dark:bg-gray-800 text-center text-gray-600 dark:text-gray-300 shadow-md">
      <div className="h-48 "></div>© {new Date().getFullYear()} Skillhigh. All
      rights reserved.
    </footer>
  );
};

export default Footer;
