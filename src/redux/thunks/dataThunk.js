import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/httpService";

export const fetchByMultipleCodes = createAsyncThunk(
  "data/fetchByMultipleCodes",
  async ({ search, offset }) => {
    const res = await search.reduce(async (acc, postcode) => {
      let accObj = await acc;
      const { meta, data } = await API.get(
        `pse/api/properties?postcode=${postcode}&limit=1000`
        //
        // &offset=${offset ? offset : 0}
      )
        .then((res) => res.data)
        .catch((e) => {
          console.log(e);
        });

      return {
        data: [...accObj?.data, ...data],
        meta: {
          total_count:
            accObj.meta.total_count >= meta.total_count
              ? accObj.meta.total_count
              : meta.total_count,
        },
      };
    }, Promise.resolve({ data: [], meta: { total_count: 0 } }));
    res.data.map((i) => {
      i.url = i.extra.url;
    });
    return {
      params: {
        postcode: search,
        offset,
      },
      ...res,
    };
  }
);

export const loadAll = createAsyncThunk("data/loadAll", async () => {
  const res = await API.get(`pse/api/properties?limit=20000000`)
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
    });
  return {
    ...res,
  };
});
