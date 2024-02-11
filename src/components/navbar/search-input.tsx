"use client";

import { Fragment } from "react";

import { IconSearch } from "@tabler/icons-react";

export const SearchInput = () => {
  return (
    <Fragment>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <IconSearch size={20} className="text-muted-foreground" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="bg-secondary text-muted-foreground h-10 rounded-full border-none pl-10 pr-4 text-sm focus-visible:outline-none"
        />
      </div>
    </Fragment>
  );
};
