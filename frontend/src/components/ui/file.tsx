import React, { ChangeEvent, useRef } from 'react';

interface Props {
  buttonText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  name: string;
  className?: string;
}

const FileInput: React.FC<Props> = ({
  buttonText,
  onChange,
  multiple,
  name,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };
  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
        multiple={multiple}
        name={name}
      />
      <div>
        <button
          type="button"
          className={
            'bg-green-600 py-2 px-3 rounded-2xl text-white cursor-pointer font-medium ' +
            className
          }
          onClick={handleClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default FileInput;
