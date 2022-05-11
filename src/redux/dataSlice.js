import { PanoramaSharp } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import createTableHeader from "../utils/createTableHeader";
import { fetchData, fetchByMultipleCodes, loadAll } from "./thunks/dataThunk";

const initialState = {
  params: {},
  tabledData: {
    header: [],
    data: [],
  },
  status: "idle",
  dataRdy: false,
  meta: {},
  filters: {
    enable_filters: false,
    sold: { enabled: false, value: false },
    fa_src: {
      enabled: false,
      active: false,
      keywords: [
        { title: "s" },
        { title: "p" },
        { title: "w" },
        { title: "or" },
        { title: "e" },
      ],
      active_keywords: [],
    },
    reduced: { enabled: false, value: false },
    datePick: { enabled: false, value: null },
    category: {
      enabled: false,
      active: false,
      keywords: [
        { title: "property-for-sale" },
        { title: "commercial-property-to-rent" },
        { title: "property-to-rent" },
        { title: "commercial-property-for-sale" },
      ],
      active_keywords: [],
    },
    matminder: {
      enabled: false,
      active: false,
      keywords: [
        { title: "Full_Planning" },
        { title: "Plot" },
        { title: "Investment" },
        { title: "Empty" },
        { title: "Refurb" },
        { title: "BTL" },
        { title: "HMO" },
        { title: "Retirement" },
        { title: "New_Home" },
        { title: "Tenanted" },
        { title: "Shared_Ownership" },
        { title: "Park_Home" },
        { title: "Listed" },
        { title: "Auction" },
        { title: "Knotweed" },
        { title: "Online_Viewing" },
      ],
      active_keywords: [],
    },
  },
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    enableFilter(state, { payload }) {
      state.filters[payload.filter].enabled = payload.value;
    },
    setFilter(state, { payload }) {
      state.filters[payload.filter] = payload.value;
    },

    toggleFilters(state) {
      state.filters.enable_filters = !state.filters.enable_filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchByMultipleCodes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchByMultipleCodes.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.tabledData = {
          headerData: createTableHeader(payload.data),
          data: [...payload.data],
        };
        state.meta = payload.meta;
        state.dataRdy = true;
        state.params = payload.params;
      })
      .addCase(fetchByMultipleCodes.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(loadAll.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loadAll.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.tabledData = {
          headerData: createTableHeader(payload.data),
          data: [...payload.data],
        };
        state.meta = payload.meta;
        state.dataRdy = true;
      })
      .addCase(loadAll.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const selectFitersStatus = ({ data: { filters } }) =>
  filters.enable_filters;
export const selectData = ({ data: { tabledData } }) => tabledData;
export const selectParams = ({ data }) => data.params;
export const selectMeta = ({ data }) => data.meta;
export const selectAll = ({ data }) => data;
export const selectFilters = ({ data }) => data.filters;
export const selectLoadingStatus = ({ data }) => data.status === "loading";

export const selectFilteredData = ({
  data: {
    tabledData: { data, headerData },
    dataRdy,
    filters,
  },
}) => {
  const {
    sold,
    fa_src,
    reduced,
    new_on_market,
    category,
    matminder,
    enable_filters,
    datePick,
  } = filters;
  return {
    dataRdy,
    headerData,

    data: !enable_filters
      ? data
      : data.filter((i) => {
          // console.log(
          //   "date:",
          //   new Date(i.created),
          //   new Date(datePick.value),
          //   new Date(i.created) >= new Date(datePick.value),
          //   datePick.enabled
          //     ? new Date(i.created) >= new Date(datePick.value)
          //     : true
          // );
          return (
            (sold.enabled ? i.sold === sold.value : true) &&
            (datePick.enabled
              ? new Date(i.created) >= new Date(datePick.value)
              : true) &&
            (reduced.enabled
              ? reduced.value
                ? i.reduced >= 40
                : i.reduced <= 40
              : true) &&
            (fa_src.enabled && fa_src.active_keywords.length > 0
              ? fa_src.active_keywords.map((i) => i.title).includes(i.fa_src)
              : true) &&
            (matminder.enabled && matminder.active_keywords.length > 0
              ? matminder.active_keywords
                  .map((i) => i.title)
                  .filter((value) => i.keywords.includes(value)).length > 0
              : true) &&
            (category.enabled && category.active_keywords.length > 0
              ? category.active_keywords
                  .map((i) => i.title)
                  .includes(i.category)
              : true)
          );
        }),
  };
};

export const { setFilter, toggleFilters, enableFilter } = dataSlice.actions;

export default dataSlice.reducer;
