import React, { ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { BiSearch } from "react-icons/bi";

const Search = ({ placeholder, value, defaultValue, onChange, className }) => {
  return (
    <div className={`relative`}>
      <div>
        <BiSearch
          size={18}
          className="absolute left-2 top-3.5 text-color-dark"
        />
        <Input
          type="text"
          className={`pl-8 w-full max-w-[300px] text-color-dark ${className}`}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Search;
