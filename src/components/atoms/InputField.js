import React from 'react';

const InputField = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    className="form-control"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default InputField;