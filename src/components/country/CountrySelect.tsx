import countries from "i18n-iso-countries";
import Select, { components, OptionProps } from "react-select";
import { CountrySelectOption } from "./CountrySelectOption";
import "./CountrySelect.css"; // Import the CSS file

// Register countries
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export interface Country {
  code: string;
  name: string;
}

interface CountrySelectProps {
  value?: Country;
  onChange?: (value: Country) => void;
}

// Constants
export const DEFAULT_COUNTRY: Country = {
  code: "US",
  name: "United States of America",
};

// Component
export const CountrySelect = ({
  value = DEFAULT_COUNTRY,
  onChange,
}: CountrySelectProps) => {
  // Prepare Data
  const data = Object.entries(
    countries.getNames("en", { select: "official" })
  ).map(([code, name]) => {
    return {
      value: { code, name },
      label: (
        <div className="country-option">
          <img
            className="flag-icon"
            src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${code}.svg`}
            alt={name}
          />
          {name}
        </div>
      ),
    };
  });
  // Render
  const defaultValue = {
    value: value,
    label: (
      <div className="country-option">
        <img
          className="flag-icon"
          src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${value.code}.svg`}
          alt={value.name}
        />
        {value.name}
      </div>
    ),
  };

  return (
    <div>
      <label>
        Country
        <Select
          options={data}
          components={{ Option: CountrySelectOption }}
          defaultValue={defaultValue}
          onChange={(newValue) => {
            onChange && onChange(newValue.value);
          }}
          isSearchable
        />
      </label>
    </div>
  );
};

export default CountrySelect;
