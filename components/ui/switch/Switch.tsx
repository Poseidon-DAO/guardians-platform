"use client";

import * as RadixSwitch from "@radix-ui/react-switch";

interface IProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export default function Switch({ checked, onChange, label = "" }: IProps) {
  return (
    <form>
      <div className="flex items-center">
        <label className="text-[15px] leading-none pr-4" htmlFor="dark-mode">
          {label}
        </label>

        <RadixSwitch.Root
          checked={checked}
          onCheckedChange={onChange}
          className="w-[42px] h-[25px] bg-background rounded-full relative data-[state=checked]:bg-blue outline-none cursor-pointer"
          id="dark-mode"
        >
          <RadixSwitch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </RadixSwitch.Root>
      </div>
    </form>
  );
}
