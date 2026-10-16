"use client";

import Agent from "./Agent";
import { AgenQAgent } from "./AgenQAgent";
import { useAgenQEnabled } from "@/hooks/useAgenQToggle";

export default function AgentProvider() {
  const { enabled, mounted } = useAgenQEnabled();

  if (!mounted) return null;

  return enabled ? <AgenQAgent /> : <Agent />;
}
