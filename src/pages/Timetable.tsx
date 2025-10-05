import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Sparkles } from "lucide-react";
import { Session } from "@supabase/supabase-js";

type StudySession = {
  id: string;
  day: string;
  time_slot: string;
  focus_area: string;
  completed: boolean;
  completed_at: string | null;
};

const timetableData = [
  { day: "Monday", timeSlot: "8:30 am – 5:30 pm", focusArea: "University (long day)" },
  { day: "Monday", timeSlot: "8:30 – 9:15 pm", focusArea: "Light review (DBMS or Linear)" },
  { day: "Tuesday", timeSlot: "8:30 – 10:20 am", focusArea: "University" },
  { day: "Tuesday", timeSlot: "11:30 – 12:15 pm", focusArea: "Linear Algebra practice" },
  { day: "Tuesday", timeSlot: "12:30 – 1:15 pm", focusArea: "DBMS concepts/queries" },
  { day: "Tuesday", timeSlot: "2:45 – 5:30 pm", focusArea: "University" },
  { day: "Tuesday", timeSlot: "8:30 – 9:15 pm", focusArea: "DSA coding (1 problem)" },
  { day: "Wednesday", timeSlot: "8:30 – 9:30 am", focusArea: "University" },
  { day: "Wednesday", timeSlot: "10:30 – 11:15 am", focusArea: "DSA problem solving" },
  { day: "Wednesday", timeSlot: "11:30 – 12:15 pm", focusArea: "DSA problem solving" },
  { day: "Wednesday", timeSlot: "12:30 – 1:15 pm", focusArea: "Linear Algebra problem set" },
  { day: "Wednesday", timeSlot: "2:45 – 5:30 pm", focusArea: "University" },
  { day: "Wednesday", timeSlot: "8:30 – 9:00 pm", focusArea: "DBMS flashcards/summary" },
  { day: "Thursday", timeSlot: "10:20 am – 5:30 pm", focusArea: "University" },
  { day: "Thursday", timeSlot: "8:00 – 8:45 pm", focusArea: "Light DSA (easy problem) OR Linear recap" },
  { day: "Friday", timeSlot: "12:00 – 1:30 pm", focusArea: "DSA coding (focus session)" },
  { day: "Friday", timeSlot: "4:00 – 5:00 pm", focusArea: "DBMS deep dive (queries, ER diagrams)" },
  { day: "Saturday", timeSlot: "11:00 – 12:30 pm", focusArea: "DSA focus session" },
  { day: "Saturday", timeSlot: "3:00 – 6:00 pm", focusArea: "MERN Stack Course" },
  { day: "Saturday", timeSlot: "6:30 – 7:00 pm", focusArea: "SE Principles / Business Writing" },
  { day: "Sunday", timeSlot: "11:00 – 12:30 pm", focusArea: "Linear Algebra problem-solving" },
  { day: "Sunday", timeSlot: "3:00 – 6:00 pm", focusArea: "MERN Stack Course" },
  { day: "Sunday", timeSlot: "6:30 – 7:00 pm", focusArea: "Technical Business Writing" },
];

const Timetable = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setSession(session);
      await initializeSessions(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const initializeSessions = async (userId: string) => {
    try {
      const { data: existingSessions, error: fetchError } = await supabase
        .from("study_sessions")
        .select("*")
        .eq("user_id", userId);

      if (fetchError) throw fetchError;

      if (!existingSessions || existingSessions.length === 0) {
        const sessionsToInsert = timetableData.map(item => ({
          user_id: userId,
          day: item.day,
          time_slot: item.timeSlot,
          focus_area: item.focusArea,
          completed: false,
        }));

        const { data: newSessions, error: insertError } = await supabase
          .from("study_sessions")
          .insert(sessionsToInsert)
          .select();

        if (insertError) throw insertError;
        setStudySessions(newSessions || []);
      } else {
        setStudySessions(existingSessions);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSession = async (sessionId: string, currentCompleted: boolean) => {
    try {
      const { error } = await supabase
        .from("study_sessions")
        .update({
          completed: !currentCompleted,
          completed_at: !currentCompleted ? new Date().toISOString() : null,
        })
        .eq("id", sessionId);

      if (error) throw error;

      setStudySessions(prev =>
        prev.map(s =>
          s.id === sessionId
            ? { ...s, completed: !currentCompleted, completed_at: !currentCompleted ? new Date().toISOString() : null }
            : s
        )
      );

      toast({
        title: !currentCompleted ? "Session completed! 🎉" : "Session unchecked",
        description: !currentCompleted ? "Keep up the great work!" : "Session marked as incomplete",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const groupedSessions = studySessions.reduce((acc, session) => {
    if (!acc[session.day]) {
      acc[session.day] = [];
    }
    acc[session.day].push(session);
    return acc;
  }, {} as Record<string, StudySession[]>);

  const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const completedCount = studySessions.filter(s => s.completed).length;
  const totalCount = studySessions.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-foreground text-xl">Loading your timetable...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="text-primary" />
              Mariam Getting All A's
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Progress: {completedCount}/{totalCount} sessions ({progressPercentage}%)
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {daysOrder.map(day => {
            const daySessions = groupedSessions[day] || [];
            if (daySessions.length === 0) return null;

            return (
              <Card key={day} className="bg-gradient-card border-primary/20 shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary">{day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {daySessions.map(session => (
                      <div
                        key={session.id}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                          session.completed
                            ? "bg-primary/10 border border-primary/30"
                            : "bg-secondary/50 border border-border hover:bg-secondary"
                        }`}
                      >
                        <Checkbox
                          checked={session.completed}
                          onCheckedChange={() => toggleSession(session.id, session.completed)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-primary">{session.time_slot}</div>
                          <div className={`text-sm ${session.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {session.focus_area}
                          </div>
                          {session.completed_at && (
                            <div className="text-xs text-success mt-1">
                              Completed {new Date(session.completed_at).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Timetable;
