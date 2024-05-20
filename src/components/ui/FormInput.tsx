import clsx from 'clsx';
import {
  type FC,
  type KeyboardEvent,
  type HTMLInputTypeAttribute,
} from 'react';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';

type TFormInputProps = {
  register: UseFormRegisterReturn<string>;
  type: HTMLInputTypeAttribute;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
  onEnterKeyDown?: () => void;
};

export const FormInput: FC<TFormInputProps> = ({
  error,
  register,
  type,
  placeholder,
  disabled = false,
  onEnterKeyDown,
}) => {
  const handleEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (onEnterKeyDown) onEnterKeyDown();
    }
  };

  return (
    <fieldset
      className={clsx(
        type === 'checkbox' ? 'flex items-center gap-2 p-1' : 'relative w-full',
      )}
    >
      <input
        className={clsx(
          type === 'checkbox'
            ? 'cursor-pointer'
            : 'w-full rounded-md border border-grayStroke-100 border-opacity-20 px-3.5 py-1.5 text-s14 font-medium outline-grayStroke-70',
          error ? 'border-mainRed outline-mainRed' : null,
        )}
        type={type}
        id={placeholder}
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={handleEnterDown}
        {...register}
      />
      {error ? (
        <span className="absolute -top-3 left-1 text-xs10 text-mainRed">
          * {error.message}
        </span>
      ) : null}
      {type === 'checkbox' ? (
        <label className="cursor-pointer" htmlFor={placeholder}>
          {placeholder}
        </label>
      ) : null}
    </fieldset>
  );
};
