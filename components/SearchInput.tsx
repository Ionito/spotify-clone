"use client";
import useDebounce from "@/hooks/useDebounce";
import Input from "./Input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface SearchInputProps {}

const SearchInput: React.FC<SearchInputProps> = ({}) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);
  const router = useRouter();

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };
    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleDelete: React.MouseEventHandler = () => {
    setValue("");
  };

  return (
    <div className="relative">
      <Input
        onChange={handleChange}
        value={value}
        placeholder="What do you want to listen to?"
      />
      {value.length !== 0 && (
        <button
          onClick={handleDelete}
          className="absolute right-5 top-[12px] transition hover:text-neutral-400"
        >
          <AiOutlineCloseCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
