import { Input, InputGroup } from "components/shared/Catalyst/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Button } from "components/shared/Catalyst/button";

const Home = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-96">
        <InputGroup>
          <MagnifyingGlassIcon />
          <Input
            name="search"
            placeholder="I am craving&hellip;"
            aria-label="Search"
          />
        </InputGroup>
      </div>
      <Button className="ml-4" outline>
        Search
      </Button>
    </div>
  );
};

export default Home;
