import { useState, useEffect } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialKeys = Object.keys(initial).join('');

  useEffect(() => {
    // this function runs when the things we are watching change
    setInputs(initial);
  }, [initialKeys]);

  function transformValue({ value, type, files }) {
    switch (type) {
      case 'number':
        return parseInt(value);

      case 'file':
        return files[0];

      default:
        return value;
    }
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.keys(inputs).reduce(
      (state, key) => ({ ...state, [key]: '' }),
      {}
    );
    setInputs(blankState);
  }

  function handleChange(e) {
    const { name } = e.target;
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: transformValue(e.target),
    });
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
