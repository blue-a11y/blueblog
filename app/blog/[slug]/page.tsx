import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentPosts, getPostBySlug, getPostSummaries } from "@/lib/posts";
import { getOgImageUrl, getSiteUrl } from "@/lib/site";
import { renderMdx } from "@/lib/mdx";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

export async function generateStaticParams() {
  const posts = await getPostSummaries();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, { includeDrafts: false });

  if (!post) {
    return {
      title: "Post not found · BlueBlog",
    };
  }

  const title = post.title;
  const description = post.description;
  const url = `/blog/${post.slug}`;
  const absoluteUrl = getSiteUrl(url);
  const imageUrl = getOgImageUrl(post.title);

  return {
    title,
    description,
    keywords: post.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl,
      publishedTime: `${post.date}T00:00:00.000Z`,
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} open graph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

function NavCard({
  eyebrow,
  title,
  description,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex min-h-44 flex-col gap-4 rounded-[1.75rem] border border-border/80 bg-card/95 px-6 py-5 backdrop-blur-xl">
      <div className="space-y-2 border-b border-border/70 pb-4">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{eyebrow}</p>
        <h2 className="text-xl tracking-[-0.04em] text-foreground">{title}</h2>
      </div>
      <p className="text-sm leading-7 text-muted-foreground">{description}</p>
      {href && cta ? (
        <Link
          href={href}
          className="mt-auto inline-flex w-fit items-center rounded-full border border-border/80 bg-card/90 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
        >
          {cta}
        </Link>
      ) : null}
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, { includeDrafts: false });

  if (!post) {
    notFound();
  }

  const content = await renderMdx(post.content);
  const { previousPost, nextPost } = await getAdjacentPosts(post.slug);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
      <div className="w-full space-y-10">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border border-border/80 bg-card/90 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
          >
            Back to blog
          </Link>
          <p className="text-sm text-muted-foreground">{post.readingTime} min read</p>
        </nav>

        <article className="mx-auto w-full max-w-3xl space-y-10">
          <header className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/80 bg-card/95 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
                {dateFormatter.format(new Date(post.date))}
              </p>
              <h1 className="text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{post.description}</p>
            </div>
          </header>

          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-[0_8px_40px_-16px_var(--shadow)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="prose-shell">{content}</div>
          </div>
        </article>

        <section className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-2">
          <NavCard
            eyebrow="Previous post"
            title={previousPost ? previousPost.title : "No previous post"}
            description={
              previousPost ? previousPost.description : "You are at the newest published entry."
            }
            href={previousPost ? `/blog/${previousPost.slug}` : undefined}
            cta={previousPost ? "Open previous" : undefined}
          />
          <NavCard
            eyebrow="Next post"
            title={nextPost ? nextPost.title : "No next post"}
            description={nextPost ? nextPost.description : "You are at the oldest published entry."}
            href={nextPost ? `/blog/${nextPost.slug}` : undefined}
            cta={nextPost ? "Open next" : undefined}
          />
        </section>
      </div>
    </main>
  );
}
