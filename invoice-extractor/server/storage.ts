import { type User, type InsertUser, type Invoice, type InsertInvoice } from "@shared/schema";

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
  bootstrap(): Promise<void>;
}
