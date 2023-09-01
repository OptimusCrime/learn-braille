import React from 'react';

interface TextFieldProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  answer: () => void;
}

export const TextField = ({ inputRef, answer }: TextFieldProps) => (
  <div>
    <div className="">
      <input
        type="text"
        ref={inputRef}
        placeholder="Type here"
        className="input w-full input-bordered max-w-xl"
        onKeyDown={(e) => {
          if (['enter', ' '].includes(e.key.toLowerCase())) {
            answer();
          }
        }}
      />
    </div>
  </div>
);
