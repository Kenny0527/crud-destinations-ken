export function filterObj(objTarget, location, res) {
  if (location) {
    return res.send(
      Object.fromEntries(
        Object.entries(objTarget).filter(
          (arrayValue) =>
            arrayValue[1].location.toLowerCase() === location.toLowerCase()
        )
      )
    );
  }
  return res.send(objTarget);
}
