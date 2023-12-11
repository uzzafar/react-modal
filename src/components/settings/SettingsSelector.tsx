import React, { useRef, useState, useMemo } from "react";
import Modal from "react-modal";
import CountrySelect, { DEFAULT_COUNTRY, Country } from "../country/CountrySelect";
import LanguageSelect, { DEFAULT_LANGUAGE } from "../language/LanguageSelect";
import CurrencySelect, { DEFAULT_CURRENCY } from "../currency/CurrencySelect";
import "./SettingsSelector.css";

  // Render Counter
  

const Button = React.memo(
  ({
    selectedCountry,
    selectedCurrency,
    selectedLanguage,
    onClick,
  }: {
    selectedCountry: Country;
    selectedCurrency: string;
    selectedLanguage: string;
    onClick: () => void;
  }) => {
    const counter = useRef(0);
    counter.current++;
    console.log("Render count of button: " + counter.current);
    return (
      <button className="settings-btn" onClick={onClick}>
        {selectedCountry.name} - ({selectedCurrency} - {selectedLanguage})
      </button>
    );
  },
  // Custom comparison function for props
  (prevProps, nextProps) =>
    prevProps.selectedCountry === nextProps.selectedCountry &&
    prevProps.selectedCurrency === nextProps.selectedCurrency &&
    prevProps.selectedLanguage === nextProps.selectedLanguage
);

// Component
const SettingsSelector = (): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedSettings, setSelectedSettings] = useState<{
    country: Country;
    currency: string;
    language: string;
  }>({
    country: DEFAULT_COUNTRY,
    currency: DEFAULT_CURRENCY,
    language: DEFAULT_LANGUAGE,
  });

  // Temporary state for changes in the modal
  const [tempSettings, setTempSettings] = useState(selectedSettings);

  // Actions
  const handleOpen = () => {
    setTempSettings(selectedSettings);
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleSave = () => {
    setSelectedSettings(tempSettings);
    setModalIsOpen(false);
  };

  const handleCancel = () => {
    setModalIsOpen(false);
  };

  // Memoized Button
  const memoizedButton = useMemo(
    () => (
      <Button
        selectedCountry={selectedSettings.country}
        selectedCurrency={selectedSettings.currency}
        selectedLanguage={selectedSettings.language}
        onClick={handleOpen}
      />
    ),
    [selectedSettings, handleOpen]
  );

  // Render
  return (
    <div>
      {memoizedButton}

      {/* Modal */}
      <Modal isOpen={modalIsOpen} className="Modal">
        {/* Header */}
        <h2>Select your region, currency, and language.</h2>

        {/* Country */}
        <div className="input-container">
          <CountrySelect
            value={tempSettings.country}
            onChange={(value) =>
              setTempSettings((prev) => ({ ...prev, country: value }))
            }
          />
        </div>

        {/* Currency */}
        <div className="input-container">
          <CurrencySelect
            value={tempSettings.currency}
            onChange={(value) =>
              setTempSettings((prev) => ({ ...prev, currency: value }))
            }
          />
        </div>

        {/* Language */}
        <div className="input-container">
          <LanguageSelect
            language={tempSettings.language}
            onChange={(value) =>
              setTempSettings((prev) => ({ ...prev, language: value }))
            }
          />
        </div>

        {/* Save and Cancel buttons */}
        <div className="button-container">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsSelector;
