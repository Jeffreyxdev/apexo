
import { Routes, Route } from "react-router-dom"
import { Toaster } from "./Components/ui/toaster";
import { TooltipProvider } from "./Components/ui/tooltip";
import Search from "./Pages/Search"
import ResumeBuilder from "./Pages/ResumeBuilder"
import JobTracker from "./Pages/JobTracker"
import InterviewPrep from "./Pages/InterviewPrep"
import Profile from "./Pages/Profile"
import NotFound from "./Pages/NotFound"
import { Toaster as Sonner } from "./Components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./Pages/Home";
import Waitlist from "./Pages/Waitlist";

const queryClient = new QueryClient();
const App = () => {
  // const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
       
          <div className="flex min-h-screen w-full bg-black max-w-max ">
            
            <div className="flex-1 ">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                <Route path="/job-tracker" element={<JobTracker />} />
                <Route path="/interview-prep" element={<InterviewPrep />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/waitlist" element={<Waitlist/>}/>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
          {/* add this to the main app */}
          {/* <AIAssistant open={aiAssistantOpen} onOpenChange={setAiAssistantOpen} />*/}
      </TooltipProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
