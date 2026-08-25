"use client";

import SpotlightCard from "./SpotlightCard";
import GlitchText from "./GlitchText";
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiPython, 
  SiMongodb, 
  SiDocker, 
  SiGit, 
  SiTailwindcss 
} from "react-icons/si";

const SKILL_ICONS = [
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Python", icon: SiPython },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: SiGit },
  { name: "Tailwind", icon: SiTailwindcss }
];

export default function Diagnostics() {
  return (
    <SpotlightCard className="p-4 border border-dashed rounded-lg bg-[rgba(var(--accent-rgb),0.02)] h-full overflow-hidden flex flex-col justify-between">
      <h2 className="text-base font-bold text-white tracking-widest uppercase mb-3">
        <GlitchText text="Skills" speed={30} triggerOnHover={true} />
      </h2>

      <div className="border border-dashed border-accent/20 bg-black/40 rounded p-4 flex-1 overflow-hidden flex flex-col justify-center select-none">
        <div className="grid grid-cols-5 gap-y-6 gap-x-3 w-full justify-items-center">
          {SKILL_ICONS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center group relative cursor-pointer"
                title={skill.name}
              >
                <div className="text-accent/60 group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_2px_rgba(var(--accent-rgb),0.15)] group-hover:drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.85)] transform group-hover:scale-120 duration-200">
                  <Icon className="w-8 h-8" />
                </div>
                <span className="absolute bottom-[-16px] text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent uppercase tracking-widest pointer-events-none whitespace-nowrap z-10 bg-zinc-950 px-1.5 py-0.5 border border-dashed border-accent/25 rounded">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </SpotlightCard>
  );
}
