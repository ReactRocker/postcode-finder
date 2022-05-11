import * as React from "react";

import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Autocomplete,
  Divider,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilters,
  setFilter,
  toggleFilters,
  enableFilter,
} from "../../redux/dataSlice";
import { useForm } from "react-hook-form";
import DatePicker from "../DatePicker";

import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import StyledSwitch from "../../components/StyledSwitch";

export default function CheckboxList() {
  const dispatch = useDispatch();
  const {
    sold,
    fa_src,
    reduced,
    new_on_market,
    datePick,
    category,
    matminder,
    enable_filters,
  } = useSelector(selectFilters);
  // const [checked, setChecked] = React.useState([0]);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  return (
    <Box sx={{ padding: "5px 20px", minWidth: "350px", maxWidth: "350px" }}>
      <FormGroup
        sx={{
          "& .MuiFormControlLabel-root .MuiFormControlLabel-label": {
            width: "100%",
            div: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
          },
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={enable_filters}
              onChange={(e) => {
                dispatch(toggleFilters());
              }}
            />
          }
          label="Enable filters"
        />
        <Divider />
        <FormControlLabel
          control={
            <Checkbox
              disabled={!sold.enabled}
              checked={sold.value}
              onChange={(e) => {
                dispatch(
                  setFilter({
                    filter: "sold",
                    value: {
                      ...sold,
                      value: !sold.value,
                    },
                  })
                );
              }}
            />
          }
          label={
            <StyledSwitch
              disabled={!enable_filters}
              active={sold.enabled}
              label={"Sold"}
              onChange={(e) => {
                dispatch(
                  enableFilter({
                    filter: "sold",
                    value: !sold.enabled,
                  })
                );
              }}
            />
          }
        />
        <Divider />
        {/* <FormControlLabel
          control={
            <Checkbox
              disabled={!fa_src.enabled}
              checked={fa_src.value}
              onChange={(e) => {
                dispatch(
                  setFilter({
                    filter: "fa_src",
                    value: {
                      ...fa_src,
                      value: !fa_src.value,
                    },
                  })
                );
              }}
            />
          }
          label={
            <StyledSwitch
              disabled={!enable_filters}
              active={fa_src.enabled}
              label={"Fa_src"}
              onChange={(e) => {
                dispatch(
                  enableFilter({
                    filter: "fa_src",
                    value: !fa_src.enabled,
                  })
                );
              }}
            />
          }
        /> */}
        {/* <Divider /> */}
        <FormControlLabel
          control={
            <Checkbox
              disabled={!reduced.enabled}
              checked={reduced.value}
              onChange={(e) => {
                dispatch(
                  setFilter({
                    filter: "reduced",
                    value: {
                      ...reduced,
                      value: !reduced.value,
                    },
                  })
                );
              }}
            />
          }
          label={
            <StyledSwitch
              disabled={!enable_filters}
              active={reduced.enabled}
              label={"Reduced"}
              onChange={(e) => {
                dispatch(
                  enableFilter({
                    filter: "reduced",
                    value: !reduced.enabled,
                  })
                );
              }}
            />
          }
        />
        <Divider />
        {/* <FormControlLabel
          control={
            <Checkbox
              disabled={!new_on_market.enabled}
              checked={new_on_market.value}
              onChange={(e) => {
                dispatch(
                  setFilter({
                    filter: "new_on_market",
                    value: {
                      ...new_on_market,
                      value: !new_on_market.value,
                    },
                  })
                );
              }}
            />
          }
          label={
            <StyledSwitch
              disabled={!enable_filters}
              active={new_on_market.enabled}
              label={"New on market"}
              onChange={(e) => {
                dispatch(
                  enableFilter({
                    filter: "new_on_market",
                    value: !new_on_market.enabled,
                  })
                );
              }}
            />
          }
        />
        <Divider /> */}
        <FormControlLabel
          control={
            <StyledSwitch
              style={{ margin: "12px 8px" }}
              disabled={!enable_filters}
              active={matminder.enabled}
              onChange={(e) => {
                dispatch(
                  enableFilter({
                    filter: "matminder",
                    value: !matminder.enabled,
                  })
                );
              }}
            />
          }
          label="Matminder"
        />
        {matminder.enabled ? (
          <FormControlLabel
            control={
              <Autocomplete
                sx={{
                  paddingLeft: "12px",
                  paddingBottom: "10px",
                  width: "100%",
                }}
                multiple
                defaultValue={matminder.active_keywords.map(
                  (option) => option.title
                )}
                onChange={(e, value, reason, details) => {
                  switch (reason) {
                    case "selectOption":
                      dispatch(
                        setFilter({
                          filter: "matminder",
                          value: {
                            ...matminder,
                            active_keywords: [
                              ...matminder.active_keywords,
                              { title: details.option },
                            ],
                          },
                        })
                      );
                      break;
                    case "removeOption":
                      dispatch(
                        setFilter({
                          filter: "matminder",
                          value: {
                            ...matminder,
                            active_keywords: matminder.active_keywords.filter(
                              (i) => i.title !== details.option
                            ),
                          },
                        })
                      );
                      break;
                    case "blur":
                      break;
                    case "clear":
                      dispatch(
                        setFilter({
                          filter: "matminder",
                          value: {
                            ...matminder,
                            active_keywords: [],
                          },
                        })
                      );
                      break;
                    default:
                      break;
                  }
                }}
                options={matminder.keywords.map((option) => option.title)}
                // getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="keywords" />
                )}
              />
            }
          />
        ) : null}
        <Divider />
        <FormControlLabel
          control={
            <StyledSwitch
              style={{ margin: "12px 8px" }}
              disabled={!enable_filters}
              active={category.enabled}
              onChange={(e) => {
                dispatch(
                  enableFilter({
                    filter: "category",
                    value: !category.enabled,
                  })
                );
              }}
            />
          }
          label="Category"
        />
        {category.enabled ? (
          <FormControlLabel
            control={
              <Autocomplete
                sx={{
                  paddingLeft: "12px",
                  paddingBottom: "10px",
                  width: "100%",
                }}
                multiple
                defaultValue={category.active_keywords.map(
                  (option) => option.title
                )}
                onChange={(e, value, reason, details) => {
                  switch (reason) {
                    case "selectOption":
                      dispatch(
                        setFilter({
                          filter: "category",
                          value: {
                            ...category,
                            active_keywords: [
                              ...category.active_keywords,
                              { title: details.option },
                            ],
                          },
                        })
                      );
                      break;
                    case "removeOption":
                      dispatch(
                        setFilter({
                          filter: "category",
                          value: {
                            ...category,
                            active_keywords: category.active_keywords.filter(
                              (i) => i.title !== details.option
                            ),
                          },
                        })
                      );
                      break;
                    case "blur":
                      break;
                    case "clear":
                      dispatch(
                        setFilter({
                          filter: "category",
                          value: {
                            ...category,
                            active_keywords: [],
                          },
                        })
                      );
                      break;
                    default:
                      break;
                  }
                }}
                options={category.keywords.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="keywords" />
                )}
              />
            }
          />
        ) : null}
        <Divider />
        <FormControlLabel
          control={
            <StyledSwitch
              style={{ margin: "12px 8px" }}
              disabled={!enable_filters}
              active={fa_src.enabled}
              onChange={(e) => {
                dispatch(
                  enableFilter({
                    filter: "fa_src",
                    value: !fa_src.enabled,
                  })
                );
              }}
            />
          }
          label="Fa-src"
        />
        {fa_src.enabled ? (
          <FormControlLabel
            control={
              <Autocomplete
                sx={{
                  paddingLeft: "12px",
                  paddingBottom: "10px",
                  width: "100%",
                }}
                multiple
                defaultValue={fa_src.active_keywords.map(
                  (option) => option.title
                )}
                onChange={(e, value, reason, details) => {
                  switch (reason) {
                    case "selectOption":
                      dispatch(
                        setFilter({
                          filter: "fa_src",
                          value: {
                            ...fa_src,
                            active_keywords: [
                              ...fa_src.active_keywords,
                              { title: details.option },
                            ],
                          },
                        })
                      );
                      break;
                    case "removeOption":
                      dispatch(
                        setFilter({
                          filter: "fa_src",
                          value: {
                            ...fa_src,
                            active_keywords: fa_src.active_keywords.filter(
                              (i) => i.title !== details.option
                            ),
                          },
                        })
                      );
                      break;
                    case "blur":
                      break;
                    case "clear":
                      dispatch(
                        setFilter({
                          filter: "fa_src",
                          value: {
                            ...fa_src,
                            active_keywords: [],
                          },
                        })
                      );
                      break;
                    default:
                      break;
                  }
                }}
                options={fa_src.keywords.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="keywords" />
                )}
              />
            }
          />
        ) : null}
        <Divider />
        <Divider />
        <FormControlLabel
          control={
            <StyledSwitch
              style={{ margin: "12px 8px" }}
              disabled={!enable_filters}
              active={datePick.enabled}
              onChange={(e) => {
                dispatch(
                  enableFilter({
                    filter: "datePick",
                    value: !datePick.enabled,
                  })
                );
              }}
            />
          }
          label="Pick date"
        />
        {datePick.enabled ? (
          <DatePicker
            disabled={!enable_filters}
            value={datePick.value}
            onChange={(value) => {
              dispatch(
                setFilter({
                  filter: "datePick",
                  value: {
                    ...datePick,
                    value: new Date(value),
                  },
                })
              );
            }}
          />
        ) : null}
        <Divider />
      </FormGroup>
    </Box>
  );
}

{
  /* <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
  <ListItem></ListItem>
  {[0, 1, 2, 3].map((value) => {
    const labelId = `checkbox-list-label-${value}`;

    return (
      <ListItem
        key={value}
        // secondaryAction={
        //   <IconButton edge="end" aria-label="comments">
        //     <CommentIcon />
        //   </IconButton>
        // }
        disablePadding
      >
        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
        </ListItemButton>
      </ListItem>
    );
  })}
</List>; */
}
