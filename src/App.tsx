import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <>
    {/* Global SVG Filters for "Boiling Line" Stop-Motion Effect */}
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <filter id="boiling-1">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" seed="0" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="boiling-2">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" seed="1" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="boiling-3">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" seed="2" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="boiling-4">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" seed="3" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>

    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </>
);

export default App;
