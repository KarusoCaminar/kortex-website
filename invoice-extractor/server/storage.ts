// In-Memory Storage implementation - no database dependencies
import { type User, type InsertUser, type Invoice, type InsertInvoice } from "@shared/schema";

// 4 Pre-defined demo invoices for live demo functionality
const INITIAL_INVOICES: Invoice[] = [
  {
    id: "demo-1",
    fileName: "Rechnungsvorlage 1.jpg",
    fileType: "image/jpeg",
    fileData: "data:image/jpeg;base64,demo1",
    invoiceNumber: "INV-2024-001",
    invoiceDate: "15.01.2024",
    dueDate: "15.02.2024",
    supplierName: "Muster GmbH",
    supplierAddress: "Musterstraße 1, 12345 Berlin",
    supplierVatId: "DE123456789",
    customerName: "Kortex System",
    customerAddress: "Beispielweg 10, 54321 München",
    paymentTerms: "Net 30",
    subtotal: "1000.00",
    vatRate: "19.00",
    vatAmount: "190.00",
    totalAmount: "1190.00",
    lineItems: [
      { description: "Beratungsleistung", quantity: 10, unitPrice: "100.00", total: "1000.00" }
    ],
    vatValidated: "valid",
    status: "completed",
    errorMessage: null,
    createdAt: new Date("2024-01-15T10:00:00Z")
  },
  {
    id: "demo-2",
    fileName: "Rechnungsvorlage 2.jpg",
    fileType: "image/jpeg",
    fileData: "data:image/jpeg;base64,demo2",
    invoiceNumber: "INV-2024-002",
    invoiceDate: "20.01.2024",
    dueDate: "20.02.2024",
    supplierName: "Beispiel AG",
    supplierAddress: "Beispielstraße 5, 67890 Hamburg",
    supplierVatId: "DE987654321",
    customerName: "Kortex System",
    customerAddress: "Beispielweg 10, 54321 München",
    paymentTerms: "Net 30",
    subtotal: "2500.00",
    vatRate: "19.00",
    vatAmount: "475.00",
    totalAmount: "2975.00",
    lineItems: [
      { description: "Software-Lizenz", quantity: 1, unitPrice: "2000.00", total: "2000.00" },
      { description: "Support-Paket", quantity: 1, unitPrice: "500.00", total: "500.00" }
    ],
    vatValidated: "valid",
    status: "completed",
    errorMessage: null,
    createdAt: new Date("2024-01-20T14:30:00Z")
  },
  {
    id: "demo-3",
    fileName: "Rechnung Vorlage 1 (ENG).pdf",
    fileType: "application/pdf",
    fileData: "data:application/pdf;base64,demo3",
    invoiceNumber: "INV-2024-003",
    invoiceDate: "25.01.2024",
    dueDate: "25.02.2024",
    supplierName: "Example Ltd.",
    supplierAddress: "Example Street 10, London, UK",
    supplierVatId: "GB123456789",
    customerName: "Kortex System",
    customerAddress: "Beispielweg 10, 54321 München",
    paymentTerms: "Net 30",
    subtotal: "1500.00",
    vatRate: "20.00",
    vatAmount: "300.00",
    totalAmount: "1800.00",
    lineItems: [
      { description: "Development Services", quantity: 20, unitPrice: "75.00", total: "1500.00" }
    ],
    vatValidated: "not_checked",
    status: "completed",
    errorMessage: null,
    createdAt: new Date("2024-01-25T09:15:00Z")
  },
  {
    id: "demo-4",
    fileName: "Rechnung Vorlage 2 (DE).pdf",
    fileType: "application/pdf",
    fileData: "data:application/pdf;base64,demo4",
    invoiceNumber: "INV-2024-004",
    invoiceDate: "30.01.2024",
    dueDate: "01.03.2024",
    supplierName: "Vorlage GmbH",
    supplierAddress: "Vorlagestraße 20, 98765 Köln",
    supplierVatId: "DE111222333",
    customerName: "Kortex System",
    customerAddress: "Beispielweg 10, 54321 München",
    paymentTerms: "Net 30",
    subtotal: "3000.00",
    vatRate: "19.00",
    vatAmount: "570.00",
    totalAmount: "3570.00",
    lineItems: [
      { description: "Projektmanagement", quantity: 40, unitPrice: "50.00", total: "2000.00" },
      { description: "Implementierung", quantity: 20, unitPrice: "50.00", total: "1000.00" }
    ],
    vatValidated: "valid",
    status: "completed",
    errorMessage: null,
    createdAt: new Date("2024-01-30T16:45:00Z")
  }
];

