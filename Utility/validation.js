export function validateString(location, destination, res) {
  if (!location || !destination) {
    return res
      .status(400)
      .send(`Error: soemthing is wrong with the client data.`);
  }
  if (typeof location !== "string" || typeof destination !== "string") {
    return res
      .status(400)
      .send(`Error: soemthing is wrong with the client data.`);
  }
}

export function validateRequiredField(field) {
  if (!field || typeof field !== "string") {
    return false;
  }
  return true;
}
