import type { ComponentType } from "react";

type ICodeSnippet = {
  code: string;
  tone: string;
};

type ISocialLink = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  href: string;
};

type IHomeContent = {
  intro: string;
  title: {
    text: string;
    highlight: string;
  };
  terminal: {
    prompt: string;
    commands: readonly string[];
    statusLabel: string;
  };
  code: {
    prompt: string;
    snippets: readonly ICodeSnippet[];
  };
  socialLinks: readonly ISocialLink[];
  footer: string;
};

export type { ICodeSnippet, IHomeContent, ISocialLink };
