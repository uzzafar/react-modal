import { OptionProps, components } from "react-select";

export const CountrySelectOption = (props: OptionProps<any>) => {
  return (
    <div>
      <components.Option {...props} />
    </div>
  );
};
