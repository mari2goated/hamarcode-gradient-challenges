import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DifficultyBadge from "@/components/DifficultyBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, Send } from "lucide-react";
import { problems } from "@/data/problems";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ProblemDetail = () => {
  const { id } = useParams();
  const problem = problems.find(p => p.id === Number(id));
  const [code, setCode] = useState(`function solution() {\n  // Write your code here\n  \n}`);

  if (!problem) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
          <Link to="/problems">
            <Button variant="gradient">Back to Problems</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleRun = () => {
    toast.success("Code executed successfully!", {
      description: "Check the console for output."
    });
  };

  const handleSubmit = () => {
    toast.success("Solution submitted!", {
      description: "Your submission is being processed."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/problems" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Problems
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card border-primary/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{problem.id}. {problem.title}</h1>
                  <div className="flex items-center gap-3">
                    <DifficultyBadge difficulty={problem.difficulty} />
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                      {problem.category}
                    </span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="description" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="solutions">Solutions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="space-y-6 mt-4">
                  <div>
                    <p className="text-foreground leading-relaxed">{problem.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Examples</h3>
                    {problem.examples.map((example, index) => (
                      <Card key={index} className="p-4 mb-3 bg-secondary/50 border-primary/10">
                        <div className="font-mono text-sm space-y-2">
                          <div>
                            <span className="text-muted-foreground">Input: </span>
                            <span className="text-foreground">{example.input}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Output: </span>
                            <span className="text-foreground">{example.output}</span>
                          </div>
                          {example.explanation && (
                            <div className="text-muted-foreground">
                              Explanation: {example.explanation}
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="solutions" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Solutions will appear here after you submit your code.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <Card className="p-6 bg-gradient-card border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Code Editor</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleRun}>
                    <Play className="w-4 h-4 mr-2" />
                    Run
                  </Button>
                  <Button variant="gradient" size="sm" onClick={handleSubmit}>
                    <Send className="w-4 h-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[500px] font-mono text-sm bg-background/50 resize-none"
                placeholder="Write your solution here..."
              />
            </Card>

            <Card className="p-4 bg-gradient-card border-primary/20">
              <h3 className="font-semibold mb-2">Test Results</h3>
              <div className="text-sm text-muted-foreground">
                Run your code to see test results here.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
