export function debounce(func: () => void, wait: number) {
  let timeout: number | undefined;
  return () => {
    clearTimeout(timeout);
    timeout = window.setTimeout(func, wait);
  };
};
