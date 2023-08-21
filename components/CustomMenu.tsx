import React from "react";
import Image from "next/image";
import { Menu } from "@headlessui/react";

interface CustomMenuType {
  title: string;
  state: string;
  filters: string[];
  setState: (value: string) => void;
}

const CustomMenu: React.FC<CustomMenuType> = ({
  title,
  filters,
  state,
  setState,
}) => {
  return (
    <div className="flexStart flex-col w-full gap-7 relative">
      <label htmlFor={title} className="w-full text-gray-100">
        {title}
      </label>

      <Menu as="div" className="self-start relative">
        <div>
          <Menu.Button className="flexCenter custom_menu-btn">
            {state || "select a category"}
            <Image
              src="/arrow-down.svg"
              width={10}
              height={5}
              alt="arrow down"
            />
          </Menu.Button>
        </div>

        <Menu.Items className="flexStart custom_menu-items">
          {filters.map((item) => (
            <Menu.Item key={item}>
              <button
                type="button"
                value={item}
                className="custom_menu-item"
                onClick={(e) => setState(e.currentTarget.value)}
              >
                {item}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CustomMenu;
