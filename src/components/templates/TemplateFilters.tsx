
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getTemplateCategories } from "@/data/templates";
import { TemplateFilters as FiltersType } from "@/types";
import { cn } from "@/lib/utils";

interface TemplateFiltersProps {
  filters: FiltersType;
  onFilterChange: (filters: FiltersType) => void;
}

const TemplateFilters: React.FC<TemplateFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || "");
  const categories = getTemplateCategories();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, searchQuery });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({ 
      ...filters, 
      category: category === 'all' ? 'all' : category as any
    });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({ ...filters, sortBy: sortBy as any });
  };

  const clearFilters = () => {
    setSearchQuery("");
    onFilterChange({
      category: "all",
      searchQuery: "",
      sortBy: "newest",
    });
  };

  const hasActiveFilters = 
    filters.category !== "all" || 
    !!filters.searchQuery || 
    filters.sortBy !== "newest";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <form 
          className="relative flex-1" 
          onSubmit={handleSearchSubmit}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              onClick={() => {
                setSearchQuery("");
                if (filters.searchQuery) {
                  onFilterChange({ ...filters, searchQuery: "" });
                }
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </form>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className={cn(
              "text-sm",
              showFilters && "bg-accent text-accent-foreground"
            )}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="text-sm"
              onClick={clearFilters}
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-card rounded-md border animate-fade-in">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Category
            </label>
            <Select
              value={filters.category || "all"}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Sort By
            </label>
            <Select
              value={filters.sortBy || "newest"}
              onValueChange={handleSortChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateFilters;
