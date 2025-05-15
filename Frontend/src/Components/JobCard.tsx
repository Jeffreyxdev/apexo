
import React from "react";
import { Button } from "../Components/ui/button";
import { Briefcase, MapPin, Clock, Building } from "lucide-react";
import { cn } from "../lib/utils";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary?: string;
  posted: string;
  type: string;
  logo?: string;
  className?: string;
  featured?: boolean;
  onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  salary,
  posted,
  type,
  logo,
  className,
  featured = false,
  onClick,
}) => {
  return (
    <div 
      className={cn(
        "chase-card p-5 cursor-pointer", 
        featured && "border-l-4 border-chase-blue",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {logo ? (
            <img src={logo} alt={company} className="h-full w-full object-cover" />
          ) : (
            <Building className="h-6 w-6 text-chase-gray" />
          )}
        </div>
        
        <div className="flex-1">
          {/* Title & Company */}
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-gray-600">{company}</p>
          </div>
          
          {/* Job Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {posted}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Briefcase className="h-4 w-4 mr-1" />
              {type}
            </div>
            {salary && (
              <div className="text-sm font-medium text-chase-blue">
                {salary}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-end items-center mt-4 pt-4 border-t border-gray-100">
        {featured && (
          <span className="text-xs font-medium bg-blue-50 text-blue-700 py-1 px-2 rounded-full mr-auto">
            Featured
          </span>
        )}
        <Button variant="outline" size="sm" className="mr-2">
          Save
        </Button>
        <Button size="sm" className="chase-gradient">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
