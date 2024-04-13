import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { List as ListIcon } from "phosphor-react";
import useLocalStorage from "../../../hooks/useLocalStore";
import { Link } from "react-router-dom";
import { Chat } from "../../ChatList/types";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [chats] = useLocalStorage<Chat[]>("ChatItems", []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <AppBar position="fixed">
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
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: { width: "80%" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#676667",
            }}
            ml={2}
            pt={2}
          >
            All Chats
          </Typography>
          <Divider component="li" />
        </Box>

        <List>
          {chats.map((el, idx) => {
            return (
              <Link
                to={"/chat?id=" + encodeURIComponent(el.id)}
                style={{ textDecoration: "none" }}
                onClick={toggleDrawer}
              >
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
