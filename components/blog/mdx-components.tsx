import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

function Callout({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "accent" }) {
  return (
    <div
      className={[
        "my-8 rounded-3xl border px-5 py-4 text-sm leading-7",
        tone === "accent"
          ? "border-accent/30 bg-accent/8 text-foreground"
          : "border-border/80 bg-muted/55 text-foreground/88",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function InlineCode(props: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={[
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.92em] text-foreground",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export const mdxComponents: MDXComponents = {
  Callout,
  h2: (props) => <h2 {...props} className="mt-14 text-3xl font-semibold tracking-[-0.04em] text-foreground" />,
  h3: (props) => <h3 {...props} className="mt-10 text-2xl font-semibold tracking-[-0.03em] text-foreground" />,
  p: (props) => <p {...props} className="text-[1.05rem] leading-8 text-foreground/88" />,
  a: (props) => (
    <a
      {...props}
      className="font-medium text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:text-foreground"
    />
  ),
  ul: (props) => <ul {...props} className="my-6 list-disc space-y-3 pl-6 text-[1.02rem] leading-8 text-foreground/88" />,
  ol: (props) => <ol {...props} className="my-6 list-decimal space-y-3 pl-6 text-[1.02rem] leading-8 text-foreground/88" />,
  li: (props) => <li {...props} className="pl-1" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="my-8 border-l-4 border-accent/40 pl-5 text-[1.02rem] leading-8 text-foreground/80 italic"
    />
  ),
  hr: () => <hr className="my-12 border-border/80" />,
  code: (props) => {
    if (props.className?.includes("language-")) {
      return <code {...props} />;
    }

    return <InlineCode {...props} />;
  },
};
