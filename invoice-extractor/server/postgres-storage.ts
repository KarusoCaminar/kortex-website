import { db } from "./db";
import { invoices, users, lineItems } from "./db/schema";
import { eq, sql } from "drizzle-orm";
import { IStorage } from "./storage";
import {
  Invoice,
  InsertInvoice,
  User,
  InsertUser,
} from "../shared/schema";
import { v4 as uuidv4 } from "uuid";

const INITIAL_INVOICES: InsertInvoice[] = [
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

export class PostgresStorage implements IStorage {
  async bootstrap() {
    // Check if demo data already exists
    const demoInvoices = await db.query.invoices.findMany({
      where: (invoices, { like }) => like(invoices.id, "demo-%"),
    });
    if (demoInvoices.length === 0) {
      console.log("Bootstrapping database with demo data...");
      for (const invoice of INITIAL_INVOICES) {
        await this.createInvoice(invoice);
      }
    }
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return db.query.users.findFirst({ where: eq(users.id, id) });
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return db.query.users.findFirst({ where: eq(users.username, username) });
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = `user-${uuidv4()}`;
    const newUser = { id, ...insertUser };
    await db.insert(users).values(newUser);
    return newUser;
  }

  // Invoice methods
  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const id = insertInvoice.id && insertInvoice.id.startsWith("demo-") ? insertInvoice.id : `invoice-${uuidv4()}`;
    const { lineItems: itemsToInsert, ...invoiceData } = insertInvoice;
    const newInvoice = { ...invoiceData, id, createdAt: new Date() };
    await db.insert(invoices).values(newInvoice);

    if (itemsToInsert && itemsToInsert.length > 0) {
        const lineItemsData = itemsToInsert.map(item => ({
            id: `li-${uuidv4()}`,
            invoiceId: id,
            ...item
        }));
        await db.insert(lineItems).values(lineItemsData);
    }

    return this.getInvoice(id) as Promise<Invoice>;
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    return db.query.invoices.findFirst({
      where: eq(invoices.id, id),
      with: { lineItems: true },
    });
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return db.query.invoices.findMany({
      orderBy: (invoices, { desc }) => [desc(invoices.createdAt)],
      with: { lineItems: true },
    });
  }

  async updateInvoice(id: string, updates: Partial<InsertInvoice>): Promise<Invoice | undefined> {
    await db.update(invoices).set(updates).where(eq(invoices.id, id));
    return this.getInvoice(id);
  }

  async deleteInvoice(id: string): Promise<boolean> {
    if (id.startsWith("demo-")) {
      return false;
    }
    await db.delete(lineItems).where(eq(lineItems.invoiceId, id));
    const result = await db.delete(invoices).where(eq(invoices.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async deleteAllInvoices(): Promise<number> {
    await db.delete(lineItems).where(sql`invoice_id NOT LIKE 'demo-%'`);
    const result = await db.delete(invoices).where(sql`id NOT LIKE 'demo-%'`);
    return result.rowCount || 0;
  }
}

export const storage = new PostgresStorage();
