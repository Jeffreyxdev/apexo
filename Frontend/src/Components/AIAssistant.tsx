
import React, { useState } from "react";
import { Button } from "../Components/ui/button";
import { Textarea } from "../Components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../Components/ui/dialog";
import { Send, Sparkles } from "lucide-react";

type Message = {
  id: number;
  content: string;
  isUser: boolean;
};

interface AIAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ open, onOpenChange }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! I'm your Career Assistant. How can I help you with your job search today?",
      isUser: false,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      content: input.trim(),
      isUser: true,
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I can help you tailor your resume for that position! Let's highlight your relevant skills.",
        "That job looks like a great match for your experience. Would you like me to help you prepare for potential interview questions?",
        "Based on your profile, I found 5 more jobs that match your skills. Would you like to see them?",
        "I can suggest some improvements for your cover letter to make it stand out more.",
        "Let me analyze this job description and highlight the key skills you should emphasize in your application.",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const newAIMessage: Message = {
        id: messages.length + 2,
        content: randomResponse,
        isUser: false,
      };
      
      setMessages((prev) => [...prev, newAIMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="h-5 w-5 text-chase-blue mr-2" />
            AI Career Assistant
          </DialogTitle>
          <DialogDescription>
            Ask questions about jobs, resume help, or interview tips
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.isUser
                    ? "bg-chase-blue text-white rounded-tr-none"
                    : "bg-gray-100 rounded-tl-none"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-2 rounded-lg bg-gray-100 rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex items-center border-t pt-4">
          <div className="flex w-full items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about jobs or resume help..."
              className="flex-1 resize-none"
              rows={2}
            />
            <Button
              type="submit"
              onClick={handleSend}
              size="icon"
              className="chase-gradient h-10 w-10"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistant;
