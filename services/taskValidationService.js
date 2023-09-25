const validateTaskInputs = (title, description) => {
    if (!title || !description) {
      return false;
    }
    return true;
  };

module.exports = {
    validateTaskInputs
}