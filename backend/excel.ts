import XLSX from "xlsx";
import path from "path";

interface SampleData {
  Country: string;
  Tag: string;
  Name: string;
  Opening: number;
  Closing: number;
  Description: string;
  Type: string;
  Lat: number;
  Long: number;
  Image: string;
  Rating: number;
  S3: string;
}

let workbook = XLSX.readFile(path.join("sampledata.xlsx"));

// console.log("workbook", workbook);

let userSheet = workbook.Sheets.Sheet1;
export let samples = XLSX.utils.sheet_to_json<SampleData>(userSheet);

// console.log("userSheet", userSheet);
// console.log("userRows:", samples);
