

import React, { ComponentPropsWithoutRef, PropsWithChildren, useMemo, useState } from "react";
import Header from "./Header";
import { Linkedin ,ArrowUpRight} from "lucide-react";
// -------- Custom UI Components -------- //

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: PropsWithChildren<ButtonProps>) {
  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-slate-900 via-black to-slate-900 text-white hover:shadow-lg dark:from-white dark:via-slate-200 dark:to-white dark:text-slate-900 dark:hover:shadow-white/30"
      : "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:border-slate-600";

  return (
    <button
      className={`px-4 py-2 rounded-xl font-semibold tracking-tight transition duration-200 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type TextareaProps = ComponentPropsWithoutRef<"textarea">;

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full p-4 border border-slate-200 rounded-2xl bg-white/90 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/10 text-base resize-none transition dark:bg-slate-900/70 dark:text-white dark:border-slate-700 dark:placeholder:text-slate-500 dark:focus:ring-white/10 ${className}`}
      {...props}
    />
  );
}

type CardProps = PropsWithChildren<
  ComponentPropsWithoutRef<"div"> & {
    tone?: "default" | "muted";
  }
>;

export function Card({ children, className = "", tone = "default" }: CardProps) {
  const toneClasses =
    tone === "muted"
      ? "bg-slate-50/70 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800"
      : "bg-white border-white/60 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:bg-slate-900 dark:border-slate-800 dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]";

  return (
    <div className={`rounded-3xl border ${toneClasses} ${className}`}>{children}</div>
  );
}

const bulletClass =
  "relative pl-5 text-left text-sm text-slate-600 leading-relaxed before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary/70 dark:text-slate-300";

