import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { List as ListIcon } from "phosphor-react";
import useLocalStorage from "../../../hooks/useLocalStore";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Images/logo.ico";
import { useTheme } from "@mui/material/styles";
import { Chat } from "../../ChatList/types";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [chats] = useLocalStorage<Chat[]>("ChatItems", []);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <AppBar sx={{ position: "absolute" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <ListIcon size={32} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Link to="/chat" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              height: 48,
              width: 48,
              borderRadius: 1.5,
              backgroundColor: theme.palette.primary.main,
            }}
            p={1}
          >
            <img src={Logo} alt="Tawk" height={48} width={48} />
          </Box>
        </Link>
        <List>
          {chats.map((el, idx) => {
            return (
              <Link to="/chat?id={el.id}" style={{ textDecoration: "none" }}>
                <ListItem>
                  <ListItemText primary={el.name} key={idx} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
