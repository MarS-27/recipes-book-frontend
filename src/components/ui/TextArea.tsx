import clsx from 'clsx';
import { type FC } from 'react';
import { type FieldError, UseFormRegisterReturn } from 'react-hook-form';

type TTextAreaProps = {
  error?: FieldError;
  register: UseFormRegisterReturn<string>;
  placeholder?: string;
  disabled?: boolean;
  rows: number;
};

export const TextArea: FC<TTextAreaProps> = ({
  register,
  error,
  placeholder,
  disabled,
  rows,
}) => {
  return (
    <label className="relative w-full">
      <textarea
        className={clsx(
          'w-full rounded-md border border-grayStroke-100 border-opacity-20 px-3.5 py-1.5 text-s14 font-medium outline-grayStroke-70',
          error ? 'border-mainRed outline-mainRed' : null,
        )}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        {...register}
      />
      {error ? (
        <span className="absolute -top-3 left-1 text-xs10 text-mainRed">
          * {error.message}
        </span>
      ) : null}
    </label>
  );
};
