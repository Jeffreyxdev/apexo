
import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import JobCard from "../Components/JobCard";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Components/ui/accordion";
import { Checkbox } from "../Components/ui/checkbox";
import { Label } from "../Components/ui/label";
import { Slider } from "../Components/ui/slider";
import { Separator } from "../Components/ui/separator";
import { useToast } from "../hooks/use-toast";
import { Filter, MapPin, Building, SearchX } from "lucide-react";

// Mock job data
const JOBS = [
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
    type: "Contract",
  },
  {
    id: 8,
    title: "HR Manager",
    company: "TalentFirst",
    location: "Remote",
    salary: "$90K - $110K",
    posted: "5 days ago",
    type: "Part-time",
  },
  {
    id: 9,
    title: "Content Writer",
    company: "ContentCrafters",
    location: "Remote",
    salary: "$60K - $80K",
    posted: "3 days ago",
    type: "Freelance",
  },
  {
    id: 10,
    title: "Sales Representative",
    company: "GrowthGenius",
    location: "Miami, FL",
    salary: "$75K - $95K + Commission",
    posted: "1 week ago",
    type: "Full-time",
  },
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Manager", "Executive"];
const locations = ["Remote", "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Chicago, IL", "Miami, FL"];

const Search: React.FC = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([50, 150]);
  const [filteredJobs, setFilteredJobs] = useState(JOBS);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    // Filter jobs based on search query and selected filters
    // This is a simple implementation for demo purposes
    const filtered = JOBS.filter(job => {
      const matchesQuery = searchQuery === "" || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesJobType = selectedJobTypes.length === 0 || 
        selectedJobTypes.includes(job.type);
      
      // For simplicity, we're not filtering by experience since it's not in our mock data
      
      const matchesLocation = selectedLocations.length === 0 || 
        selectedLocations.includes(job.location);
      
      // Basic salary filtering (this would be more sophisticated in a real app)
      const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, "").substring(0, 3));
      const matchesSalary = jobSalary >= salaryRange[0] && jobSalary <= salaryRange[1];
      
      return matchesQuery && matchesJobType && matchesLocation && matchesSalary;
    });
    
    setFilteredJobs(filtered);
    
    toast({
      title: "Search Results",
      description: `Found ${filtered.length} jobs matching your criteria`,
    });
  };
  
  const toggleJobType = (value: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  const toggleExperience = (value: string) => {
    setSelectedExperience(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  const toggleLocation = (value: string) => {
    setSelectedLocations(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  const handleJobClick = (id: number) => {
    toast({
      description: "Job details would open here",
    });
  };

  const clearFilters = () => {
    setSelectedJobTypes([]);
    setSelectedExperience([]);
    setSelectedLocations([]);
    setSalaryRange([50, 150]);
    handleSearch(query);
  };

  return (
    <div className="py-8 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Job</h1>
      
      {/* Search */}
      <div className="mb-8">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Job title, company, or keywords..."
          className="max-w-full"
        />
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500">
            {filteredJobs.length} jobs found {query && `for "${query}"`}
          </p>
          <Button 
            variant="outline" 
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters - Desktop */}
        <div className="hidden lg:block">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Filters</span>
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-chase-blue"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Type Filter */}
              <div>
                <h3 className="font-medium mb-3">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`job-type-${type}`} 
                        checked={selectedJobTypes.includes(type)}
                        onCheckedChange={() => toggleJobType(type)}
                      />
                      <Label htmlFor={`job-type-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Experience Level Filter */}
              <div>
                <h3 className="font-medium mb-3">Experience Level</h3>
                <div className="space-y-2">
                  {experienceLevels.map(level => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`exp-${level}`} 
                        checked={selectedExperience.includes(level)}
                        onCheckedChange={() => toggleExperience(level)}
                      />
                      <Label htmlFor={`exp-${level}`}>{level}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Salary Range Filter */}
              <div>
                <h3 className="font-medium mb-3">Salary Range (K$)</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={salaryRange}
                    max={300}
                    min={0}
                    step={10}
                    value={salaryRange}
                    onValueChange={setSalaryRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <div>${salaryRange[0]}K</div>
                    <div>${salaryRange[1]}K+</div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Location Filter */}
              <div>
                <h3 className="font-medium mb-3">Location</h3>
                <div className="space-y-2">
                  {locations.map(location => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`loc-${location}`} 
                        checked={selectedLocations.includes(location)}
                        onCheckedChange={() => toggleLocation(location)}
                      />
                      <Label htmlFor={`loc-${location}`}>{location}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full chase-gradient" 
                onClick={() => handleSearch(query)}
              >
                Apply Filters
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters - Mobile */}
        {filtersVisible && (
          <div className="lg:hidden mb-6">
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="job-type">
                    <AccordionTrigger className="hover:no-underline">Job Type</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {jobTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-job-type-${type}`} 
                              checked={selectedJobTypes.includes(type)}
                              onCheckedChange={() => toggleJobType(type)}
                            />
                            <Label htmlFor={`mobile-job-type-${type}`}>{type}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="experience">
                    <AccordionTrigger className="hover:no-underline">Experience Level</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {experienceLevels.map(level => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-exp-${level}`} 
                              checked={selectedExperience.includes(level)}
                              onCheckedChange={() => toggleExperience(level)}
                            />
                            <Label htmlFor={`mobile-exp-${level}`}>{level}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="salary">
                    <AccordionTrigger className="hover:no-underline">Salary Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="px-2 pt-4 pb-2">
                        <Slider
                          defaultValue={salaryRange}
                          max={300}
                          min={0}
                          step={10}
                          value={salaryRange}
                          onValueChange={setSalaryRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <div>${salaryRange[0]}K</div>
                          <div>${salaryRange[1]}K+</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="location">
                    <AccordionTrigger className="hover:no-underline">Location</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {locations.map(location => (
                          <div key={location} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-loc-${location}`} 
                              checked={selectedLocations.includes(location)}
                              onCheckedChange={() => toggleLocation(location)}
                            />
                            <Label htmlFor={`mobile-loc-${location}`}>{location}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="flex gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                  <Button 
                    className="flex-1 chase-gradient"
                    onClick={() => {
                      handleSearch(query); 
                      setFiltersVisible(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Job Listings */}
        <div className="lg:col-span-3">
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map(job => (
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
              
              <div className="flex justify-center mt-8">
                <Button variant="outline">
                  Load More Results
                </Button>
              </div>
            </div>
          ) : (
            <Card className="text-center p-12">
              <CardContent>
                <SearchX className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No Jobs Found</h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find any jobs matching your criteria. Try broadening your search.
                </p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
