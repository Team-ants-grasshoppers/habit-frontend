import React from 'react';

interface Field {
  label: string;
  name: string;
  type: 'text' | 'password' | 'email';
  value: string;
  required?: boolean;
  matchWith?: string;
  onChange: (value: string) => void;
}

interface UserFormProps {
  mode: 'login' | 'join' | 'edit';
  fields: Field[];
  onSubmit: (isValid: boolean) => void;
  serverError?: string;
}

const UserForm: React.FC<UserFormProps> = ({ fields, onSubmit, serverError, mode }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={field.value}
            autoComplete={field.name === 'password' ? 'current-password' : 'username'}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
          {mode === 'login' && serverError && field.name === 'password' && (
            <p style={{ color: 'red' }}>{serverError}</p>
          )}
          {mode === 'join' && serverError && field.name === 'pwConfirm' && (
            <p style={{ color: 'red' }}>{serverError}</p>
          )}
        </div>
      ))}
    </form>
  );
};

export default UserForm;
