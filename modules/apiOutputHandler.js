export const handleOutput = async (res, dbFunction, params, successStatusCode) => {
  try {
    let output = await dbFunction.call(this, params);
    res.status(successStatusCode).json(output);
  } catch (err) {
    const errorTime = Date.now();
    const defaultErrorMessage = "Please contact system admin regarding to this error: " + errorTime;
    console.error(`${err} at ${errorTime}`);
    res.status(err && err.code || 400).json({
      message: err && err.message || defaultErrorMessage
    });
  }
}