import React from "react";

interface FormFieldType {
  title: string;
  state: string;
  placeholder: string;
  setState: (value: string) => void;
  type?: string;
  isTextarea?: boolean;
}

const FormField: React.FC<FormFieldType> = ({
  type,
  title,
  state,
  setState,
  placeholder,
  isTextarea,
}) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label htmlFor="" className="w-full text-gray-100">
        {title}
      </label>

      {isTextarea ? (
        <textarea
          value={state}
          placeholder={placeholder}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
          required
        ></textarea>
      ) : (
        <input
          type={type || "text"}
          value={state}
          placeholder={placeholder}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
          required
        />
      )}
    </div>
  );
};

export default FormField;
