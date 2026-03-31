import "server-only";

import type { ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";

const prettyCodeOptions: RehypePrettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
  defaultLang: "text",
  grid: true,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    const className = node.properties.className;
    const nextClassName = Array.isArray(className) ? className : [];
    nextClassName.push("highlighted");
    node.properties.className = nextClassName;
  },
  onVisitHighlightedChars(node) {
    const className = node.properties.className;
    const nextClassName = Array.isArray(className) ? className : [];
    nextClassName.push("highlighted-chars");
    node.properties.className = nextClassName;
  },
};

export async function renderMdx(source: string): Promise<ReactElement> {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
    },
    components: mdxComponents,
  });

  return content;
}
