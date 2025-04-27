
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import TemplatesPage from "./pages/TemplatesPage";
import NewTemplatePage from "./pages/NewTemplatePage";
import TemplateEditPage from "./pages/TemplateEditPage";
import TemplatePreviewPage from "./pages/TemplatePreviewPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/templates"
            element={
              <MainLayout>
                <TemplatesPage />
              </MainLayout>
            }
          />
          <Route
            path="/templates/new"
            element={
              <MainLayout>
                <NewTemplatePage />
              </MainLayout>
            }
          />
          <Route
            path="/templates/:id/edit"
            element={
              <MainLayout>
                <TemplateEditPage />
              </MainLayout>
            }
          />
          <Route
            path="/templates/:id/preview"
            element={
              <MainLayout>
                <TemplatePreviewPage />
              </MainLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <MainLayout>
                <SettingsPage />
              </MainLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
