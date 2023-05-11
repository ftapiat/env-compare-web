/**
 * Validation type used in props to define if the html element should display
 * a "danger" or "success" state.
 */
enum ValidationState {
  NONE = 0,
  SUCCESS = 1,
  DANGER = 2,
}

const getColorClassFromValidation = (
  validation: ValidationState
): string | undefined => {
  // Indexes need to be the same number of the values in the Enum
  const colorVariants = ['primary', 'success', 'danger'];
  return colorVariants[validation];
};

export { ValidationState, getColorClassFromValidation };
