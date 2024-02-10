"use client";

import { IconSearch } from "@tabler/icons-react";
import { Fragment } from "react";

export const SearchInput = () => {
  return (
    <Fragment>
      <div className="relative">
        <span className="absolute pointer-events-none left-3 top-1/2 -translate-y-1/2">
          <IconSearch size={20} className="text-muted-foreground" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="focus-visible:outline-none text-sm text-muted-foreground pl-10 pr-4 h-10 bg-secondary rounded-full border-none"
        />
      </div>
    </Fragment>
  );
};
