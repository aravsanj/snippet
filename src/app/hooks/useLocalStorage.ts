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
      return null;
    }

    _values.unshift(value);

    localStorage.setItem(key, JSON.stringify(_values));

    return _values;
  }

  function pull(key: string, id: string) {
    if (!key || !id) {
      return null;
    }

    const _values = JSON.parse(localStorage.getItem(key) ?? "[]");

    if (!Array.isArray(_values)) {
      console.error("Failed: not an array");
      return null;
    }

    if (_values.length === 0) {
      console.error("Array is empty");
      return;
    }

    const _afterPull = _values.filter((val: any) => val.id !== id);

    set(key, _afterPull);

    return _afterPull;
  }

  function update(key: string, id: string, value: unknown) {
    if (!key || !id) {
      return null;
    }

    const _values = JSON.parse(localStorage.getItem(key) ?? "[]");

    if (!Array.isArray(_values)) {
      console.error("Failed: not an array");
      return null;
    }

    if (_values.length === 0) {
      console.error("Array is empty");
      return;
    }

    const _afterUpdate = _values.map((val: any) => {
      if (val.id === id) {
        return value;
      }

      return val;
    });

    set(key, _afterUpdate);

    return _afterUpdate;
  }

  function pick(key: string, id: string) {
    if (!key || !id) {
      return null;
    }

    const _values = JSON.parse(localStorage.getItem(key) ?? "[]");

    if (!Array.isArray(_values)) {
      console.error("Failed: not an array");
      return null;
    }

    if (_values.length === 0) {
      console.error("Array is empty");
      return;
    }

    const _pick = _values.find((val: any) => {
      if (val.id === id) {
        return val;
      }
    });

    return _pick;
  }

  return {
    get,
    set,
    push,
    pull,
    update,
    pick,
  };
};

export default useLocalStorage;
