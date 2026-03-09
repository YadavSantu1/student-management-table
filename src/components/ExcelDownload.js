import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExcelDownload({ students }) {

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);

    const workbook = {
      Sheets: { Students: worksheet },
      SheetNames: ["Students"]
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream"
    });

    saveAs(data, "students.xlsx");
  };

  return (
    <button onClick={downloadExcel}>
      Download Excel
    </button>
  );
}

export default ExcelDownload;