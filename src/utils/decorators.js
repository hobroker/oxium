const callBefore = value => (parent, methodName, descriptor) => {
  const original = descriptor.value;

  descriptor.value = async function overridden(...args) {
    await this::value(...args);

    return this::original(...args);
  };

  return descriptor;
};

const callAfter = (fn, skipIfNull = true) => (
  parent,
  methodName,
  descriptor,
) => {
  const original = descriptor.value;

  descriptor.value = async function overridden(...args) {
    const result = await this::original(...args);

    if (result === null && skipIfNull) {
      return result;
    }

    return fn(result);
  };

  return descriptor;
};

export { callBefore, callAfter };
