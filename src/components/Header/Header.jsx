import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  InputBase,
  TextField,
  Popover,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useForm } from "react-hook-form";
import {
  fetchByMultipleCodes,
  loadAll,
} from "../../redux/thunks/dataThunk";
import { selectFitersStatus, selectLoadingStatus } from "../../redux/dataSlice";
import { selectAuthorized, signOut } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../Filters";
import StyledSearch from "../StyledSearch";
import AuthComp from "../AuthComp";
import DownloadIcon from "@mui/icons-material/Download";
import { removeToken } from "../../utils/tokenApi";

const Search = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const enable_filters = useSelector(selectFitersStatus);
  const loading = useSelector(selectLoadingStatus);
  const authorized = useSelector(selectAuthorized);

  const handleOpenFilters = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilters = () => {
    setAnchorEl(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ search }) => {
    dispatch(
      fetchByMultipleCodes({
        search: [
          ...new Set(
            search
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean)
          ),
        ],
      })
    );
  };
  return (
    <Box
      sx={{
        ml: 5,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="standard"
          placeholder="Search"
          error={errors?.search}
          {...register("search", {
            validate: {
              isAuthorized: () => authorized || "Sign in first!",
              valid_postcode: (value) => {
                const regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
                const values = value
                  .split(",")
                  .filter((i) => Boolean(i.trim()));
                const tested = values.map((i) => regex.test(i.trim()));
                return !tested.includes(false) || "Wrong postcode format";
              },
            },
            required: "Field is required",
          })}
          helperText={errors?.search?.message || false}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {loading ? (
                  <CircularProgress
                    sx={{
                      width: "20px !important",
                      height: "20px !important",
                      color: "#fefefe !important",
                      ".MuiCircularProgress-root": {},
                    }}
                  />
                ) : (
                  <SearchOutlinedIcon sx={{ color: "white" }} />
                )}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  sx={{ color: !enable_filters ? "white" : "#004ba0" }}
                  onClick={handleOpenFilters}
                >
                  <FilterAltIcon sx={{ fontSize: "19px" }} />
                </IconButton>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleCloseFilters}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Filters />
                </Popover>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
};

const Header = () => {
  const [drawer, toggleDrawler] = React.useState(false);
  const [authPopoverAnchor, setAuthPopover] = React.useState(null);
  const authOpen = Boolean(authPopoverAnchor);
  const authorized = useSelector(selectAuthorized);

  const handleOpenAuth = (event) => {
    setAuthPopover(event.currentTarget);
  };

  const handleCloseAuth = () => {
    setAuthPopover(null);
  };
  const dispatch = useDispatch();
  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      drawer inner
    </Box>
  );
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
          // variant="dense"
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={(e) => {
                toggleDrawler(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              header
            </Typography>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                ml: 2.5,
                mr: 0,
              }}
            >
              <FilterAltIcon />
            </IconButton> */}
            <Search />
            {/* <IconButton
              sx={{ ml: 3 }}
              onClick={() => {
                dispatch(loadAll());
              }}
            >
              <DownloadIcon sx={{ fontSize: "30px", color: "#fefefe" }} />
            </IconButton> */}
            {/* <StyledSearch /> */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: " auto" }}
              onClick={handleOpenAuth}
            >
              <AccountCircleIcon />
            </IconButton>
            <Popover
              open={authOpen}
              // open={true}
              anchorEl={authPopoverAnchor}
              onClose={handleCloseAuth}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              {authorized ? (
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 1, maxWidth: "200px" }}>
                    Already signed in.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, maxWidth: "200px" }}>
                    After about 1 day, the token expires and you need to
                    re-authorize.
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      dispatch(signOut());
                      removeToken();
                    }}
                  >
                    Sign out
                  </Button>
                </Box>
              ) : (
                <AuthComp />
              )}
            </Popover>
          </Toolbar>
        </AppBar>
      </Box>
      <SwipeableDrawer
        anchor="left"
        open={drawer}
        onClose={() => toggleDrawler(false)}
      >
        {list}
      </SwipeableDrawer>
    </>
  );
};

export default Header;
