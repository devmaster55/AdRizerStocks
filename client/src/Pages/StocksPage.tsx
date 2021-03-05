import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
const { RangePicker } = DatePicker;

interface INewSymbolObject {
  symbol: string,
  name: string,
}

interface INewTimeSeriesElement {
  timestamp?: string,
  total_volumn?: string,
  min_price?: string,
  max_price?: string,
  opening_price?: string,
  closing_price?: string,
}

const StocksPage = () => {
  const [selectedValue, setSelectedValue] = useState<INewSymbolObject>({ symbol: '', name: '' });
  const [inputValue, setInputValue] = useState('');
  const [symbolsList, setSymbolsList] = useState<Array<INewSymbolObject>>([]);
  const [timeSeriesStock, setTimeSeriesStock] = useState<Array<INewTimeSeriesElement>>([]);

  useEffect(() => {
    let function_choice = 'TIME_SERIES_INTRADAY'
    let symbol = 'IBM'
    const headers = { 'Content-Type': 'application/json' };
    const query = `?function_choice=${function_choice}&symbol=${symbol}`
    fetch('http://127.0.0.1:3001/exchange/equity' + query, { headers })
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
      });
	}, [])

  // useEffect(() => {
  //   let keywords = 'IB'
  //   const headers = { 'Content-Type': 'application/json' };
  //   const query = `?keywords=${keywords}`
  //   fetch('http://127.0.0.1:3001/lookForSymbol' + query, { headers })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('data', data)
  //     });
	// }, [])

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setSymbolsList([]);
      setTimeSeriesStock([]);
      return undefined;
    }

    const headers = { 'Content-Type': 'application/json' };
    const query = `?keywords=${inputValue}`
    fetch('http://127.0.0.1:3001/lookForSymbol' + query, { headers })
      .then(response => response.json())
      .then(data => {
        if (data.errorMessage) {
          setSymbolsList([]);
        } else {
          setSymbolsList(data);
        }
      });

    return () => {
      active = false;
    };
  }, [inputValue]);

  useEffect(() => {
    let active = true;

    if (selectedValue === null || selectedValue.symbol === '') {
      setSymbolsList([]);
      setTimeSeriesStock([]);
      return undefined;
    }

    let function_choice = 'TIME_SERIES_INTRADAY'
    let symbol = selectedValue.symbol

    const headers = { 'Content-Type': 'application/json' };
    const query = `?function_choice=${function_choice}&symbol=${symbol}`
    fetch('http://127.0.0.1:3001/exchange/equity' + query, { headers })
      .then(response => response.json())
      .then(data => {
        if (data.errorMessage) {
          setTimeSeriesStock([])
        } else {
          setTimeSeriesStock(data.time_series)
        }
      });

    return () => {
      active = false;
    };
  }, [selectedValue]);

  const handleOnChange = (newValue: string | INewSymbolObject) => {
    console.log('change', newValue);
    if (typeof newValue !== 'string') {
      setSymbolsList(newValue ? [newValue, ...symbolsList] : symbolsList)
      setSelectedValue(newValue);
    }
  }

  const handleOnInputChange = (event: object, newValue: string) => {
    console.log('new text', newValue);
    setInputValue(newValue);
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: 1200 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        style={{ width: 300 }}
        options={symbolsList}
        getOptionLabel={(option) => option.symbol!}
        value={selectedValue}
        onChange={(event, value) => handleOnChange(value!)}
        onInputChange={handleOnInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search symbol"
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
          rowData={timeSeriesStock}>
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
