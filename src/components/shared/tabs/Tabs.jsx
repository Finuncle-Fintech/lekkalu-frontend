import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function GenericTabs({ tabs, handleChange, value }) {
  return (
    <Tabs value={value} onChange={handleChange} aria-label="generic-tabs">
      {tabs &&
        tabs?.length &&
        tabs.map((each) => {
          return <Tab key={each.label} icon={each?.icon} label={each?.label} />;
        })}
    </Tabs>
  );
}