export interface IStorage {
  // User methods (keep existing for compatibility)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Invoice methods
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  getInvoice(id: string): Promise<Invoice | undefined>;
  getAllInvoices(): Promise<Invoice[]>;
  updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice | undefined>;
  deleteInvoice(id: string): Promise<boolean>;
  deleteAllInvoices(): Promise<number>;
}

export class InMemoryStorage implements IStorage {
  private invoices: Invoice[] = [...INITIAL_INVOICES];
  private users: User[] = [];
  private nextInvoiceId = 1;

  // Generate unique ID
  private generateId(): string {
    return `invoice-${Date.now()}-${this.nextInvoiceId++}`;
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id) || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username) || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: `user-${Date.now()}`,
      ...insertUser
    };
    this.users.push(user);
    return user;
  }

  // Invoice methods
  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const invoice: Invoice = {
      id: this.generateId(),
      invoiceNumber: insertInvoice.invoiceNumber ?? null,
      invoiceDate: insertInvoice.invoiceDate ?? null,
      dueDate: insertInvoice.dueDate ?? null,
      supplierName: insertInvoice.supplierName ?? null,
      supplierAddress: insertInvoice.supplierAddress ?? null,
      supplierVatId: insertInvoice.supplierVatId ?? null,
      customerName: insertInvoice.customerName ?? null,
      customerAddress: insertInvoice.customerAddress ?? null,
      paymentTerms: insertInvoice.paymentTerms ?? null,
      subtotal: insertInvoice.subtotal ?? null,
      vatRate: insertInvoice.vatRate ?? null,
      vatAmount: insertInvoice.vatAmount ?? null,
      totalAmount: insertInvoice.totalAmount ?? null,
      lineItems: insertInvoice.lineItems ?? null,
      vatValidated: insertInvoice.vatValidated ?? null,
      status: insertInvoice.status ?? "processing",
      errorMessage: insertInvoice.errorMessage ?? null,
      createdAt: new Date(),
      ...insertInvoice
    };
    this.invoices.push(invoice);
    return invoice;
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    return this.invoices.find(inv => inv.id === id) || undefined;
  }

  async getAllInvoices(): Promise<Invoice[]> {
    // Return invoices sorted by createdAt (newest first)
    return [...this.invoices].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice | undefined> {
    const index = this.invoices.findIndex(inv => inv.id === id);
    if (index === -1) return undefined;
    
    this.invoices[index] = { ...this.invoices[index], ...updates };
    return this.invoices[index];
  }

  async deleteInvoice(id: string): Promise<boolean> {
    // Never delete demo invoices
    if (id.startsWith("demo-")) {
      return false;
    }
    
    const index = this.invoices.findIndex(inv => inv.id === id);
    if (index === -1) return false;
    
    this.invoices.splice(index, 1);
    return true;
  }

  async deleteAllInvoices(): Promise<number> {
    // Delete all invoices EXCEPT the 4 initial demo invoices
    const initialIds = INITIAL_INVOICES.map(inv => inv.id);
    const beforeCount = this.invoices.length;
    
    this.invoices = this.invoices.filter(inv => initialIds.includes(inv.id));
    
    // Reset to initial state if needed
    if (this.invoices.length < INITIAL_INVOICES.length) {
      this.invoices = [...INITIAL_INVOICES];
    }
    
    const deletedCount = beforeCount - this.invoices.length;
    return deletedCount;
  }
}

export const storage = new InMemoryStorage();
