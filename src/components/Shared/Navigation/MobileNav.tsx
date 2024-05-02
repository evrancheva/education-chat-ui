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
import { PlusCircle } from "phosphor-react";

interface Props {
  setDialogOpen: (isOpen: boolean) => void;
  chats: Chat[];
}

const MobileNav: React.FC<Props> = ({ setDialogOpen, chats }) => {
  const [isAdmin] = useLocalStorage<boolean>("IsAdmin", true);
  const [open, setOpen] = useState(false);

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
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#676667",
              display: "flex",
              alignItems: "center",
            }}
            ml={2}
            pt={2}
          >
            All Chats
            {isAdmin && (
              <IconButton
                sx={{ color: "#1976d2" }}
                onClick={() => setDialogOpen(true)}
              >
                <PlusCircle />
              </IconButton>
            )}
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
};

export default MobileNav;
