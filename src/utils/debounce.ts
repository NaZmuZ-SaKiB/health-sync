const debounce = (func: any, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: any) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
