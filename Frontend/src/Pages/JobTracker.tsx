
import React, { useState } from "react";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../Components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/ui/dialog";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { Textarea } from "../Components/ui/textarea";
import { Badge } from "../Components/ui/badge";
import { useToast } from "../hooks/use-toast";
import { 
  AlignLeft, 
  Calendar, 
  Plus, 
  Building,
  Clock,
  MapPin,
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  Clock3,
  ListFilter
} from "lucide-react";

interface Job {
  id: string;
  company: string;
  position: string;
  location: string;
  date: string;
  status: "applied" | "interview" | "offer" | "rejected";
  notes?: string;
  link?: string;
  salary?: string;
  contact?: string;
}

// Sample job data
const jobsData: Job[] = [
  {
    id: "job1",
    company: "TechCorp Inc.",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    date: "2023-05-10",
    status: "interview",
    notes: "Second interview scheduled for next week",
    link: "https://example.com/job1",
    salary: "$120K - $150K",
    contact: "Sarah Johnson, HR Manager",
  },
  {
    id: "job2",
    company: "InnovateSoft",
    position: "Product Manager",
    location: "Remote",
    date: "2023-05-05",
    status: "applied",
    notes: "Applied through company website",
    link: "https://example.com/job2",
    salary: "$110K - $130K",
  },
  {
    id: "job3",
    company: "DesignHub",
    position: "UX/UI Designer",
    location: "New York, NY",
    date: "2023-04-28",
    status: "offer",
    notes: "Received offer, negotiating salary",
    link: "https://example.com/job3",
    salary: "$95K",
    contact: "Michael Smith, Design Director",
  },
  {
    id: "job4",
    company: "DataSystems",
    position: "Backend Engineer",
    location: "Austin, TX",
    date: "2023-04-20",
    status: "rejected",
    notes: "Rejected after technical interview",
    link: "https://example.com/job4",
  },
  {
    id: "job5",
    company: "AI Solutions",
    position: "Data Scientist",
    location: "Remote",
    date: "2023-05-12",
    status: "applied",
    notes: "Applied through LinkedIn",
    link: "https://example.com/job5",
    salary: "$125K - $155K",
  },
];

