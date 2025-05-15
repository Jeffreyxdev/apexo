
import earth_dark from '../assets/earth_dark.svg'
import { SectionWrapper } from "../hoc"
import { zoomIn } from "../Utils/Motion"
import { motion } from "framer-motion"
import AOS from 'aos'
import "aos/dist/aos.css"
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { GoArrowUpRight } from "react-icons/go";
import ParticlesBackground from '../Components/ParticlesBackground'
function Hero() {

  useEffect (() => {
    AOS.init({duration: 1500});
}, []);

  return (
    
     <div className="subIndex flex  items-center w-max  bg-black ml-[-150px] mt-[-40px]">
      <motion.img 
      className='spin-slow'
      variants={zoomIn('0.2', '1' )} 
      src={earth_dark} 
      alt= "apexoai hero" />

      <div data-aos="flip-up"
       className="index-container ml-[-100px]">
        <h2 className="text-[50px] font-bold leading-[57px] tracking-[-1.56px] mb-[30px] w-[14.7cm] text-white">Introducing Apexo AI</h2>
        <p className=" text-[17px] leading-[30px] text-white tracking-[-0.63px]  w-[100%]">Revolutionizing Careers with Smart Resume and Job Matching</p>
        <p className="bg-[#27272777] font-semibold text-lg  ml-[200px] w-[230px]  h-[35px] mt-3 7 rounded-full  justify-center flex items-center gap-2 
         pl-2.5 hover:bg-gray-100 transition-colors  text-[17px] text-[#5454d4] cursor-pointer  "><Link to="/waitlist">Request Demo </Link><GoArrowUpRight/></p>
      </div><ParticlesBackground/> 
      
    </div>


    
  )
}

export default  SectionWrapper(Hero, '')