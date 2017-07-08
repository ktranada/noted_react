
const createErrorsHash = (fields = []) => {
  const errors = {};
  fields.forEach(field => errors[field] = '');
  return errors;
}

class FormValidator {
  constructor(fields) {
    this.hasErrors = false;
    this.fields = fields.filter(field => Boolean(field));
    this.errors = createErrorsHash(fields);
  }

  updateFields(newFields) {
    newFields = newFields.filter(field => Boolean(field));
    const newErrorsHash = {};
    newFields.forEach(field => {
      const error = this.errors[field];
      if (typeof error !== 'undefined') {
        newErrorsHash[field] = error;
      } else {
        newErrorsHash[field] = '';
      }
    })

    this.fields = newFields;
    this.errors = newErrorsHash;
  }

  verifyInputPresence(currentState) {
    let hasErrors = false;
    this.fields.forEach(field => {
      const value = currentState[field];
      if (typeof value !== 'undefined') {
        if (!value.trim()) {
          this.errors[field] = `${field[0].toUpperCase() + field.slice(1)} cannot be blank`;
          hasErrors = true;
        } else {
          this.errors[field] = '';
        }
      }
    });

    this.hasErrors = hasErrors;
    return !this.hasErrors;
  }

  notifyComponent(component) {
    component.setState({
      errors: this.errors
    });
  }
}


export default FormValidator;
