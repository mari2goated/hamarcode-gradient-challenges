import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Trophy, Users, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Master Coding Interviews
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Practice on 1000+ problems, compete in contests, and level up your programming skills with HamarCode.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link to="/problems">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                Start Practicing
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Problems
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm text-muted-foreground">Problems</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-3xl font-bold">500K+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Trophy className="w-6 h-6 text-warning" />
              </div>
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Contests</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
            Why Choose HamarCode?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Diverse Problems</h3>
              <p className="text-muted-foreground">
                From easy to hard, covering all major algorithms and data structures.
              </p>
            </Card>
            
            <Card className="p-8 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Contests</h3>
              <p className="text-muted-foreground">
                Compete with programmers worldwide in real-time coding challenges.
              </p>
            </Card>
            
            <Card className="p-8 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your improvement with detailed statistics and insights.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
