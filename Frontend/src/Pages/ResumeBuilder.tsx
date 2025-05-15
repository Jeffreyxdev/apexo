
import React, { useState } from "react";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "../Components/ui/input";
import { Textarea } from "../Components/ui/textarea";
import { Label } from "../Components/ui/label";
import {
  Plus,
  Trash2,
  FileText,
  Download,
  Sparkles,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import AIAssistant from "../Components/AIAssistant";

interface ResumeSection {
  id: string;
  title: string;
  subtitle?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

const ResumeBuilder: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  // Resume Sections State
  const [experience, setExperience] = useState<ResumeSection[]>([
    {
      id: "exp-1",
      title: "",
      subtitle: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [education, setEducation] = useState<ResumeSection[]>([
    {
      id: "edu-1",
      title: "",
      subtitle: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [skills, setSkills] = useState<string[]>([""]);

  // Update Personal Info
  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Update Section
  const handleSectionChange = (
    type: "experience" | "education",
    id: string,
    field: string,
    value: string
  ) => {
    if (type === "experience") {
      setExperience((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    } else {
      setEducation((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    }
  };

  // Add Section
  const addSection = (type: "experience" | "education") => {
    const newSection = {
      id: `${type.slice(0, 3)}-${Date.now()}`,
      title: "",
      subtitle: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    if (type === "experience") {
      setExperience((prev) => [...prev, newSection]);
    } else {
      setEducation((prev) => [...prev, newSection]);
    }
  };

  // Remove Section
  const removeSection = (type: "experience" | "education", id: string) => {
    if (type === "experience") {
      setExperience((prev) => prev.filter((item) => item.id !== id));
    } else {
      setEducation((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Update Skills
  const handleSkillChange = (index: number, value: string) => {
    setSkills((prev) => {
      const newSkills = [...prev];
      newSkills[index] = value;
      return newSkills;
    });
  };

  // Add Skill
  const addSkill = () => {
    setSkills((prev) => [...prev, ""]);
  };

  // Remove Skill
  const removeSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  // Generate Resume
  const generateResume = () => {
    toast({
      title: "Resume Generated",
      description: "Your resume has been generated successfully!",
    });
  };

  // AI Enhancement
  const enhanceWithAI = () => {
    setAiAssistantOpen(true);
  };

  return (
    <div className="py-8 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
          <p className="text-gray-500">
            Create a professional resume to land your dream job
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button
            variant="outline"
            className="bg-white"
            onClick={enhanceWithAI}
          >
            <Sparkles className="mr-2 h-4 w-4 text-chase-blue" />
            AI Enhance
          </Button>
          <Button
            className="chase-gradient"
            onClick={generateResume}
          >
            <Download className="mr-2 h-4 w-4" />
            Generate PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resume Builder Form */}
        <div className="col-span-2 space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="personal" className="flex-1">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex-1">
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="flex-1">
                Education
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex-1">
                Skills
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={personalInfo.title}
                    onChange={handlePersonalInfoChange}
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={personalInfo.location}
                    onChange={handlePersonalInfoChange}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={personalInfo.summary}
                    onChange={handlePersonalInfoChange}
                    placeholder="Brief overview of your professional experience and goals..."
                    rows={5}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-6 pt-4">
              {experience.map((exp, index) => (
                <Card key={exp.id}>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Experience {index + 1}</span>
                      {experience.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeSection("experience", exp.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`exp-title-${exp.id}`}>Job Title</Label>
                        <Input
                          id={`exp-title-${exp.id}`}
                          value={exp.title}
                          onChange={(e) =>
                            handleSectionChange(
                              "experience",
                              exp.id,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Senior Developer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-subtitle-${exp.id}`}>
                          Company
                        </Label>
                        <Input
                          id={`exp-subtitle-${exp.id}`}
                          value={exp.subtitle}
                          onChange={(e) =>
                            handleSectionChange(
                              "experience",
                              exp.id,
                              "subtitle",
                              e.target.value
                            )
                          }
                          placeholder="Tech Company, Inc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-location-${exp.id}`}>
                          Location
                        </Label>
                        <Input
                          id={`exp-location-${exp.id}`}
                          value={exp.location}
                          onChange={(e) =>
                            handleSectionChange(
                              "experience",
                              exp.id,
                              "location",
                              e.target.value
                            )
                          }
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor={`exp-start-${exp.id}`}>
                            Start Date
                          </Label>
                          <Input
                            id={`exp-start-${exp.id}`}
                            value={exp.startDate}
                            onChange={(e) =>
                              handleSectionChange(
                                "experience",
                                exp.id,
                                "startDate",
                                e.target.value
                              )
                            }
                            placeholder="Jan 2020"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`exp-end-${exp.id}`}>End Date</Label>
                          <Input
                            id={`exp-end-${exp.id}`}
                            value={exp.endDate}
                            onChange={(e) =>
                              handleSectionChange(
                                "experience",
                                exp.id,
                                "endDate",
                                e.target.value
                              )
                            }
                            placeholder="Present"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`exp-desc-${exp.id}`}>Description</Label>
                      <Textarea
                        id={`exp-desc-${exp.id}`}
                        value={exp.description}
                        onChange={(e) =>
                          handleSectionChange(
                            "experience",
                            exp.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe your responsibilities and achievements..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="outline"
                onClick={() => addSection("experience")}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-6 pt-4">
              {education.map((edu, index) => (
                <Card key={edu.id}>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Education {index + 1}</span>
                      {education.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeSection("education", edu.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`edu-title-${edu.id}`}>Degree</Label>
                        <Input
                          id={`edu-title-${edu.id}`}
                          value={edu.title}
                          onChange={(e) =>
                            handleSectionChange(
                              "education",
                              edu.id,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-subtitle-${edu.id}`}>
                          Institution
                        </Label>
                        <Input
                          id={`edu-subtitle-${edu.id}`}
                          value={edu.subtitle}
                          onChange={(e) =>
                            handleSectionChange(
                              "education",
                              edu.id,
                              "subtitle",
                              e.target.value
                            )
                          }
                          placeholder="University Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-location-${edu.id}`}>
                          Location
                        </Label>
                        <Input
                          id={`edu-location-${edu.id}`}
                          value={edu.location}
                          onChange={(e) =>
                            handleSectionChange(
                              "education",
                              edu.id,
                              "location",
                              e.target.value
                            )
                          }
                          placeholder="City, State"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor={`edu-start-${edu.id}`}>
                            Start Year
                          </Label>
                          <Input
                            id={`edu-start-${edu.id}`}
                            value={edu.startDate}
                            onChange={(e) =>
                              handleSectionChange(
                                "education",
                                edu.id,
                                "startDate",
                                e.target.value
                              )
                            }
                            placeholder="2016"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edu-end-${edu.id}`}>
                            Graduation Year
                          </Label>
                          <Input
                            id={`edu-end-${edu.id}`}
                            value={edu.endDate}
                            onChange={(e) =>
                              handleSectionChange(
                                "education",
                                edu.id,
                                "endDate",
                                e.target.value
                              )
                            }
                            placeholder="2020"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edu-desc-${edu.id}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`edu-desc-${edu.id}`}
                        value={edu.description}
                        onChange={(e) =>
                          handleSectionChange(
                            "education",
                            edu.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Major, achievements, activities..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="outline"
                onClick={() => addSection("education")}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>
                    Add your technical and soft skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(index, e.target.value)
                        }
                        placeholder="e.g. JavaScript, Project Management"
                      />
                      {skills.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeSkill(index)}
                          className="h-10 w-10 flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" onClick={addSkill} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Skill Suggestions",
                        description: "AI would suggest relevant skills based on your experience.",
                      });
                    }}
                  >
                    <Sparkles className="mr-2 h-4 w-4 text-chase-blue" />
                    Suggest Skills with AI
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Resume Preview */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
              <CardDescription>
                A preview of your resume will appear here
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[500px] bg-gray-50 rounded-md p-6 border border-dashed border-gray-200">
              {personalInfo.name ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{personalInfo.name}</h2>
                    {personalInfo.title && (
                      <p className="text-chase-blue">{personalInfo.title}</p>
                    )}
                    <div className="text-sm text-gray-500 mt-1 space-x-2">
                      {personalInfo.email && <span>{personalInfo.email}</span>}
                      {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    </div>
                    {personalInfo.location && (
                      <p className="text-sm text-gray-500">
                        {personalInfo.location}
                      </p>
                    )}
                  </div>

                  {personalInfo.summary && (
                    <div>
                      <h3 className="text-sm font-semibold border-b pb-1 mb-2">
                        SUMMARY
                      </h3>
                      <p className="text-xs text-gray-600">
                        {personalInfo.summary}
                      </p>
                    </div>
                  )}

                  {experience.some((exp) => exp.title || exp.subtitle) && (
                    <div>
                      <h3 className="text-sm font-semibold border-b pb-1 mb-2">
                        EXPERIENCE
                      </h3>
                      {experience.map(
                        (exp) =>
                          (exp.title || exp.subtitle) && (
                            <div key={exp.id} className="mb-3 text-xs">
                              <div className="flex justify-between">
                                <span className="font-medium">{exp.title}</span>
                                <span className="text-gray-500">
                                  {exp.startDate &&
                                    `${exp.startDate} - ${
                                      exp.endDate || "Present"
                                    }`}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>{exp.subtitle}</span>
                                <span>{exp.location}</span>
                              </div>
                              {exp.description && (
                                <p className="text-gray-600 mt-1">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          )
                      )}
                    </div>
                  )}

                  {education.some((edu) => edu.title || edu.subtitle) && (
                    <div>
                      <h3 className="text-sm font-semibold border-b pb-1 mb-2">
                        EDUCATION
                      </h3>
                      {education.map(
                        (edu) =>
                          (edu.title || edu.subtitle) && (
                            <div key={edu.id} className="mb-2 text-xs">
                              <div className="flex justify-between">
                                <span className="font-medium">{edu.title}</span>
                                <span className="text-gray-500">
                                  {edu.startDate &&
                                    `${edu.startDate} - ${
                                      edu.endDate || "Present"
                                    }`}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>{edu.subtitle}</span>
                                <span>{edu.location}</span>
                              </div>
                              {edu.description && (
                                <p className="text-gray-600 mt-1">
                                  {edu.description}
                                </p>
                              )}
                            </div>
                          )
                      )}
                    </div>
                  )}

                  {skills.some((skill) => skill) && (
                    <div>
                      <h3 className="text-sm font-semibold border-b pb-1 mb-2">
                        SKILLS
                      </h3>
                      <p className="text-xs">
                        {skills.filter((skill) => skill).join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <FileText className="h-12 w-12 mb-4" />
                  <p className="text-center">
                    Fill in your information to see a preview
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                className="w-1/2 mr-2"
                onClick={() => {
                  toast({
                    title: "Template Selected",
                    description: "You would see other resume templates here",
                  });
                }}
              >
                Templates
              </Button>
              <Button 
                className="w-1/2 ml-2 chase-gradient"
                onClick={generateResume}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* AI Assistant Dialog */}
      <AIAssistant open={aiAssistantOpen} onOpenChange={setAiAssistantOpen} />
    </div>
  );
};

export default ResumeBuilder;
