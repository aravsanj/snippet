const useLocalStorage = () => {
  function get(key: string) {
    const result = JSON.parse(localStorage.getItem(key) ?? "[]");

    if (result) {
      return result;
    }

    return;
  }

  function set(key: string, value: unknown): void {
    if (!key || !value) {
      return;
    }

    const _valueString = JSON.stringify(value);

    localStorage.setItem(key, _valueString);
  }

  function push(key: string, value: unknown): unknown[] | null {
    if (!key || !value) {
      return null;
    }

    const _values = JSON.parse(localStorage.getItem(key) ?? "[]");

    if (!Array.isArray(_values)) {
      console.error("Failed: not an array");
    }

    _values.push(value);

    localStorage.setItem(key, JSON.stringify(_values));

    return _values;
  }

  function pull(key: string, id: string) {
    if (!key || !id) {
      return null;
    }

    const _values = JSON.parse(localStorage.getItem(key) ?? "[]");

    if (_values.length === 0) {
      console.error("Array is empty");
      return;
    }

    const _afterPull = _values.filter((val: any) => val.id !== id);

    set(key, _afterPull);

    return _afterPull;
  }

  return {
    get,
    set,
    push,
    pull,
  };
};

export default useLocalStorage;
