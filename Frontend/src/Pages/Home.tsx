
import Heroui from '../Components/Heroui'
import Navigation from '../Components/Navigation'
import Hero from './Hero'
const Home = () => {
  return (
    <div className='w-full'>
      <Navigation/>
      <Hero/>
      <Heroui/>
    </div>
  )
}

export default Home