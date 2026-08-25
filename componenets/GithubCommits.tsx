"use client";

import { useEffect, useState } from "react";

interface Commit {
  sha: string;
  message: string;
  time: string;
}

const FALLBACK_COMMITS: Commit[] = [
  { sha: "8e3c1a2", message: "feat: add swipe-to-slide projects", time: "2m ago" },
  { sha: "4f1a7b9", message: "fix: drawer z-index overlaps", time: "15m ago" },
  { sha: "2c9b4e1", message: "feat: establish experience timelines", time: "2h ago" }
];

function formatRelativeTime(dateString: string): string {
  try {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    if (isNaN(diffMs)) return "some time ago";
    
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch (e) {
    return "recent";
  }
}

export default function GithubCommits() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const response = await fetch("https://api.github.com/users/Maxcleetus/events");
        if (!response.ok) throw new Error("API rate limited or failed");
        
        const data = await response.json();
        const pushEvents = data.filter((event: any) => event.type === "PushEvent");
        
        const parsedCommits: Commit[] = [];
        for (const event of pushEvents) {
          if (event.payload && event.payload.commits) {
            const timeStr = formatRelativeTime(event.created_at);
            for (const c of event.payload.commits) {
              parsedCommits.push({
                sha: c.sha ? c.sha.substring(0, 7) : "unknown",
                message: c.message || "Update repository",
                time: timeStr
              });
              if (parsedCommits.length >= 3) break;
            }
          }
          if (parsedCommits.length >= 3) break;
        }

        if (parsedCommits.length > 0) {
          setCommits(parsedCommits);
        } else {
          setCommits(FALLBACK_COMMITS);
        }
      } catch (error) {
        setCommits(FALLBACK_COMMITS);
      } finally {
        setLoading(false);
      }
    }

    fetchCommits();
  }, []);

  return (
    <div className="border border-dashed border-accent/20 bg-accent/5 p-2.5 rounded space-y-1.5 mt-2">
      <span className="text-[8px] font-bold text-accent/50 tracking-wider block">// GITHUB_COMMIT_STREAM</span>
      <div className="space-y-1.5 font-mono text-[9px] text-accent/90">
        {loading ? (
          <div className="text-center text-accent/40 animate-pulse">CONNECTING...</div>
        ) : (
          commits.map((c, idx) => (
            <div key={idx} className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-accent font-bold">{c.sha}</span>
                <span className="text-accent/30">•</span>
                <span className="text-white truncate">{c.message}</span>
              </div>
              <span className="text-accent/40 text-[8px] whitespace-nowrap">{c.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
