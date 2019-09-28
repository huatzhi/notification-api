export const handleOutput = async (res, dbFunction, params, successStatusCode, validations, sanitizers) => {
  try {
    if (!validations) {
      res.status(400).json({message: "Invalid input. Please check if the input is correct."});
      return;
    } 
    let output = {message: "Something is wrong"};
    if (dbFunction) {
      if (sanitizers && sanitizers.length) {
        for (let i = 0; i < params.length; i++) {
          if (typeof sanitizers[i] == "function") {
            params[i] = sanitizers[i](params[i]);
          }
        }
      }

      output = await dbFunction.call(this, ...params);
    }

    res.status(successStatusCode).json(output);
  } catch (err) {
    const errorTime = new Date(Date.now());
    const defaultErrorMessage = "Please contact system admin regarding to this error: " + errorTime;
    console.error(err);
    res.status(err && err.code || 400).json({
      message: err && err.message || defaultErrorMessage
    });
  }
}