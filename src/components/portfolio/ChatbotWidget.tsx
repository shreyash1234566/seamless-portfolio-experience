import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatbot } from '@/hooks/useChatbot';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { messages, isLoading, isWakingUp, sendMessage } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Card className="w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] flex flex-col shadow-2xl border-primary/20 backdrop-blur-md bg-background/95 mb-4 animate-in slide-in-from-bottom-5">
          <CardHeader className="flex-none p-5 flex flex-row items-center justify-between border-b pb-4">
            <div className="flex flex-col">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                PersonalBot Assistant
              </CardTitle>
              <span className="text-sm text-muted-foreground mt-1">Ask me about Shreyash</span>
            </div>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          
          {/* Scrollable Message Area */}
          <CardContent className="flex-1 p-0 overflow-hidden relative">
            <ScrollArea className="h-full px-5 py-4">
              <div className="flex flex-col gap-5 pb-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${
                      msg.role === 'user' ? 'self-end' : 'self-start'
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-2xl text-base whitespace-pre-wrap break-words ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-muted text-foreground rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex flex-col gap-2">
                    <div className="self-start max-w-[80%] px-4 py-3 rounded-2xl rounded-tl-sm bg-muted text-muted-foreground text-base flex gap-1">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                    </div>
                    {isWakingUp && (
                      <span className="text-sm text-muted-foreground text-center animate-pulse pt-2 px-2">
                        The free server is waking up from sleep. This might take roughly 30-50 seconds. Thanks for holding on! ☕
                      </span>
                    )}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="flex-none p-4 pt-0 border-t">
            <div className="flex w-full items-center gap-3 mt-4">
              <Input 
                placeholder="Type a message..." 
                className="flex-1 bg-background/50 h-12 text-base"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button size="icon" className="h-12 w-12" onClick={handleSend} disabled={!inputValue.trim() || isLoading}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Floating Action Button */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full h-16 w-16 shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-200"
        size="icon"
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageSquare className="h-7 w-7" />}
      </Button>
    </div>
  );
}