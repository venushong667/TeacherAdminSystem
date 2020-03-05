const validateEmail = email => {
  if (!email) return false;

  if (typeof email !== "string") return false;

  // Simple, permissive validation for _@_._
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) return false;

  return true;
};

module.exports = { validateEmail };
