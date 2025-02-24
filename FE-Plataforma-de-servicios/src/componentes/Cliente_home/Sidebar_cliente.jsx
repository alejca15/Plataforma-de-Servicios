import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Search_cliente from "./search_cliente";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Sidebar_cliente() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh", // Ajuste para que ocupe toda la altura de la ventana
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          height: "100%", // Asegura que los tabs se ajusten a toda la altura
          display: "flex",
          flexDirection: "column", // Los tabs estarán apilados verticalmente
          justifyContent: "flex-start", // Alineación al principio
        }}
      >
        {[
          "Servicios",
          "Item Two",
          "Item Three",
          "Item Four",
          "Item Five",
          "Item Six",
          "Item Seven",
        ].map((label, index) => (
          <Tab
            key={index}
            label={label}
            {...a11yProps(index)}
            sx={{
              color: "black", 
              "&.Mui-selected": {
                color: "black", 
                marginBottom: "10px",
                fontWeight: "bold",
              },
              "&:hover": {
                color: "gray",
                backgroundColor: "action.hover", 
              },

            }}
          />
        ))}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Search_cliente />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
