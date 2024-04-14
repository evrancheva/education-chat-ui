import React from "react";
import { Stack, Switch, Typography } from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStore";

const FeatureToggles: React.FC = () => {
  const [checked, setChecked] = useLocalStorage<boolean>("IsAdmin", true);

  // Toggle switch state
  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Stack sx={{ width: "100%", height: "100vh", m: 2 }}>
      <Typography variant="h5">Feature toggles</Typography>
      <Typography>
        Allow Admin Functions:
        <Switch checked={checked} onChange={toggleChecked} />
      </Typography>
    </Stack>
  );
};

export { FeatureToggles };
