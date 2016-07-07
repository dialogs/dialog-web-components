function compileMessages(prefix, messages) {
  const result = {};
  Object.keys(messages).forEach((key) => {
    const value = messages[key];
    const id = prefix + '.' + key;
    if (typeof value === 'object') {
      Object.assign(result, compileMessages(id, value));
    } else {
      result[id] = value;
    }
  });

  return result;
}

export default compileMessages;
