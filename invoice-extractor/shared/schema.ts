// Pure TypeScript interfaces for invoice and user data
// No database dependencies - compatible with InMemoryStorage

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: string;
  total: string;
}

export interface Invoice {
  id: string;
  fileName: string;
  fileType: string; // 'image/jpeg', 'image/png', 'application/pdf'
  fileData: string; // base64 encoded
  
  // Extracted invoice data
  invoiceNumber: string | null;
  invoiceDate: string | null; // German format: DD.MM.YYYY
  dueDate: string | null; // Payment due date: DD.MM.YYYY
  supplierName: string | null;
  supplierAddress: string | null;
  supplierVatId: string | null;
  customerName: string | null; // Customer/bill-to name
  customerAddress: string | null; // Customer/bill-to address
  paymentTerms: string | null; // e.g., "Net 30", "Due on receipt"
  
  // Financial data
  subtotal: string | null;
  vatRate: string | null; // e.g., "19.00" for 19%
  vatAmount: string | null;
  totalAmount: string | null;
  
  // Line items as JSON
  lineItems: LineItem[] | null;
  
  // Validation status
  vatValidated: string | null; // 'valid', 'invalid', 'not_checked'
  
  // Processing status
  status: string; // 'processing', 'completed', 'error'
  errorMessage: string | null;
  
  createdAt: Date;
}

export interface InsertInvoice {
  fileName: string;
  fileType: string;
  fileData: string;
  invoiceNumber?: string | null;
  invoiceDate?: string | null;
  dueDate?: string | null;
  supplierName?: string | null;
  supplierAddress?: string | null;
  supplierVatId?: string | null;
  customerName?: string | null;
  customerAddress?: string | null;
  paymentTerms?: string | null;
  subtotal?: string | null;
  vatRate?: string | null;
  vatAmount?: string | null;
  totalAmount?: string | null;
  lineItems?: LineItem[] | null;
  vatValidated?: string | null;
  status?: string;
  errorMessage?: string | null;
}

// User schema (keep existing for compatibility)
export interface User {
  id: string;
  username: string;
  password: string;
}

export interface InsertUser {
  username: string;
  password: string;
}
