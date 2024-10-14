import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FolderIcon from "@mui/icons-material/Folder";

const drawerWidth = 240;

function Sidebar(props) {
  const { window, children } = props;

  // State to manage mobile drawer open/close behavior
  const [mobileOpen, setMobileOpen] = useState(false);

  // State to manage drawer closing animation
  const [isClosing, setIsClosing] = useState(false);

  // State for managing profile menu open/close
  const [isOpen, setIsOpen] = useState(null);

  // Closes the drawer with a transition
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  // Called when drawer close transition ends, to reset closing state
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  // Toggles drawer open/close on mobile
  const handleDrawerToggle = () => {
    // Prevent opening if the drawer is still in the process of closing
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Opens the profile menu (avatar click)
  const handleMenuOpen = (event) => {
    setIsOpen(event.currentTarget);
  };

  // Closes the profile menu
  const handleMenuClose = () => {
    setIsOpen(null);
  };

  // List of sidebar items
  const drawerList = [
    { text: "Departments", icon: <LocalHospitalIcon />, path: "/" },
    { text: "Rooms", icon: <MeetingRoomIcon />, path: "/rooms" },
    { text: "Doctors", icon: <PeopleIcon />, path: "/doctors" },
    {
      text: "Patient Admission & Discharge",
      icon: <AssignmentIcon />,
      path: "/patients",
    },
    {
      text: "Surgical Operation Scheduling",
      icon: <CalendarTodayIcon />,
      path: "/scheduling",
    },
    { text: "Services", icon: <MedicalServicesIcon />, path: "/services" },
    { text: "Patients Records", icon: <FolderIcon />, path: "/records" },
  ];

  // Drawer layout
  const drawer = (
    <div>
      <Toolbar />
      <List>
        {drawerList.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <NavLink
              to={path}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                backgroundColor: isActive ? "lightgray" : "transparent", 
              })}
            >
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar: Top navigation bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            HOSPITAL MANAGEMENT SYSTEM
          </Typography> */}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleMenuOpen} color="inherit" sx={{ p: 0 }}>
            <Avatar alt="Profile Image" src="" />
          </IconButton>
          {/* Menu for avatar (logout functionality) */}
          <Menu
            open={Boolean(isOpen)}
            onClose={handleMenuClose}
            anchorEl={isOpen}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Permanent drawer for larger screens */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
