import React from 'react';

type UseChatScrollType<T> = {
  dep: T;
  onLoadMore?: () => void;
  hasMore?: boolean;
};

// export default function useChatScroll<T>(
//   dep: T
// ): React.MutableRefObject<HTMLDivElement | null> {
//   const ref = React.useRef<HTMLDivElement>(null);
//   React.useEffect(() => {
//     if (ref.current) {
//       ref.current.scrollTop = ref.current.scrollHeight;
//     }
//   }, [dep]);
//   return ref;
// }

export default function useChatScroll<T>({
  dep,
  onLoadMore,
  hasMore = false,
}: UseChatScrollType<T>): React.MutableRefObject<HTMLDivElement | null> {
  const ref = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear (if user is near bottom)
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    if (nearBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [dep]);

  // Handle scroll-to-top for loading older messages
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !onLoadMore) return;
    const handleScroll = () => {
      if (el.scrollTop === 0 && hasMore) {
        const prevHeight = el.scrollHeight;
        onLoadMore?.();
        // Preserve scroll position after loading more
        setTimeout(() => {
          if (ref.current) {
            const newHeight = ref.current.scrollHeight;
            ref.current.scrollTop = newHeight - prevHeight;
          }
        }, 100);
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [onLoadMore, hasMore]);

  return ref;
}
