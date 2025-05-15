
import React, { useState } from "react";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search for jobs...",
  onSearch,
  className,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`relative flex w-full max-w-3xl ${className}`}
    >
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pr-16 w-full rounded-r-none h-12 text-base border-r-0"
      />
      <Button
        type="submit"
        className="rounded-l-none h-12 px-4 chase-gradient"
      >
        <Search className="h-5 w-5" />
        <span className="ml-2 hidden sm:block">Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;
