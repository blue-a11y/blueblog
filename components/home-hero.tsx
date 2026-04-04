import Link from "next/link";

const socialLinks = [{ name: "Email", href: "mailto:zhangxuan.nyuk@gmail.com", icon: <MailIcon /> }];

export function HomeHero() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <section className="mx-auto flex min-h-[92vh] w-full max-w-3xl items-center px-6 sm:px-10">
        <div className="flex w-full flex-col gap-10">
          <div className="space-y-8">
            <div className="fade-in space-y-6">
              <span className="inline-flex rounded-full border border-border/60 bg-card/90 px-3.5 py-1.5 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase backdrop-blur-sm">
                Frontend Engineer
              </span>

              <h1 className="text-5xl font-bold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl leading-[1.1]">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-accent to-[oklch(from_var(--accent)_calc(l+0.08)_calc(c*0.8)_calc(h-15))] bg-clip-text text-transparent">
                  张轩
                </span>
                .
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                I build interfaces with React, Next.js, and design systems that make complex things feel simple.
              </p>
            </div>

            <div className="fade-in fade-in-delay-2 flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/18 bg-accent/12 px-7 text-sm font-medium text-accent shadow-[0_18px_40px_-24px_oklch(from_var(--accent)_l_c_h/0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/28 hover:bg-accent/16"
              >
                Read the blog
              </Link>
              <a
                href="mailto:zhangxuan.nyuk@gmail.com"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border/60 bg-card/90 px-7 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-border hover:bg-muted/70"
              >
                Email
              </a>
            </div>
          </div>

          <div className="fade-in fade-in-delay-3 flex items-center gap-4 border-t border-border/50 pt-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                {link.icon}
              </a>
            ))}
            <span className="text-sm text-muted-foreground/60">
              Built with Next.js · HeroUI · Tailwind CSS
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-[18px]">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}
