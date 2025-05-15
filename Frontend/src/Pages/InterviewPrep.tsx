
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/ui/tabs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Components/ui/accordion";
import { BookOpen, CheckCircle, Sparkles, ThumbsUp } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import AIAssistant from "../Components/AIAssistant";

interface Question {
  id: string;
  category: string;
  question: string;
  answer: string;
  completed: boolean;
}

interface QuestionCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const InterviewPrep: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("common");
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const categories: QuestionCategory[] = [
    {
      id: "common",
      name: "Common Questions",
      description: "Standard interview questions asked in most interviews",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: "technical",
      name: "Technical Questions",
      description: "Role-specific technical questions and challenges",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: "behavioral",
      name: "Behavioral Questions",
      description: "Questions about how you've handled situations in the past",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ];

  const questionsByCategory: Record<string, Question[]> = {
    common: [
      {
        id: "q1",
        category: "common",
        question: "Tell me about yourself?",
        answer:
          "This is your opportunity to present your professional narrative. Start with your current role, mention relevant past experiences, highlight key achievements, and explain why you're interested in this position. Keep it concise (1-2 minutes) and focused on professional rather than personal details.",
        completed: false,
      },
      {
        id: "q2",
        category: "common",
        question: "Why are you interested in this position?",
        answer:
          "Demonstrate your knowledge of the company and role. Explain how your skills and experience align with the job description, how the position fits into your career goals, and what specifically attracts you to the company (culture, mission, products, etc.).",
        completed: false,
      },
      {
        id: "q3",
        category: "common",
        question: "What are your greatest strengths?",
        answer:
          "Choose 2-3 strengths that are relevant to the position. Use the STAR method (Situation, Task, Action, Result) to provide specific examples of how you've demonstrated these strengths. Focus on qualities that would benefit the employer.",
        completed: false,
      },
      {
        id: "q4",
        category: "common",
        question: "What is your greatest weakness?",
        answer:
          "Select a genuine weakness that isn't critical to the role. More importantly, explain the steps you're taking to overcome it. This shows self-awareness and a commitment to professional growth.",
        completed: false,
      },
      {
        id: "q5",
        category: "common",
        question: "Where do you see yourself in five years?",
        answer:
          "Outline realistic career aspirations that align with the company's growth trajectory. Show ambition balanced with loyalty. Research potential career paths within the organization to make your answer more credible.",
        completed: false,
      },
      {
        id: "q6",
        category: "common",
        question: "What are your salary expectations?",
        answer:
          "Research industry standards for similar roles in your location before the interview. Provide a range rather than a specific number, and emphasize that you're flexible and more interested in the overall opportunity and fit.",
        completed: false,
      },
      {
        id: "q7",
        category: "common",
        question: "Do you have any questions for me?",
        answer:
          "Always prepare thoughtful questions. Ask about the team structure, company culture, performance expectations, or growth opportunities. Avoid questions about basic information readily available on the company website.",
        completed: false,
      },
    ],
    technical: [
      {
        id: "t1",
        category: "technical",
        question: "Explain the differences between REST and GraphQL APIs.",
        answer:
          "REST (Representational State Transfer) uses standard HTTP methods and typically returns fixed data structures, often causing over-fetching or under-fetching of data. GraphQL is a query language that allows clients to request exactly the data they need, reducing network overhead. REST is resource-based with multiple endpoints, while GraphQL typically uses a single endpoint where clients specify their data requirements.",
        completed: false,
      },
      {
        id: "t2",
        category: "technical",
        question: "How do you approach debugging a complex issue in production?",
        answer:
          "I follow a systematic approach: 1) Gather information about the issue and reproduce it if possible, 2) Check logs and monitoring systems for errors or unusual patterns, 3) Isolate the problem by understanding the context and conditions, 4) Form hypotheses and test them one by one, 5) Once resolved, document the issue and solution, and implement preventative measures to avoid similar problems in the future.",
        completed: false,
      },
      {
        id: "t3",
        category: "technical",
        question: "Explain the concept of CI/CD and its benefits.",
        answer:
          "Continuous Integration (CI) involves regularly merging code changes into a central repository, followed by automated builds and tests. Continuous Deployment/Delivery (CD) automatically deploys all code changes to testing or production environments after the build stage. Benefits include faster bug detection, reduced integration problems, more frequent releases, improved code quality, and increased developer productivity.",
        completed: false,
      },
      {
        id: "t4",
        category: "technical",
        question: "What is the difference between cookies, local storage, and session storage?",
        answer:
          "Cookies are small text files stored on the client's browser, can be set to expire, are sent with every HTTP request, and have a size limit of about 4KB. Local Storage provides 5-10MB of storage, persists until explicitly cleared, and is never sent to the server. Session Storage is similar to Local Storage but only lasts for the duration of the browser session. Each serves different purposes in web applications based on persistence needs and security considerations.",
        completed: false,
      },
      {
        id: "t5",
        category: "technical",
        question: "What design patterns have you used and in what contexts?",
        answer:
          "I've implemented several design patterns: Singleton for ensuring single instances of service classes; Factory for creating objects without specifying exact classes; Observer for implementing event systems; MVC/MVVM for separating concerns in frontend applications. Each pattern was chosen based on the specific problem it solves, such as managing application state or creating maintainable code architectures.",
        completed: false,
      },
    ],
    behavioral: [
      {
        id: "b1",
        category: "behavioral",
        question: "Tell me about a time you had to work under pressure to meet a deadline.",
        answer:
          "Using the STAR method: Situation - We had a critical project deadline moved up by two weeks. Task - As the lead developer, I needed to reorganize our sprint and deliver key features without compromising quality. Action - I prioritized features, held a team meeting to redistribute tasks based on strengths, established daily check-ins, and identified processes we could streamline. Result - We delivered the project on time with all critical features, and management adopted some of our streamlined processes permanently.",
        completed: false,
      },
      {
        id: "b2",
        category: "behavioral",
        question: "Describe a situation where you had a conflict with a coworker and how you resolved it.",
        answer:
          "Using the STAR method: Situation - A colleague and I disagreed on the technical approach for a key feature. Task - We needed to reach consensus without delaying the project. Action - I suggested we each document our approaches with pros/cons, then meet to discuss objectively. I actively listened to understand their concerns and found that we actually agreed on the goals but differed on implementation. Result - We created a hybrid solution that incorporated the strengths of both approaches, improving the final outcome and our working relationship.",
        completed: false,
      },
      {
        id: "b3",
        category: "behavioral",
        question: "Give an example of a time you made a mistake. How did you handle it?",
        answer:
          "Using the STAR method: Situation - I deployed an update that caused performance issues for some users. Task - I needed to fix the issue quickly and minimize impact. Action - I immediately alerted my manager, worked to identify the root cause, deployed a hotfix, and personally reached out to affected customers. Result - The issue was resolved within hours with minimal disruption. I then implemented additional testing procedures to prevent similar issues and shared the experience with the team as a learning opportunity.",
        completed: false,
      },
      {
        id: "b4",
        category: "behavioral",
        question: "Describe a time when you had to adapt to a significant change at work.",
        answer:
          "Using the STAR method: Situation - Our company was acquired, resulting in a switch to new project management and development methodologies. Task - I needed to quickly adapt while maintaining productivity. Action - I volunteered to join the transition team, attended additional training sessions, and helped create documentation to ease the transition for others. Result - I became proficient in the new systems within weeks and helped train several team members, which positioned me for a team lead role in the new organization.",
        completed: false,
      },
      {
        id: "b5",
        category: "behavioral",
        question: "Tell me about a time you went above and beyond for a customer or teammate.",
        answer:
          "Using the STAR method: Situation - A major client encountered a critical bug on a Friday evening before a big launch. Task - Though not on call, I was the most familiar with that system. Action - I voluntarily stepped in, worked through the weekend to diagnose and fix the issue, provided regular updates to stakeholders, and created comprehensive documentation of the solution. Result - The client launched successfully on Monday, strengthened their relationship with our company, and I later received a spot bonus and recognition from leadership.",
        completed: false,
      },
    ],
  };

  const [questions, setQuestions] = useState<Record<string, Question[]>>(
    questionsByCategory
  );

  // Toggle completion status
  const toggleQuestionCompletion = (questionId: string, category: string) => {
    setQuestions((prev) => {
      const updatedQuestions = { ...prev };
      updatedQuestions[category] = updatedQuestions[category].map((q) =>
        q.id === questionId ? { ...q, completed: !q.completed } : q
      );
      return updatedQuestions;
    });
  };

  // Get completion percentage for a category
  const getCategoryCompletion = (category: string) => {
    const categoryQuestions = questions[category];
    if (!categoryQuestions || categoryQuestions.length === 0) return 0;
    
    const completedCount = categoryQuestions.filter((q) => q.completed).length;
    return Math.round((completedCount / categoryQuestions.length) * 100);
  };

  // Format AI generated answer
  const getAIAnswer = (questionText: string) => {
    toast({
      description: "AI is generating a personalized response...",
    });
    
    setAiAssistantOpen(true);
  };

  return (
    <div className="py-8 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Interview Preparation</h1>
          <p className="text-gray-500">
            Practice common interview questions to improve your confidence
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            className="chase-gradient"
            onClick={() => setAiAssistantOpen(true)}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI Interview Coach
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="space-y-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all ${
                  activeTab === category.id
                    ? "border-chase-blue shadow-md"
                    : "hover:shadow-sm"
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">
                        {getCategoryCompletion(category.id)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{category.description}</p>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-chase-blue h-2 rounded-full"
                      style={{
                        width: `${getCategoryCompletion(category.id)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-right">
                    {questions[category.id]?.filter((q) => q.completed).length}/
                    {questions[category.id]?.length} questions practiced
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Interview Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <ThumbsUp className="h-4 w-4 text-chase-teal flex-shrink-0 mt-0.5" />
                  <p>Research the company thoroughly before the interview</p>
                </div>
                <div className="flex items-start gap-2">
                  <ThumbsUp className="h-4 w-4 text-chase-teal flex-shrink-0 mt-0.5" />
                  <p>Practice the STAR method for behavioral questions</p>
                </div>
                <div className="flex items-start gap-2">
                  <ThumbsUp className="h-4 w-4 text-chase-teal flex-shrink-0 mt-0.5" />
                  <p>Prepare relevant examples from your past experience</p>
                </div>
                <div className="flex items-start gap-2">
                  <ThumbsUp className="h-4 w-4 text-chase-teal flex-shrink-0 mt-0.5" />
                  <p>
                    Ask thoughtful questions that show your interest in the role
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <ThumbsUp className="h-4 w-4 text-chase-teal flex-shrink-0 mt-0.5" />
                  <p>Follow up with a thank-you email after the interview</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      description: "This would open more detailed interview tips",
                    });
                  }}
                >
                  View More Tips
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Questions */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-6 hidden">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex-1">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {questions[category.id]?.map((question) => (
                        <AccordionItem key={question.id} value={question.id}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center text-left">
                              {question.completed && (
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                              )}
                              <span>{question.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-2">
                              <div className="bg-gray-50 p-4 rounded-md">
                                <p className="mb-2 font-medium text-sm">
                                  Sample Answer:
                                </p>
                                <p className="text-gray-600">
                                  {question.answer}
                                </p>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => getAIAnswer(question.question)}
                                >
                                  <Sparkles className="h-4 w-4 mr-2 text-chase-blue" />
                                  Get AI Feedback
                                </Button>
                                <Button
                                  variant={question.completed ? "outline" : "default"}
                                  size="sm"
                                  className={
                                    question.completed
                                      ? "flex-1"
                                      : "flex-1 chase-gradient"
                                  }
                                  onClick={() =>
                                    toggleQuestionCompletion(question.id, category.id)
                                  }
                                >
                                  {question.completed ? (
                                    <>
                                      <span>Mark as Not Practiced</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      <span>Mark as Practiced</span>
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Personalized Practice</h3>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Sparkles className="h-10 w-10 text-chase-blue mx-auto mb-4" />
                        <h3 className="font-medium text-lg mb-2">
                          Get AI-Tailored Interview Questions
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Based on your resume and target job, our AI can generate
                          personalized interview questions specifically for you.
                        </p>
                        <Button 
                          className="chase-gradient" 
                          onClick={() => setAiAssistantOpen(true)}
                        >
                          Generate Personalized Questions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      {/* AI Assistant Dialog */}
      <AIAssistant open={aiAssistantOpen} onOpenChange={setAiAssistantOpen} />
    </div>
  );
};

export default InterviewPrep;
