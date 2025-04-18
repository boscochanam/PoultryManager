import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  date,
  serial
} from 'drizzle-orm/pg-core';
import { relations, Relations } from 'drizzle-orm';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

import postgres from 'postgres';
import { config } from 'dotenv';

// Ensure the DATABASE_URL is logged for debugging
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool);

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const roles = pgTable("roles", {
  roleId: text("role_id").primaryKey(),
  roleName: text("role_name").unique().notNull(),
  description: text("description"),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

// Users Table
export const users = pgTable("users", {
  userId: text("user_id").primaryKey(),
  roleId: text("role_id")
    .notNull()
    .references(() => roles.roleId), // Foreign key to roles table
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").unique().notNull(),
  phoneNumber: text("phone_number").unique().notNull(),
  role: text("role"),
  passwordHash: text("password_hash").notNull(),
  farmId: text("farm_id").references(() => farms.farmId), // Foreign key to farms table
  status: text("status"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.roleId],
  }),
  farm: one(farms, {
    fields: [users.farmId],
    references: [farms.farmId],
  }),
  payrolls: many(payroll),
  expenses: many(expenses),
  chickenHealthRecords: many(chickenHealthRecords),
  reports: many(reports),
}));

export const farms = pgTable("farms", {
  farmId: text("farm_id").primaryKey(),
  farmName: text("farm_name").notNull(),
  location: text("location"),
  farmManagerId: text("farm_manager_id"), // Foreign key to users table
  sizeAcres: integer("size_acres"),
  numberOfChickens: integer("number_of_chickens"),
  productionCapacityPerDay: integer("production_capacity_per_day"),
  status: text("status"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const farmsRelations = relations(farms, ({ one, many }) => ({
  // farmManager: one(users, {
  //   fields: [farms.farmManagerId],
  //   references: [users.userId],
  // }),
  supplies: many(supplies),
  orders: many(orders),
  reports: many(reports),
  chickenHealthRecords: many(chickenHealthRecords),
  payrolls: many(payroll),
}));

// Suppliers Table
export const suppliers = pgTable("suppliers", {
  supplierId: text("supplier_id").primaryKey(),
  supplierName: text("supplier_name").notNull(),
  contactPerson: text("contact_person"),
  phoneNumber: text("phone_number").unique().notNull(),
  email: text("email").unique().notNull(),
  address: text("address"),
  category: text("category"),
  status: text("status"),
  createdAt: timestamp("created_at"),
});

export const suppliersRelations = relations(suppliers, ({ many }) => ({
  supplies: many(supplies),
  logistics: many(logistics),
}));

// Supplies Table
export const supplies = pgTable("supplies", {
  supplyId: text("supply_id").primaryKey(),
  supplierId: text("supplier_id")
    .notNull()
    .references(() => suppliers.supplierId), // Foreign key to suppliers table
  farmId: text("farm_id")
    .notNull()
    .references(() => farms.farmId), // Foreign key to farms table
  itemName: text("item_name"),
  category: text("category"),
  quantity: integer("quantity"),
  unit: text("unit"),
  costPerUnit: integer("cost_per_unit"),
  totalCost: integer("total_cost"),
  dateReceived: date("date_received"),
  expirationDate: date("expiration_date"),
  status: text("status"),
  updatedAt: timestamp("updated_at"),
});

export const suppliesRelations = relations(supplies, ({ one }) => ({
  supplier: one(suppliers, {
    fields: [supplies.supplierId],
    references: [suppliers.supplierId],
  }),
  farm: one(farms, {
    fields: [supplies.farmId],
    references: [farms.farmId],
  }),
}));

// Logistics Table
export const logistics = pgTable("logistics", {
  logisticsId: text("logistics_id").primaryKey(),
  vehicleNumber: text("vehicle_number"),
  driverName: text("driver_name"),
  driverPhone: text("driver_phone").unique(),
  deliveryDate: date("delivery_date"),
  status: text("status"),
  farmId: text("farm_id").references(() => farms.farmId), // Foreign key to farms table
  supplierId: text("supplier_id").references(() => suppliers.supplierId), // Foreign key to suppliers table
  notes: text("notes"),
  createdAt: timestamp("created_at"),
});

export const logisticsRelations = relations(logistics, ({ one }) => ({
  supplier: one(suppliers, {
    fields: [logistics.supplierId],
    references: [suppliers.supplierId],
  }),
  farm: one(farms, {
    fields: [logistics.farmId],
    references: [farms.farmId],
  }),
}));

// Orders Table
export const orders = pgTable("orders", {
  orderId: text("order_id").primaryKey(),
  farmId: text("farm_id")
    .notNull()
    .references(() => farms.farmId), // Foreign key to farms table
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  productType: text("product_type"),
  quantity: integer("quantity"),
  unitPrice: integer("unit_price"),
  totalPrice: integer("total_price"),
  orderStatus: text("order_status"),
  deliveryDate: date("delivery_date"),
  createdAt: timestamp("created_at"),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  farm: one(farms, {
    fields: [orders.farmId],
    references: [farms.farmId],
  }),
}));

// Expenses Table
export const expenses = pgTable("expenses", {
  expenseId: text("expense_id").primaryKey(),
  expenseType: text("expense_type"),
  amount: integer("amount"),
  description: text("description"),
  expenseDate: date("expense_date"),
  recordedBy: text("recorded_by").references(() => users.userId), // Foreign key to users table
  createdAt: timestamp("created_at"),
});

export const expensesRelations = relations(expenses, ({ one }) => ({
  recordedBy: one(users, {
    fields: [expenses.recordedBy],
    references: [users.userId],
  }),
}));

// Payroll Table
export const payroll = pgTable("payroll", {
  payrollId: text("payroll_id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.userId), // Foreign key to users table
  farmId: text("farm_id")
    .notNull()
    .references(() => farms.farmId), // Foreign key to farms table
  salaryAmount: integer("salary_amount"),
  bonus: integer("bonus").default(0),
  deductions: integer("deductions").default(0),
  netSalary: integer("net_salary"),
  payDate: date("pay_date"),
  paymentStatus: text("payment_status"),
  createdAt: timestamp("created_at"),
});

export const payrollRelations = relations(payroll, ({ one }) => ({
  user: one(users, {
    fields: [payroll.userId],
    references: [users.userId],
  }),
  farm: one(farms, {
    fields: [payroll.farmId],
    references: [farms.farmId],
  }),
}));

// Chicken Health Records Table
export const chickenHealthRecords = pgTable("chicken_health_records", {
  healthRecordId: text("health_record_id").primaryKey(),
  farmId: text("farm_id")
    .notNull()
    .references(() => farms.farmId), // Foreign key to farms table
  chickenBatchNumber: text("chicken_batch_number"),
  disease: text("disease"),
  treatmentGiven: text("treatment_given"),
  medicineUsed: text("medicine_used"), // Foreign key to supplies table (you may need to adjust this based on your data)
  numberAffected: integer("number_affected"),
  numberRecovered: integer("number_recovered"),
  mortalityRate: integer("mortality_rate"),
  recordedBy: text("recorded_by").references(() => users.userId), // Foreign key to users table
  dateRecorded: date("date_recorded"),
  status: text("status"),
  createdAt: timestamp("created_at"),
});

export const chickenHealthRecordsRelations = relations(
  chickenHealthRecords,
  ({ one }) => ({
    farm: one(farms, {
      fields: [chickenHealthRecords.farmId],
      references: [farms.farmId],
    }),
    recordedBy: one(users, {
      fields: [chickenHealthRecords.recordedBy],
      references: [users.userId],
    }),
  }));

// Reports Table
export const reports = pgTable("reports", {
  reportId: text("report_id").primaryKey(),
  farmId: text("farm_id")
    .notNull()
    .references(() => farms.farmId), // Foreign key to farms table
  reportType: text("report_type"),
  generatedBy: text("generated_by").references(() => users.userId), // Foreign key to users table
  dateGenerated: date("date_generated"),
  filePath: text("file_path"),
  status: text("status"),
  createdAt: timestamp("created_at"),
});

export const reportsRelations = relations(reports, ({ one }) => ({
  farm: one(farms, {
    fields: [reports.farmId],
    references: [farms.farmId],
  }),
  generatedBy: one(users, {
    fields: [reports.generatedBy],
    references: [users.userId],
  }),
}));

// export const products = pgTable('products', {
//   id: serial('id').primaryKey(),
//   imageUrl: text('image_url').notNull(),
//   name: text('name').notNull(),
//   status: statusEnum('status').notNull(),
//   price: numeric('price', { precision: 10, scale: 2 }).notNull(),
//   stock: integer('stock').notNull(),
//   availableAt: timestamp('available_at').notNull()
// });

// export type SelectProduct = typeof products.$inferSelect;
// export const insertProductSchema = createInsertSchema(products);

// export async function getProducts(
//   search: string,
//   offset: number
// ): Promise<{
//   products: SelectProduct[];
//   newOffset: number | null;
//   totalProducts: number;
// }> {
//   if (search) {
//     return {
//       products: await db
//         .select()
//         .from(products)
//         .where(ilike(products.name, `%${search}%`))
//         .limit(1000),
//       newOffset: null,
//       totalProducts: 0
//     };
//   }

//   if (offset === null) {
//     return { products: [], newOffset: null, totalProducts: 0 };
//   }

//   let totalProducts = await db.select({ count: count() }).from(products);
//   let moreProducts = await db.select().from(products).limit(5).offset(offset);
//   let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

//   return {
//     products: moreProducts,
//     newOffset,
//     totalProducts: totalProducts[0].count
//   };
// }

// export async function deleteProductById(id: number) {
//   await db.delete(products).where(eq(products.id, id));
// }
