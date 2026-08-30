import {
  pgTable,
  text,
  timestamp,
  varchar,
  jsonb,
  boolean,
  integer,
  decimal,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});

export const invoices = pgTable("invoices", {
  id: varchar("id", { length: 255 }).primaryKey(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileData: text("file_data").notNull(),
  invoiceNumber: text("invoice_number"),
  invoiceDate: text("invoice_date"),
  dueDate: text("due_date"),
  supplierName: text("supplier_name"),
  supplierAddress: text("supplier_address"),
  supplierVatId: text("supplier_vat_id"),
  customerName: text("customer_name"),
  customerAddress: text("customer_address"),
  paymentTerms: text("payment_terms"),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }),
  vatRate: decimal("vat_rate", { precision: 5, scale: 2 }),
  vatAmount: decimal("vat_amount", { precision: 10, scale: 2 }),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
  vatValidated: text("vat_validated"),
  status: text("status").default("processing").notNull(),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const lineItems = pgTable("line_items", {
  id: varchar("id", { length: 255 }).primaryKey(),
  invoiceId: varchar("invoice_id", { length: 255 })
    .notNull()
    .references(() => invoices.id),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
});

export const invoicesRelations = relations(invoices, ({ many }) => ({
  lineItems: many(lineItems),
}));

export const lineItemsRelations = relations(lineItems, ({ one }) => ({
  invoice: one(invoices, {
    fields: [lineItems.invoiceId],
    references: [invoices.id],
  }),
}));
