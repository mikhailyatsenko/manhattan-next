import { google } from 'googleapis';

const SPREADSHEET_ID = '14StsbfQBd_b1Hk75bbRpzpfJ6lvvWdVkUz3_tO3xuYE';

// Type definitions
export interface PriceItem {
  service: string;
  price: string;
  prefix?: string;
  additionalInfo?: string;
}

export interface PricesData {
  [category: string]: PriceItem[];
}

// Initialize Google Sheets API
function getGoogleSheetsClient() {
  let credentials;

  // For Vercel: use environment variable
  if (process.env.GOOGLE_SHEETS_CREDENTIALS) {
    credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
  } 
  // For local development: use JSON file
  else {
    try {
      credentials = require('../manhattan-487210-5ef58e0a375e.json');
    } catch (error) {
      throw new Error('Google Sheets credentials not found. Please set GOOGLE_SHEETS_CREDENTIALS environment variable or add manhattan-487210-5ef58e0a375e.json file.');
    }
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return google.sheets({ version: 'v4', auth });
}

// Fetch prices from Google Sheets
export async function fetchPricesFromGoogleSheets(): Promise<PricesData> {
  try {
    const sheets = getGoogleSheetsClient();
    
    // Get all sheet names
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });
    
    const sheetNames = spreadsheet.data.sheets
      ?.map(sheet => sheet.properties?.title)
      .filter(name => name && name !== 'Лист1') as string[];
    
    if (!sheetNames || sheetNames.length === 0) {
      throw new Error('No sheets found in the spreadsheet');
    }
    
    const pricesData: PricesData = {};
    
    // Fetch data from each sheet
    for (const sheetName of sheetNames) {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A2:D`, // Skip header row
      });
      
      const rows = response.data.values || [];
      
      pricesData[sheetName] = rows.map(row => ({
        service: row[0] || '',
        price: row[1] || '',
        prefix: row[2] || undefined,
        additionalInfo: row[3] || undefined,
      }));
    }
    
    return pricesData;
  } catch (error) {
    console.error('Error fetching prices from Google Sheets:', error);
    throw error;
  }
}

// Fallback to local JSON if Google Sheets fails
export async function fetchPrices(): Promise<PricesData> {
  try {
    return await fetchPricesFromGoogleSheets();
  } catch (error) {
    console.warn('Failed to fetch from Google Sheets, falling back to local JSON');
    
    // Fallback to local JSON
    const localPrices = await import('../prices_json/prices.json');
    return localPrices.default as PricesData;
  }
}
