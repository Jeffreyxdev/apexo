
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

import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { Textarea } from "../Components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { Separator } from "../Components/ui/separator";
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Globe,
  Edit2,
  Save,
  ChevronRight,
  Bell,
  Shield,
  Key,
} from "lucide-react";
import { Switch } from "../Components/ui/switch";

const Profile: React.FC = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Alex Johnson",
    jobTitle: "Senior Frontend Developer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    bio: "I'm a passionate frontend developer with over 5 years of experience in building responsive web applications using modern JavaScript frameworks.",
    website: "https://alexjohnson-portfolio.com",
    skills: [
      "JavaScript", 
      "React", 
      "TypeScript", 
      "CSS/SCSS", 
      "HTML5",
      "Node.js",
      "Git",
      "Responsive Design",
    ],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    toast({
      description: "Profile updated successfully!",
    });
  };

  return (
    <div className="py-8 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
      <p className="text-gray-500 mb-8">
        Manage your personal information and account settings
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </div>
              <Button
                variant={editMode ? "outline" : "default"}
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className={editMode ? "" : "chase-gradient"}
              >
                {editMode ? (
                  <Save className="h-4 w-4 mr-2" />
                ) : (
                  <Edit2 className="h-4 w-4 mr-2" />
                )}
                {editMode ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0 mx-auto md:mx-0">
                  <User className="h-12 w-12 mx-auto mt-6 text-gray-400" />
                </div>
                <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                  <h3 className="text-xl font-bold">{profileData.fullName}</h3>
                  <p className="text-chase-blue">{profileData.jobTitle}</p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 justify-center md:justify-start">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{profileData.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio" className="mb-2 block">
                  About
                </Label>
                {editMode ? (
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-600">{profileData.bio}</p>
                )}
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  {editMode ? (
                    <Input
                      id="fullName"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-gray-600">{profileData.fullName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  {editMode ? (
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      value={profileData.jobTitle}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-gray-600">{profileData.jobTitle}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {editMode ? (
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-gray-600">{profileData.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  {editMode ? (
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-gray-600">{profileData.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  {editMode ? (
                    <Input
                      id="location"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-gray-600">{profileData.location}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  {editMode ? (
                    <Input
                      id="website"
                      name="website"
                      value={profileData.website}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-gray-600">
                      <a
                        href={profileData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-chase-blue hover:underline flex items-center"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        {profileData.website}
                      </a>
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Skills */}
              <div>
                <Label htmlFor="skills" className="mb-2 block">
                  Skills
                </Label>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            {editMode && (
              <CardFooter>
                <Button
                  className="w-full chase-gradient"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>
                Manage your app preferences and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about new job matches
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Job Application Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminders about pending applications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Weekly Job Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly email with new job matches
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Settings & Insights */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 group cursor-pointer">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Privacy Settings</p>
                    <p className="text-sm text-gray-500">
                      Control your data and visibility
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center py-2 group cursor-pointer">
                <div className="flex items-center">
                  <Key className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-gray-500">
                      Update your security credentials
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center py-2 group cursor-pointer">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Notification Settings</p>
                    <p className="text-sm text-gray-500">
                      Manage alerts and notifications
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Job Search Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Applications Submitted</p>
                <p className="font-medium">12</p>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Interviews Scheduled</p>
                <p className="font-medium">3</p>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Profile Views</p>
                <p className="font-medium">48</p>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Offers Received</p>
                <p className="font-medium">1</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Analytics
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Premium Features</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-chase-DEFAULT rounded-lg p-4 mb-4">
                <Briefcase className="h-10 w-10 text-chase-teal mx-auto mb-2" />
                <h3 className="text-lg font-medium text-white">Unlock Premium</h3>
                <p className="text-gray-200 text-sm mb-4">
                  Get advanced features and priority job matches
                </p>
                <Button className="bg-white text-chase-DEFAULT hover:bg-gray-100">
                  Upgrade Now
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                <p>Premium features include AI resume review, application tracking, and priority job alerts.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