const JobTracker: React.FC = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(jobsData);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newJob, setNewJob] = useState<Partial<Job>>({
    status: "applied",
    date: new Date().toISOString().split("T")[0],
  });
  const [activeTab, setActiveTab] = useState<string>("all");

  // Filter jobs based on active tab
  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "all") return true;
    return job.status === activeTab;
  });

  // Job stats
  const stats = {
    all: jobs.length,
    applied: jobs.filter(job => job.status === "applied").length,
    interview: jobs.filter(job => job.status === "interview").length,
    offer: jobs.filter(job => job.status === "offer").length,
    rejected: jobs.filter(job => job.status === "rejected").length,
  };

  // Handle job selection
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  // Handle new job input change
  const handleNewJobChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  // Add new job
  const handleAddJob = () => {
    if (!newJob.company || !newJob.position) {
      toast({
        variant: "destructive",
        description: "Please provide company name and position",
      });
      return;
    }

    const job: Job = {
      id: `job${Date.now()}`,
      company: newJob.company || "",
      position: newJob.position || "",
      location: newJob.location || "",
      date: newJob.date || new Date().toISOString().split("T")[0],
      status: (newJob.status as "applied" | "interview" | "offer" | "rejected") || "applied",
      notes: newJob.notes,
      link: newJob.link,
      salary: newJob.salary,
      contact: newJob.contact,
    };

    setJobs(prev => [job, ...prev]);
    setIsAddDialogOpen(false);
    setNewJob({
      status: "applied",
      date: new Date().toISOString().split("T")[0],
    });

    toast({
      description: "Job application added successfully!",
    });
  };

  // Update job status
  const updateJobStatus = (jobId: string, newStatus: "applied" | "interview" | "offer" | "rejected") => {
    setJobs(prev => 
      prev.map(job => 
        job.id === jobId 
          ? { ...job, status: newStatus } 
          : job
      )
    );

    if (selectedJob?.id === jobId) {
      setSelectedJob(prev => prev ? { ...prev, status: newStatus } : null);
    }

    toast({
      description: `Job status updated to ${newStatus}`,
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Applied</Badge>;
      case "interview":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Interview</Badge>;
      case "offer":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Offer</Badge>;
      case "rejected":
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="py-8 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Application Tracker</h1>
          <p className="text-gray-500">
            Track and manage your job applications in one place
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="chase-gradient">
                <Plus className="mr-2 h-4 w-4" />
                Add Application
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Job Application</DialogTitle>
                <DialogDescription>
                  Enter the details of your job application
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={newJob.company || ""}
                      onChange={handleNewJobChange}
                      placeholder="Company Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      name="position"
                      value={newJob.position || ""}
                      onChange={handleNewJobChange}
                      placeholder="Job Title"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newJob.location || ""}
                      onChange={handleNewJobChange}
                      placeholder="City, State or Remote"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Application Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={newJob.date || ""}
                      onChange={handleNewJobChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      value={newJob.status || "applied"}
                      onChange={handleNewJobChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range (Optional)</Label>
                    <Input
                      id="salary"
                      name="salary"
                      value={newJob.salary || ""}
                      onChange={handleNewJobChange}
                      placeholder="e.g. $80K - $100K"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Job Listing URL (Optional)</Label>
                  <Input
                    id="link"
                    name="link"
                    value={newJob.link || ""}
                    onChange={handleNewJobChange}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person (Optional)</Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={newJob.contact || ""}
                    onChange={handleNewJobChange}
                    placeholder="Name, Title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={newJob.notes || ""}
                    onChange={handleNewJobChange}
                    placeholder="Add any notes about the application..."
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="chase-gradient" onClick={handleAddJob}>
                  Add Application
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Job Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="rounded-full bg-gray-100 p-2 mb-2">
              <ListFilter className="h-5 w-5 text-chase-DEFAULT" />
            </div>
            <div className="text-2xl font-bold">{stats.all}</div>
            <p className="text-sm text-gray-500">All Jobs</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="rounded-full bg-blue-100 p-2 mb-2">
              <Clock3 className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{stats.applied}</div>
            <p className="text-sm text-gray-500">Applied</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="rounded-full bg-amber-100 p-2 mb-2">
              <Calendar className="h-5 w-5 text-amber-600" />
            </div>
            <div className="text-2xl font-bold">{stats.interview}</div>
            <p className="text-sm text-gray-500">Interviews</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="rounded-full bg-green-100 p-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold">{stats.offer}</div>
            <p className="text-sm text-gray-500">Offers</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="rounded-full bg-red-100 p-2 mb-2">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold">{stats.rejected}</div>
            <p className="text-sm text-gray-500">Rejected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job List */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="all" className="flex-1">
                All Applications
              </TabsTrigger>
              <TabsTrigger value="applied" className="flex-1">
                Applied
              </TabsTrigger>
              <TabsTrigger value="interview" className="flex-1">
                Interviewing
              </TabsTrigger>
              <TabsTrigger value="offer" className="flex-1">
                Offers
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex-1">
                Rejected
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <Card
                      key={job.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedJob?.id === job.id
                          ? "border-chase-blue"
                          : ""
                      }`}
                      onClick={() => handleSelectJob(job)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start">
                              <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0 mr-3">
                                <Building className="h-5 w-5 text-chase-gray" />
                              </div>
                              <div>
                                <h3 className="font-medium">{job.position}</h3>
                                <p className="text-sm text-gray-600">{job.company}</p>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{job.location}</span>
                                  <Clock className="h-3 w-3 ml-3 mr-1" />
                                  <span>{formatDate(job.date)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            {getStatusBadge(job.status)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Building className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium">No applications found</h3>
                    <p className="text-gray-500 mb-4">
                      You don't have any job applications in this category yet.
                    </p>
                    <Button 
                      className="chase-gradient"
                      onClick={() => setIsAddDialogOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Application
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Job Details */}
        <div className="lg:col-span-1">
          {selectedJob ? (
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium">{selectedJob.position}</h3>
                  <p className="text-chase-blue">{selectedJob.company}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Applied on {formatDate(selectedJob.date)}</span>
                  </div>
                  {selectedJob.salary && (
                    <div className="font-medium">
                      Salary: {selectedJob.salary}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Status</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={selectedJob.status === "applied" ? "default" : "outline"}
                      className={`${
                        selectedJob.status === "applied"
                          ? "bg-blue-600"
                          : "text-blue-600 hover:bg-blue-100"
                      } cursor-pointer`}
                      onClick={() => updateJobStatus(selectedJob.id, "applied")}
                    >
                      Applied
                    </Badge>
                    <Badge
                      variant={selectedJob.status === "interview" ? "default" : "outline"}
                      className={`${
                        selectedJob.status === "interview"
                          ? "bg-amber-600"
                          : "text-amber-600 hover:bg-amber-100"
                      } cursor-pointer`}
                      onClick={() => updateJobStatus(selectedJob.id, "interview")}
                    >
                      Interview
                    </Badge>
                    <Badge
                      variant={selectedJob.status === "offer" ? "default" : "outline"}
                      className={`${
                        selectedJob.status === "offer"
                          ? "bg-green-600"
                          : "text-green-600 hover:bg-green-100"
                      } cursor-pointer`}
                      onClick={() => updateJobStatus(selectedJob.id, "offer")}
                    >
                      Offer
                    </Badge>
                    <Badge
                      variant={selectedJob.status === "rejected" ? "default" : "outline"}
                      className={`${
                        selectedJob.status === "rejected"
                          ? "bg-red-600"
                          : "text-red-600 hover:bg-red-100"
                      } cursor-pointer`}
                      onClick={() => updateJobStatus(selectedJob.id, "rejected")}
                    >
                      Rejected
                    </Badge>
                  </div>
                </div>

                {selectedJob.contact && (
                  <div>
                    <p className="text-sm font-medium mb-1">Contact</p>
                    <p className="text-gray-600">{selectedJob.contact}</p>
                  </div>
                )}

                {selectedJob.link && (
                  <div>
                    <p className="text-sm font-medium mb-1">Job Listing</p>
                    <a
                      href={selectedJob.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-chase-blue hover:underline truncate block"
                    >
                      {selectedJob.link}
                    </a>
                  </div>
                )}

                {selectedJob.notes && (
                  <div>
                    <p className="text-sm font-medium mb-1">Notes</p>
                    <div className="bg-gray-50 p-3 rounded-md text-sm">
                      {selectedJob.notes}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Edit Feature",
                      description: "This would open the job editing dialog",
                    });
                  }}
                >
                  <AlignLeft className="h-4 w-4 mr-2" />
                  Edit Notes
                </Button>
                <Button 
                  className="chase-gradient"
                  onClick={() => {
                    toast({
                      title: "Reminder Set",
                      description: "This would set up follow-up reminders",
                    });
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Set Follow-up
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="sticky top-8 bg-white">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <BarChart3 className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">No Job Selected</h3>
                <p className="text-gray-500">
                  Select a job application to view its details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobTracker;
