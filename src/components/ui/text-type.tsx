import {
  createElement,
  useEffect,
  useMemo,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "gsap";

import { cn } from "@/lib/utils";

type IVariableSpeed = {
  min: number;
  max: number;
};

type ITextTypeProps<T extends ElementType = "span"> = Omit<
  ComponentPropsWithoutRef<T>,
  "children"
> & {
  text: string | string[];
  as?: T;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  hideCursorOnComplete?: boolean;
  cursorCharacter?: ReactNode;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: IVariableSpeed;
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  reserveSpace?: boolean;
  highlight?: string;
  highlightClassName?: string;
};

const getRandomSpeed = ({ min, max }: IVariableSpeed) => {
  return Math.random() * (max - min) + min;
};

const TextType = <T extends ElementType = "span">({
  text,
  as,
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorWhileTyping = false,
  hideCursorOnComplete = false,
  cursorCharacter = "|",
  cursorClassName,
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  reserveSpace = false,
  highlight,
  highlightClassName,
  ...props
}: ITextTypeProps<T>) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [hasStarted, setHasStarted] = useState(initialDelay === 0);
  const containerRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const observerId = useId();

  const textArray = useMemo(() => {
    return Array.isArray(text) ? text : [text];
  }, [text]);

  const currentText = textArray[currentTextIndex] ?? "";
  const Component = as ?? "span";
  const shouldHideCursor = hideCursorWhileTyping && currentCharIndex < currentText.length;
  const isSentenceComplete = !isDeleting && currentCharIndex === currentText.length;
  const cursorIsVisible =
    showCursor && hasStarted && !shouldHideCursor && !(hideCursorOnComplete && isSentenceComplete);
  const reservedText = textArray.reduce((longest, item) => {
    return item.length > longest.length ? item : longest;
  }, "");

  useEffect(() => {
    if (!cursorIsVisible || !cursorRef.current) {
      return;
    }

    gsap.set(cursorRef.current, { opacity: 1 });

    const tween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      tween.kill();
    };
  }, [cursorBlinkDuration, cursorIsVisible]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsVisible(true);
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [startOnVisible]);

  useEffect(() => {
    const resetId = window.setTimeout(() => {
      setDisplayedText("");
      setCurrentCharIndex(0);
      setIsDeleting(false);
      setCurrentTextIndex(0);
      setHasStarted(initialDelay === 0);
    }, 0);

    return () => {
      window.clearTimeout(resetId);
    };
  }, [initialDelay, text]);

  useEffect(() => {
    if (!isVisible || initialDelay === 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHasStarted(true);
    }, initialDelay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [initialDelay, isVisible, text]);

  useEffect(() => {
    if (!isVisible || !hasStarted) {
      return;
    }

    if (!isDeleting && currentCharIndex === currentText.length) {
      onSentenceComplete?.(currentText, currentTextIndex);

      if (!loop && currentTextIndex === textArray.length - 1) {
        return;
      }

      const timeoutId = window.setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    if (isDeleting && currentCharIndex === 0) {
      const switchId = window.setTimeout(() => {
        setIsDeleting(false);
        setCurrentTextIndex((currentTextIndex + 1) % textArray.length);
      }, 0);

      return () => {
        window.clearTimeout(switchId);
      };
    }

    const timeoutId = window.setTimeout(
      () => {
        const nextCharIndex = isDeleting ? currentCharIndex - 1 : currentCharIndex + 1;
        const nextText = reverseMode
          ? currentText.slice(currentText.length - nextCharIndex)
          : currentText.slice(0, nextCharIndex);

        setDisplayedText(nextText);
        setCurrentCharIndex(nextCharIndex);
      },
      isDeleting ? deletingSpeed : variableSpeed ? getRandomSpeed(variableSpeed) : typingSpeed,
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    currentCharIndex,
    currentText,
    currentTextIndex,
    deletingSpeed,
    hasStarted,
    isDeleting,
    isVisible,
    loop,
    onSentenceComplete,
    pauseDuration,
    reverseMode,
    textArray.length,
    typingSpeed,
    variableSpeed,
  ]);

  const renderDisplayedText = () => {
    if (!highlight) {
      return displayedText;
    }

    const highlightStart = displayedText.indexOf(highlight);

    if (highlightStart === -1) {
      return displayedText;
    }

    const highlightEnd = highlightStart + highlight.length;

    return (
      <>
        {displayedText.slice(0, highlightStart)}
        <span className={highlightClassName}>
          {displayedText.slice(highlightStart, highlightEnd)}
        </span>
        {displayedText.slice(highlightEnd)}
      </>
    );
  };

  const content = (
    <span className={cn(reserveSpace && "col-start-1 row-start-1", textColors[currentTextIndex])}>
      {renderDisplayedText()}
      {cursorIsVisible && (
        <span ref={cursorRef} className={cn("inline-block", cursorClassName)}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );

  const element = createElement(
    Component,
    {
      className: cn(
        reserveSpace ? "inline-grid" : "inline-block",
        "whitespace-pre-wrap",
        className,
      ),
      ...props,
    },
    reserveSpace && (
      <span className="pointer-events-none invisible col-start-1 row-start-1">
        {reservedText}
        {showCursor ? cursorCharacter : null}
      </span>
    ),
    content,
  );

  if (!startOnVisible) {
    return element;
  }

  return (
    <span ref={containerRef} className="contents" data-text-type-observer={observerId}>
      {element}
    </span>
  );
};

export { TextType };
