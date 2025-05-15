
import React, { useState } from "react";
import { Button } from "../Components/ui/button";
import SearchBar from "../Components/SearchBar";
import JobCard from "../Components/JobCard";
import AIAssistant from "../Components/AIAssistant";
import { useToast } from "../hooks/use-toast";
import { Sparkles } from "lucide-react";

// Mock job data
const FEATURED_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120K - $150K",
    posted: "2 days ago",
    type: "Full-time",
    featured: true,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateSoft",
    location: "Remote",
    salary: "$110K - $130K",
    posted: "Just now",
    type: "Full-time",
    featured: true,
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "New York, NY",
    salary: "$90K - $115K",
    posted: "1 day ago",
    type: "Full-time",
    featured: true,
  },
];

const RECENT_JOBS = [
  {
    id: 4,
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Austin, TX",
    salary: "$115K - $140K",
    posted: "3 days ago",
    type: "Full-time",
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "AI Solutions",
    location: "Remote",
    salary: "$125K - $155K",
    posted: "2 days ago",
    type: "Full-time",
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    salary: "$110K - $135K",
    posted: "4 days ago",
    type: "Full-time",
  },
  {
    id: 7,
    title: "Marketing Specialist",
    company: "BrandBoost",
    location: "Chicago, IL",
    salary: "$70K - $85K",
    posted: "1 week ago",
    type: "Full-time",
  },
  {
    id: 8,
    title: "HR Manager",
    company: "TalentFirst",
    location: "Remote",
    salary: "$90K - $110K",
    posted: "5 days ago",
    type: "Full-time",
  },
];

const Index: React.FC = () => {
  const { toast } = useToast();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  
  const handleSearch = (query: string) => {
    toast({
      title: "Search initiated",
      description: `Searching for "${query}"`,
    });
  };
  
  const handleJobClick = (id: number) => {
    toast({
      description: "Job details would open here",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-chase-DEFAULT py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Find Your <span className="text-chase-teal">Dream Job</span> With AI
          </h1>
          <p className="text-white/80 mb-8 text-lg md:text-xl max-w-2xl mx-auto">
            Let Chase.AI match you with the perfect opportunities tailored to your skills and preferences
          </p>
          
          <div className="flex flex-col items-center">
            <SearchBar 
              onSearch={handleSearch} 
              className="mb-6"
              placeholder="Job title, company, or keywords..." 
            />
            
            <Button 
              onClick={() => setAiAssistantOpen(true)}
              variant="outline" 
              className="bg-white text-chase-DEFAULT hover:bg-white/90"
            >
              <Sparkles className="mr-2 h-4 w-4 text-chase-blue" />
              Get AI Career Advice
            </Button>
          </div>
        </div>
      </section>
      
      {/* Jobs Section */}
      <section className="flex-1 py-12 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Featured Opportunities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_JOBS.map(job => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                posted={job.posted}
                type={job.type}
                featured={job.featured}
                onClick={() => handleJobClick(job.id)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Jobs</h2>
          <div className="space-y-4">
            {RECENT_JOBS.map(job => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                posted={job.posted}
                type={job.type}
                className="md:flex-row"
                onClick={() => handleJobClick(job.id)}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" className="mx-auto">
              Load More Jobs
            </Button>
          </div>
        </div>
      </section>
      
      {/* AI Assistant Dialog */}
      <AIAssistant open={aiAssistantOpen} onOpenChange={setAiAssistantOpen} />
    </div>
  );
};

export default Index;
