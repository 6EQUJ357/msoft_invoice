import React from 'react'
import * as XLSX from 'xlsx';



const Downloadtoexcel = ({data, fileName}) => {

    const handleDownloadXL = () => {
        const worksheet = XLSX.utils.json_to_sheet(data.rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
      };
  return (
<button className="dropdown-item" onClick={handleDownloadXL}>Export To Excel</button>  )
}

export default Downloadtoexcel