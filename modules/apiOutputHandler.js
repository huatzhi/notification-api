export const handleOutput = async (res, dbFunction, params, successStatusCode, validations) => {
  try {
    if (!validations) {
      res.status(400).json({message: "Invalid input. Please check if the input is correct."});
      return;
    }
    let output = {message: "Something is wrong"};
    if (dbFunction) {
      output = await dbFunction.call(this, ...params);
    }

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