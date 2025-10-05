import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DifficultyBadge from "@/components/DifficultyBadge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { problems } from "@/data/problems";

const Problems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Problem Set
          </h1>
          <p className="text-muted-foreground">
            Solve problems to improve your coding skills and prepare for interviews.
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6 bg-gradient-card border-primary/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedDifficulty === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty("All")}
              >
                All
              </Button>
              <Button
                variant={selectedDifficulty === "Easy" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty("Easy")}
              >
                Easy
              </Button>
              <Button
                variant={selectedDifficulty === "Medium" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty("Medium")}
              >
                Medium
              </Button>
              <Button
                variant={selectedDifficulty === "Hard" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty("Hard")}
              >
                Hard
              </Button>
            </div>
          </div>
        </Card>

        {/* Problems Table */}
        <Card className="bg-gradient-card border-primary/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold text-muted-foreground">#</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Title</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Category</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Difficulty</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Acceptance</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((problem) => (
                  <tr
                    key={problem.id}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                  >
                    <td className="p-4 text-muted-foreground">{problem.id}</td>
                    <td className="p-4">
                      <Link
                        to={`/problem/${problem.id}`}
                        className="text-foreground hover:text-primary transition-colors font-medium"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                        {problem.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <DifficultyBadge difficulty={problem.difficulty} />
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {problem.acceptanceRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No problems found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Problems;
