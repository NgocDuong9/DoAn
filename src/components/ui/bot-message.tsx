"use client";

import { cn } from "@/libs/utils";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { StreamableValue, useStreamableValue } from "ai/rsc";
import { useStreamableText } from "@/libs/hooks/use-streamable-text";
import classNames from "classnames";
import { MemoizedReactMarkdown } from "./markdown";

// Different types of message bubbles.

export function UserMessage({ content }: { content: string }) {
  return (
    <div
      className={classNames(
        "px-3 py-2 max-w-[280px] mb-2 w-fit rounded-xl text-sm whitespace-pre-wrap bg-ai-message rounded-br-none text-white ml-auto"
      )}
    >
      <MemoizedReactMarkdown>{content}</MemoizedReactMarkdown>
    </div>
  );
}

export function BotMessage({
  content,
  className,
}: {
  content: string | StreamableValue<string>;
  className?: string;
}) {
  const text = useStreamableText(content);

  return (
    <div className={cn("group relative flex items-start", className)}>
      <div
        className={classNames(
          "px-3 py-2 md:max-w-[280px] mr-10 md:mr-0 mb-2 w-fit rounded-xl text-sm whitespace-pre-wrap bg-[#F4FAFC] rounded-bl-none"
        )}
      >
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                }

                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            },
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="group relative flex items-start">
      <div
        className={cn(
          "flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm",
          !showAvatar && "invisible"
        )}
      >
        USER ICON
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>
  );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "mt-2 flex items-center justify-center gap-2 text-xs text-gray-500"
      }
    >
      <div className={"max-w-[600px] flex-initial p-2"}>{children}</div>
    </div>
  );
}
