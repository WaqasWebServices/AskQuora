"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  aiModels,
  consultantModes,
  type AIModel,
  type ConsultantMode,
} from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getAIResponse } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/hooks/use-sound";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppLogo } from "@/components/icons";
import { ArrowUp, Bot, Trash, User, Loader, Sparkles, MessageSquare } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const MainContent = ({
  messages,
  handleSendMessage,
  input,
  setInput,
  isReplying,
  selectedConsultant,
  selectedModel,
  handleClearHistory,
  getAvatarUrl,
  getAvatarHint,
  setSelectedConsultant,
  setSelectedModel,
  playClickSound,
  scrollAreaRef,
}: {
  messages: Message[];
  handleSendMessage: (e: React.FormEvent) => Promise<void>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  isReplying: boolean;
  selectedConsultant: ConsultantMode | null;
  selectedModel: AIModel | null;
  handleClearHistory: () => void;
  getAvatarUrl: (modelId: string) => string;
  getAvatarHint: (modelId: string) => string;
  setSelectedConsultant: React.Dispatch<React.SetStateAction<ConsultantMode | null>>;
  setSelectedModel: React.Dispatch<React.SetStateAction<AIModel | null>>;
  playClickSound: () => void;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}) => (
  <>
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
           <SidebarTrigger className="md:hidden" />
          <Link href="/" className="flex items-center gap-2">
            <AppLogo className="h-8 w-8 text-primary" />
            <span className="text-lg font-bold tracking-tight">
              AskQuora
            </span>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground hidden md:block">
          Expert Consultations, Absolute Privacy.
        </p>
      </div>
    </header>

    <main className="flex-1">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Instant, Private Access to Expert AI Consultants
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            No sign-ups, no tracking, 100% privacy. Your conversation is
            stored only in your browser and is never saved on our servers.
          </p>
        </div>

        <section id="consultants" className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            1. Select a Consultant Mode
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-8">
            {consultantModes.map((mode) => (
              <Card
                key={mode.id}
                onClick={() => {
                  setSelectedConsultant(mode);
                  playClickSound();
                }}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                  selectedConsultant?.id === mode.id &&
                    "ring-2 ring-primary shadow-lg"
                )}
              >
                <CardHeader className="items-center text-center p-4">
                  <div className="p-3 rounded-full bg-primary/20 text-primary">
                    {React.createElement(mode.icon, { className: "h-6 w-6 sm:h-8 sm:w-8" })}
                  </div>
                  <CardTitle className="mt-2 text-sm sm:text-base">{mode.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-center text-muted-foreground">
                    {mode.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="models" className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            2. Choose Your AI's Personality
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mt-8">
            {aiModels.map((model) => (
              <Card
                key={model.id}
                onClick={() => {
                  setSelectedModel(model);
                  playClickSound();
                }}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                  selectedModel?.id === model.id && "ring-2 ring-primary shadow-lg"
                )}
              >
                <CardHeader className="items-center text-center p-4">
                  <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                    <AvatarImage src={getAvatarUrl(model.id)} alt={model.name} data-ai-hint={getAvatarHint(model.id)} />
                    <AvatarFallback>{model.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-2 text-sm sm:text-base">{model.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-center text-muted-foreground">
                    {model.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="chat" className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">3. Start Chatting</h2>
          <p className="text-center text-muted-foreground">Your conversation is private and anonymous.</p>
          <Card className="mt-8 max-w-4xl mx-auto shadow-2xl">
            <CardContent className="p-0 sm:p-2 md:p-4">
              <div className="flex flex-col h-[70vh] sm:h-[60vh]">
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  <div className="space-y-6">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                        <Sparkles className="h-10 w-10 mb-4" />
                        <p className="text-lg font-medium">Your private conversation begins here.</p>
                        <p>Select a mode and personality, then ask your first question.</p>
                      </div>
                    ) : (
                      messages.map((message, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex items-start gap-2 sm:gap-4 animate-in fade-in",
                            message.role === "user" && "justify-end"
                          )}
                        >
                          {message.role === "assistant" && (
                            <Avatar className="h-8 w-8 border">
                              <AvatarImage src={getAvatarUrl(selectedModel?.id || aiModels[0].id)} data-ai-hint={getAvatarHint(selectedModel?.id || aiModels[0].id)} />
                              <AvatarFallback><Bot size={16}/></AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={cn(
                              "max-w-xs sm:max-w-md lg:max-w-xl rounded-xl p-3 px-4 shadow-sm break-words",
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p>
                          </div>
                          {message.role === "user" && (
                            <Avatar className="h-8 w-8 border">
                              <AvatarFallback><User size={16}/></AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))
                    )}
                    {isReplying && (
                       <div className="flex items-start gap-2 sm:gap-4 animate-in fade-in">
                         <Avatar className="h-8 w-8 border">
                            <AvatarImage src={getAvatarUrl(selectedModel?.id || aiModels[0].id)} data-ai-hint={getAvatarHint(selectedModel?.id || aiModels[0].id)} />
                            <AvatarFallback><Bot size={16}/></AvatarFallback>
                         </Avatar>
                         <div className="max-w-md lg:max-w-xl rounded-xl p-3 px-4 shadow-sm bg-muted flex items-center space-x-2">
                            <Loader className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Thinking...</span>
                         </div>
                       </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="p-2 sm:p-4 border-t relative">
                  <form onSubmit={handleSendMessage}>
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        selectedConsultant && selectedModel
                          ? `Ask ${selectedModel.name} about ${selectedConsultant.name}...`
                          : "Select a mode and model to start..."
                      }
                      className="pr-12 sm:pr-14"
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          handleSendMessage(e);
                        }
                      }}
                      disabled={isReplying || !selectedConsultant || !selectedModel}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-3 sm:right-6 bottom-3 sm:bottom-6 h-8 w-8 sm:h-10 sm:w-10"
                      disabled={!input.trim() || isReplying}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-center mt-4">
            <Button variant="ghost" onClick={handleClearHistory} disabled={messages.length === 0}>
              <Trash className="mr-2 h-4 w-4" /> Clear My Chat History
            </Button>
          </div>
        </section>
      </div>
    </main>

    <footer className="border-t">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 py-6 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AskQuora. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link href="/admin" className="hover:text-foreground">Admin Login</Link>
        </div>
      </div>
    </footer>
  </>
);


export default function ClientPage() {
  const [selectedConsultant, setSelectedConsultant] =
    useState<ConsultantMode | null>(null);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const playClickSound = useSound("/sounds/button-click.mp3");

  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem("chatHistory");
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error("Failed to parse chat history from localStorage", error);
      localStorage.removeItem("chatHistory");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history to localStorage", error);
    }
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isReplying) return;

    if (!selectedConsultant || !selectedModel) {
      toast({
        title: "Selection Required",
        description: "Please select a consultant mode and an AI model to begin.",
        variant: "destructive",
      });
      return;
    }
    playClickSound();

    const newUserMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsReplying(true);

    try {
      const response = await getAIResponse({
        consultantMode: selectedConsultant.name,
        aiModel: selectedModel.name,
        userQuery: input,
      });
      const newAiMessage: Message = {
        role: "assistant",
        content: response.response,
      };
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response from the assistant. Please try again.",
        variant: "destructive",
      });
      setMessages((prev) => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsReplying(false);
    }
  };
  
  const handleClearHistory = () => {
    playClickSound();
    setMessages([]);
    localStorage.removeItem("chatHistory");
    toast({
      title: "Chat History Cleared",
      description: "Your conversation has been permanently deleted.",
    });
  };

  const getAvatarUrl = (modelId: string) => {
    const placeholder = PlaceHolderImages.find(p => p.id === `${modelId.toLowerCase()}-avatar`);
    return placeholder?.imageUrl || "";
  }

  const getAvatarHint = (modelId: string) => {
    const placeholder = PlaceHolderImages.find(p => p.id === `${modelId.toLowerCase()}-avatar`);
    return placeholder?.imageHint || "";
  }

  const mainContentProps = {
    messages,
    handleSendMessage,
    input,
    setInput,
    isReplying,
    selectedConsultant,
    selectedModel,
    handleClearHistory,
    getAvatarUrl,
    getAvatarHint,
    setSelectedConsultant,
    setSelectedModel,
    playClickSound,
    scrollAreaRef,
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h2 className="font-semibold text-lg">Chat History</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-full">
            {messages.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <MessageSquare className="mx-auto h-8 w-8 mb-2" />
                <p>No messages yet.</p>
              </div>
            ) : (
              <SidebarMenu>
                {messages.map((message, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      className="h-auto whitespace-normal py-2"
                      variant="ghost"
                      size="sm"
                    >
                      <div className="flex items-start gap-2">
                        {message.role === 'assistant' ? (
                          <Avatar className="h-6 w-6 border">
                            <AvatarImage src={getAvatarUrl(selectedModel?.id || aiModels[0].id)} data-ai-hint={getAvatarHint(selectedModel?.id || aiModels[0].id)} />
                            <AvatarFallback><Bot size={12} /></AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar className="h-6 w-6 border">
                            <AvatarFallback><User size={12} /></AvatarFallback>
                          </Avatar>
                        )}
                        <span className="text-left flex-1">{message.content}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </ScrollArea>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <MainContent {...mainContentProps} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
