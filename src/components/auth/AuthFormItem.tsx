import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent } from "react";

interface LoginFormItemProps {
  id: string;
  placeholder?: string;
  icon: IconProp;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<unknown>) => void;
  required?: boolean;
  error?: string;
}

function LoginFormItem({
  id,
  placeholder,
  icon,
  type,
  onChange,
  value,
  required,
  error,
}: LoginFormItemProps) {
  return (
    <div className="my-3">
      <div className="bg-gray-200 rounded-lg border border-gray-300 duration-300 focus-within:border-primary-100 invalid:border-red">
        <div className="flex gap-2 items-center">
          <label className="pl-3 text-primary-150" htmlFor={id}>
            <FontAwesomeIcon icon={icon} />
          </label>
          <input
            id={id}
            name={id}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            value={value}
            required={required}
            className="bg-[transparent] outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
          />
        </div>
      </div>
      {error && (
        <div className="text-red text-sm ml-2">
          <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} />
          {error}
        </div>
      )}
    </div>
  );
}

export default LoginFormItem;
