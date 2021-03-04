import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
const { RangePicker } = DatePicker;

const bestMatches = [
  {
      symbol: "BA",
      name: "Boeing Company",
      type: "Equity",
      region: "United States",
      marketOpen: "09:30",
      marketClose: "16:00",
      timezone: "UTC-05",
      currency: "USD",
      matchScore: "1.0000"
  },
  {
      symbol: "BAA",
      name: "Banro Corporation USA",
      type: "Equity",
      region: "United States",
      marketOpen: "09:30",
      marketClose: "16:00",
      timezone: "UTC-05",
      currency: "USD",
      matchScore: "0.8000"
  },
  {
      symbol: "BAB",
      name: "Invesco Taxable Municipal Bond ETF",
      type: "ETF",
      region: "United States",
      marketOpen: "09:30",
      marketClose: "16:00",
      timezone: "UTC-05",
      currency: "USD",
      matchScore: "0.8000"
  },
  {
      symbol: "BA.LON",
      name: "BAE Systems plc",
      type: "Equity",
      region: "United Kingdom",
      marketOpen: "08:00",
      marketClose: "16:30",
      timezone: "UTC+00",
      currency: "GBP",
      matchScore: "0.6667"
  },
  {
      symbol: "BABA",
      name: "Alibaba Group Holding Ltd",
      type: "Equity",
      region: "United States",
      marketOpen: "09:30",
      marketClose: "16:00",
      timezone: "UTC-05",
      currency: "USD",
      matchScore: "0.6667"
  },
]

const StocksPage = () => {
  const [rowData, setRowData] = useState([
    { timestamp: "2021-03-03 20:00:00", total_volumn: 3611, min_price: 121.9400, max_price: 122.0000, opening_price: 121.9400, closing_price: 122.0000 },
    { timestamp: "2021-03-03 19:50:00", total_volumn: 855, min_price: 121.9400, max_price: 122.0000, opening_price: 121.9400, closing_price: 122.0000 },
    { timestamp: "2021-03-03 19:40:00", total_volumn: 216, min_price: 121.9400, max_price: 122.0000, opening_price: 121.9400, closing_price: 122.0000 },
    { timestamp: "2021-03-03 19:25:00", total_volumn: 386, min_price: 121.9400, max_price: 122.0000, opening_price: 121.9400, closing_price: 122.0000 },
    { timestamp: "2021-03-03 19:05:00", total_volumn: 312, min_price: 121.9400, max_price: 122.0000, opening_price: 121.9400, closing_price: 122.0000 },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: 1200 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        style={{ width: 300 }}
        disableClearable
        options={bestMatches}
        getOptionLabel={(option) => option.symbol}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
        renderOption={(option, { inputValue }) => {
          // const matches = match(option.title, inputValue);
          // const parts = parse(option.title, matches);

          return (
            <div>
              {/* {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))} */}
              {option.symbol} {option.name}
            </div>
          );
        }}
      />
      <RangePicker />
      <AgGridReact
          rowData={rowData}>
          <AgGridColumn headerName="Timestamp" field="timestamp"></AgGridColumn>
          <AgGridColumn headerName="Total Volume" field="total_volumn"></AgGridColumn>
          <AgGridColumn headerName="Min. Price" field="min_price"></AgGridColumn>
          <AgGridColumn headerName="Max. Price" field="max_price"></AgGridColumn>
          <AgGridColumn headerName="Opening Price" field="opening_price"></AgGridColumn>
          <AgGridColumn headerName="Closing Price" field="closing_price"></AgGridColumn>
      </AgGridReact>
    </div>
  );
}

export default StocksPage;
