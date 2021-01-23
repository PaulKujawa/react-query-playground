import React from "react";

interface useIntersectionObserverProps extends IntersectionObserverInit {
  target: React.MutableRefObject<Element | null>;
  enabled: boolean;
  onIntersect: () => void;
}

export const useIntersectionObserver = ({
  target,
  enabled,
  onIntersect,
  root,
  rootMargin,
  threshold,
}: useIntersectionObserverProps) => {
  React.useEffect(() => {
    if (!target.current || !enabled) return;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onIntersect(),
      { root, rootMargin, threshold }
    );

    const elem = target.current;
    intersectionObserver.observe(elem);

    return () => {
      intersectionObserver.unobserve(elem);
    };
  }, [target, enabled, onIntersect, root, rootMargin, threshold]);
};

export const useUrl = () => {
  const getUrl = () => new URL(window.location.toString());
  const [url, setUrl] = React.useState(getUrl());

  React.useEffect(() => {
    const onPopstate = () => setUrl(getUrl());
    window.addEventListener("popstate", onPopstate);

    return () => window.removeEventListener("popstate", onPopstate);
  }, []);

  return url;
};

export const useUrlSearchParams = () => {
  const { searchParams } = useUrl();

  return searchParams;
};

export const useUrlSearchParam = (key: string) => {
  const setValue = (value: string | undefined | null) => {
    const url = new URL(window.location.toString());

    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }

    /* TODO despite the specs stating otherwise this used to work
     * but now does not trigger popstate; it avoided a hard reload
     *
     * window.history.pushState(null, "", url.toString());
     */
    window.location.search = url.search;
  };

  const value = useUrlSearchParams().get(key);

  return [value, setValue] as const;
};
