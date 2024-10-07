import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiendpoints } from '../../constants/index'; // Ensure correct import
import Axios, { authClientHeader, authClientHeaderImage, authCommonHeader, authCommonHeaderImage } from "../helper/axios";

export const clientReportModule = createAsyncThunk(
  "clientReportModule",
  async ({ startTime, endTime }) => {
    try {
      const response = await Axios.get(
        `${apiendpoints.getclientReportModule}?startTime=${startTime}&endTime=${endTime}`,
        authCommonHeader()
      );
       console.log(response)
      if (response.data) {
        console.log(response.data);
        return response.data; // Return the data for the fulfilled case
      } else {
        throw new Error(response.data.msg); // Throw error for rejected case
      }
    } catch (error) {
      console.log(error);
      throw error.response ? error.response.data : error.message; // Handle error properly
    }
  }
);

