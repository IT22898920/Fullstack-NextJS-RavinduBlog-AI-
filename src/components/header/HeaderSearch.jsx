"use client";
import React, { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { Input } from "components/ui/input";

const HeaderSearch = () => {
    const [search, setSearch] = useState("");
    const handleSearch = async (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSearch}>
            <div className="flex w-full max-w-sm items-center">
                <span className="relative">
                    <IoMdSearch
                        size={25}
                        color="#C1C0C8"
                        className="absolute left-2 bottom-2"
                    />
                    <Input
                        className="w-[280px] pl-8"
                        type="text"
                        placeholder="Search blog"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </span>
            </div>
        </form>
    );
}

export default HeaderSearch;
