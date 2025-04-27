
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TemplateGrid from "@/components/templates/TemplateGrid";
import TemplateFilters from "@/components/templates/TemplateFilters";
import { filterTemplates } from "@/data/templates";
import { TemplateFilters as FiltersType } from "@/types";
import { toast } from "@/components/ui/sonner";

const TemplatesPage = () => {
  const [filters, setFilters] = useState<FiltersType>({
    category: "all",
    searchQuery: "",
    sortBy: "newest",
  });

  const [filteredTemplates, setFilteredTemplates] = useState(filterTemplates({}));

  useEffect(() => {
    const result = filterTemplates({
      category: filters.category,
      searchQuery: filters.searchQuery,
      sortBy: filters.sortBy,
    });
    setFilteredTemplates(result);
  }, [filters]);

  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
    toast.success("Filters applied successfully.");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Browse, manage and create website templates
          </p>
        </div>
        <Button asChild>
          <Link to="/templates/new">
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Link>
        </Button>
      </div>

      <TemplateFilters filters={filters} onFilterChange={handleFilterChange} />

      <TemplateGrid templates={filteredTemplates} />
    </div>
  );
};

export default TemplatesPage;
