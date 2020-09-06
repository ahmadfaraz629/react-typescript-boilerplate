import get from 'lodash/get';
import set from 'lodash/set';
import { useForm } from 'react-hook-form';

import { singletonHook } from 'react-singleton-hook';

const formHooks = new Map();
const formRefs = new Map();

const defaultFunction = () => {};

const updateValues = setValue => {
  return values => {
    if (values)
      Object.keys(values).forEach(key => {
        setValue(key, values[key]);
      });
  };
};

const djangoErrors = setError => {
  return values => {
    if (values)
      Object.keys(values).forEach(key => {
        const message = Array.isArray(values[key]) ? values[key][0] : values[key];
        setError(key, {
          type: 'manual',
          message
        });
      });
  };
};

export const checkValid = func => {
  return func !== defaultFunction;
};

export const useFormHook = (formName, init = {}) => {
  let hookForm: any = useForm({ ...init });
  if (formHooks.has(formName)) {
    hookForm = null;
    return formHooks.get(formName)();
  }
  hookForm.updateValues = updateValues(hookForm.setValue);
  hookForm.djangoErrors = djangoErrors(hookForm.setError);
  hookForm.register({ name: 'formError' });

  formHooks.set(
    formName,
    singletonHook({ ...hookForm }, () => {
      set(formRefs, formName, hookForm);
      return formRefs[formName];
    })
  );
  return formHooks.get(formName)();
};

export const formRef = formName => {
  return formRefs.get(formName);
};

export const formValue = (formName, path) => {
  const form = get(formRefs, formName);
  if (form) {
    if (path) return get(form.getValues(), path);
    return form.getValues();
  }
};
