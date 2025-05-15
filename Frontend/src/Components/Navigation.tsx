import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { itemVariants, sideVariants } from "../Utils/Motion";
import { Link } from "react-router-dom";

const Navigation = () => {
  const controls = useAnimation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="nav-full w-full fixed top-0 left-0 right-0 bg-black border-b border-b-current  z-50">
        <div className="nav-container flex justify-between w-[80%] mx-auto">
          <div className="flex items-center">
           <h3 className="text-white text-2xl font-semibold px-4 py-2 inline-block rounded ">ApexoAI</h3>
          </div>

          <ul className="hidden md:flex items-center space-x-8">
           <Link to={'/'}  className="text-white hover:text-gray-900 "> <li>Home</li></Link>
        <Link to={'/features'}  className="text-white hover:text-gray-900"><li>Features</li></Link>
       <Link to={'/pricing'}  className="text-white hover:text-gray-900"> <li>Pricing</li></Link>
          </ul>

          <Link to="/">
            <motion.button
              
              onHoverEnd={() => controls.start({ x: 0 })}
              animate={controls}
              className="w-[80px] h-[40px]  bg-neutral-900  text-white rounded-[50px] text-[17px] mt-3 mb-2 "
            >
              Log in
            </motion.button>
          </Link>
{/* 
          <button className="w-[101px] h-[40px] bg-[#ff5242] hover:bg-[#ff6b5b] text-white rounded-xl text-[17px] mt-3 mb-2">
            Sign out
          </button> */}
        </div>
      </nav>

      {/* Mobile Nav Toggle */}
      <nav className="md:hidden flex justify-center fixed z-10 w-[90vw] h-[15vh]">
        <div className="nav-container pt-5 flex justify-between w-[90%]">
         <h3 className="text-white text-2xl font-semibold mt-[-5vh] ml-[-3vw] inline-block rounded ">ApexoAI</h3>
          <div onClick={handleMobileMenuToggle}>
            {isMobileMenuOpen ? (
              <MdOutlineClose className="w-[40px] h-[40px] p-2 cursor-pointer mt-[-4vh]" />
            ) : (
              <div className="flex justify-center items-center h-[100%] pb-9">
                <IoMdMenu className="w-[40px] h-[40px] p-2 cursor-pointer mt-[-11vh]" />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Nav Content */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            style={{ overflow: "hidden" }}
            initial={{ width: 0 }}
            animate={{ width: 500 }}
            exit={{
              width: 0,
              transition: { delay: 0.3, duration: 0.1 },
            }}
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
              className="container md:hidden flex flex-col fixed bg-[#27272759] text-white w-[60vw] ml-[35vw] mt-[10vh] h-[350px] mr-[-3vw]  z-10 rounded-2xl pt-4"
            >
              <ul className="text-[20px] mr-[-20px] p-5" onClick={handleMobileMenuToggle}>
                <motion.li variants={itemVariants} className="mb-6">
                  <Link to="/">Home</Link>
                </motion.li>
                <motion.li variants={itemVariants} className="mb-6">
                  <Link to="/">Features</Link>
                </motion.li>
                <motion.li variants={itemVariants} className="mb-6">
                  <Link to="/">Pricing</Link>
                </motion.li>
                <motion.li variants={itemVariants} className="mb-6">
                  Contact
                </motion.li>
              </ul>

              <Link to="/waitlist">
                <motion.button
                  variants={itemVariants}
                  className="w-[150px] h-[48px] bg-[#272727a9] text-white rounded-xl text-[14px]  "
                >
                  Request Demo
                </motion.button>
              </Link>

      
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
