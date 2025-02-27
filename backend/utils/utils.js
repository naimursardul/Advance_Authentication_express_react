function deleteUndefinedProp(obj) {
  if (typeof obj !== "object") {
    throw new Error("Input must be object.");
  }

  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}

export { deleteUndefinedProp };
