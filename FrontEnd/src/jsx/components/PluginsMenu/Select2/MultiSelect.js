import React from "react";

import Select from "react-select";
import { colourOptions } from "./data";

const CustomClearText = () => "Supprimer tous";
const ClearIndicator = (props) => {
  const {
    children = <CustomClearText />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles("clearIndicator", props)}
    >
      <div style={{ padding: "0px 5px" }}>{children}</div>
    </div>
  );
};

const ClearIndicatorStyles = (base, state) => ({
  ...base,
  cursor: "pointer",
  color: state.isFocused ? "blue" : "black",
});

export default function CustomClearIndicator({ onChange }) {
  const handleCollaboratorsChange = (selectedOptions, event) => {
    
    const collaborators = selectedOptions.map((option) => option.value);
    console.log(collaborators);
    onChange("collaborators", event); // Pass fieldName and fieldValue to onChange
  };

  return (
    <Select
      closeMenuOnSelect={false}
      components={{ ClearIndicator }}
      styles={{ clearIndicator: ClearIndicatorStyles }}
      defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      onChange={onchange}
      options={colourOptions}
    />
  );
}