function LearnInPublicInsights() {
 const sections = [
  {
    title: "About this feature",
    description:
      "A quick way to log what you worked on or learned each day.",
    bullets: [
  "Write your update in minutes, not hours.",
  "Shows steady proof of your progress over time.",
  "Keeps your profile active and visible without extra effort.",
  "Opens doors by showing you're consistent and serious about your skills."
]

  },
  {
    title: "What to share",
    description:
      "Keep it short and honest. Just share what actually happened today.",
    bullets: [
      "Bugs you fixed or problems you solved.",
      "New concepts, tools, or ideas you explored.",
      "Projects you started or made progress on.",
      "Issues you're stuck on right now.",
      "Any small win, metric, or question you're thinking about."
    ]
  },
  {
    title: "How it helps",
    description:
      "Small daily updates build trust faster than big polished posts.",
    bullets: [
      "Shows consistency to hiring managers and teammates.",
      "Brings in feedback from people who can help.",
      "Creates a searchable record of everything you've learned."
    ]
  }
];


  return (
    <div className="space-y-4">
          
      <Card className="p-7 space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Why it matters</p>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">About the Learn In Public </h2>
        <p className="text-sm text-slate-600 max-w-3xl dark:text-slate-300">
          Keep momentum visible by logging micro-updates. These entries act like shipping receipts for your curiosity and work ethic.
        </p>
        <ul className="space-y-3">
          {sections[0] && sections[0].bullets.map((point) => (
            <li key={point} className={bulletClass}>
              {point}
            </li>
          ))}
        </ul>
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        {sections.slice(1).map((section) => (
          <Card key={section.title} className="p-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">{section.title}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{section.description}</p>
            <ul className="space-y-3">
              {section.bullets.map((point) => (
                <li key={point} className={bulletClass}>
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ------------- Main Learn In Public Feature ------------- //

type SharePlatform = "x" | "linkedin";

export default function LearnInPublic() {
  const [text, setText] = useState("");
  
  const [isSharing, setIsSharing] = useState<SharePlatform | null>(null);

  const platformConfigs: Record<
    SharePlatform,
    {
      label: string;
      badge: string | React.ReactNode;
      signature: string;
      variant: "primary" | "secondary";
      builder: (encodedPayload: string) => string;
    }
  > = {
    x: {
      label: "Share on X",
      badge: <ArrowUpRight size={16} />,
      signature: "#LearnInPublic #SkillHigh @SkillHighedu",
      variant: "primary",
      builder: (encoded) => `https://twitter.com/intent/tweet?text=${encoded}`
    },
    linkedin: {
      label: "Post on LinkedIn",
      badge: <Linkedin size={16} />,
      signature: "#LearnInPublic #SkillHigh ",
      variant: "secondary",
      builder: (encoded) => `https://www.linkedin.com/feed/?shareActive=true&text=${encoded}`
    }
  };

  const signatureSuffix = `\n\n${platformConfigs.x.signature}`;
  const charLimit = Math.max(280 - signatureSuffix.length, 0);
  const characters = text.trim().length;
  const remaining = Math.max(charLimit - characters, 0);

  const quickPrompts = useMemo(
    () => [
      "Today I learned that...",
      "A challenge I overcame:",
      "One insight from building:",
      "A question I'm now exploring:"
    ],
    []
  );

  const handleShare = (platform: SharePlatform) => {
    if (!text.trim()) return;

    const signature = platformConfigs[platform].signature;
    const payload = `${text.trim()}\n\n${signature}`;
    const encoded = encodeURIComponent(payload);

    setIsSharing(platform);
    window.open(platformConfigs[platform].builder(encoded), "_blank", "noopener,noreferrer");
    // setPosts((prev) => [text.trim(), ...prev]);
    setText("");
    setTimeout(() => setIsSharing(null), 600);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 space-y-10 text-slate-900 dark:text-white">
      {/* Header */}

      <Header title="Share your work" />
      <Card className="p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_50%)] pointer-events-none dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_50%)]" />
        <div className="relative space-y-5 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary text-white text-xs tracking-[0.2em] uppercase dark:bg-white dark:text-slate-900">
            Learn In Public
          </span>
         <h1 className="text-4xl font-bold tracking-tight text-primary dark:text-white">
  Show your work. Show your progress.
</h1>
<p className="text-base text-slate-600 mx-auto max-w-2xl dark:text-slate-300">
  Log what you build, fix, or learn. These small updates compound into proof of skill, discipline, and direction. The journey matters more than polished results.
</p>

        </div>
      </Card>

  <div className="grid md:grid-cols-3 gap-4">
  {[
    {
      title: "Write",
      body: "Share what you learned or built today. Keep it short and honest."
    },
    {
      title: "Share",
      body: "Post it publicly so others can see your progress."
    },
    {
      title: "Interact",
      body: "Reply, discuss, and learn from others in the community."
    }
  ].map((step, idx) => (
    <Card key={step.title} className="p-6 space-y-2 hover:bg-primary/10 dark:hover:bg-white/5">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Step {idx + 1}</p>
      <h3 className="text-xl font-semibold text-primary dark:text-white">{step.title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">{step.body}</p>
    </Card>
  ))}
</div>

      <LearnInPublicInsights />

      {/* Input Section */}
      <Card className="p-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Daily log</p>
            <h2 className="text-2xl font-semibold text-primary dark:text-white">What did you learn today?</h2>
          </div>
          <span
            className={`text-sm font-medium ${
              remaining < 40 ? "text-amber-600" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {remaining} characters left
          </span>
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write what you learned today…"
          maxLength={charLimit}
          className="min-h-[160px]"
        />
        {/* <Card tone="muted" className="p-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Locked tags</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(platformConfigs) as SharePlatform[]).map((platform) => (
              <span
                key={platform}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold dark:bg-slate-900 dark:border-slate-700 dark:text-white"
              >
                <span className="uppercase tracking-[0.2em] text-[10px] text-slate-400 dark:text-slate-500">{platform}</span>
                {platformConfigs[platform].signature}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500">Tags are auto-appended per platform and cannot be edited.</p>
        </Card> */}
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setText((prev) => (prev ? `${prev}\n${prompt} ` : `${prompt} `))}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-slate-300 text-slate-600 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-500"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(platformConfigs) as SharePlatform[]).map((platform) => {
            const config = platformConfigs[platform];
            return (
              <Button
                key={platform}
                onClick={() => handleShare(platform)}
                disabled={!text.trim() || !!isSharing}
                className="w-full py-4 text-lg flex items-center justify-center gap-2 cursor-pointer"
                variant={config.variant}
              >
                <span>{isSharing === platform ? "Opening…" : config.label}</span>
                <span className="text-sm opacity-70">{config.badge}</span>
              </Button>
            );
          })}
        </div>
      </Card>

   
      {/* Recent Posts */}
      {/* {posts.length > 0 && (
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Your Recent Shares</h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">{posts.length} total entries</span>
          </div>

          <div className="space-y-4">
            {posts.map((post, idx) => (
              <Card key={idx} className="p-5 whitespace-pre-wrap text-slate-800 text-sm leading-relaxed dark:text-slate-100 dark:bg-slate-900/70">
                {post}
              </Card>
            ))}
          </div>
        </section>
      )} */}
    </div>
  );
}