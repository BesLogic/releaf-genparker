export const jsonStringifyRecursive = (obj) => {
  const seen = new WeakSet();

  return JSON.stringify(
    obj,
    (_, objValue) => {
      if (typeof objValue === 'object' && objValue !== null) {
        // Check if this object has been seen before
        if (seen.has(objValue)) {
          return '[Circular Reference]';
        }

        // Mark the object as seen
        seen.add(objValue);
      }

      return objValue;
    },
    4
  );
};
