
import { Typewriter } from 'react-simple-typewriter';
const Heroui = () => {
  return (
  

     <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
  <div className="glass-card overflow-hidden rounded-xl shadow-2xl mx-auto max-w-4xl border border-white/10">
    {/* Top Bar */}
    <div className="bg-gradient-to-r from-apexo-darker-purple to-apexo-dark-purple p-3">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
    </div>

    {/* Terminal Body */}
    <div className="p-6 bg-apexo-darker-purple font-mono text-sm text-white h-auto">
      <div className="space-y-4">
        {/* Command 1 */}
        <div className="flex items-center">
          <span className="text-green-400">apexo-ai $</span>
          <div className=' container typing-container'>
          <span className="ml-2 typing-text"><Typewriter
      words={['Help me build a Resume based off my qualification.', ]}
      loop
      cursor
      cursorStyle="_"
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={1500}
    /></span></div>
        </div>

        {/* Output Block */}
        <div className="bg-black/30 p-4 rounded border border-white/5">
          <p className="mb-2">📊 Analyzing market data for tech startups in 2025...</p>
          <p className="mb-2">✅ Found 3,542 relevant data points across 27 industries</p>
          <p className="mb-2">🔍 Detecting emerging patterns and opportunities...</p>
          <p className="font-semibold text-apexo-light-purple mt-4">Key insights for tech startups in 2025:</p>
          <ul className="list-disc pl-5 text-gray-300 space-y-1 mt-2">
            <li>AI integration expected to drive 43% higher growth rates</li>
            <li>Remote-first companies showing 31% better talent retention</li>
            <li>Sustainability-focused startups attracting 2.7x more funding</li>
            <li>Edge computing solutions projected for 187% market expansion</li>
          </ul>
        </div>

        {/* Command 2 */}
        <div className="flex items-center">
          <span className="text-green-400">apexo-ai $</span>
          <span className="ml-2 typing-effect">Generate visualization of these trends</span>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Heroui