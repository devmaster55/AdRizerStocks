import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

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
