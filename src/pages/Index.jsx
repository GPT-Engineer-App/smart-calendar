import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Smart Calendar</h1>
      <p className="text-lg">Organize your events and calculate important dates easily.</p>
      <Button onClick={() => navigate("/calendar")}>Go to Calendar</Button>
    </div>
  );
};

export default Index;