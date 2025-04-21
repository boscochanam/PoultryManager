import { drizzle } from "drizzle-orm/postgres-js";
// import { sql } from "@vercel/postgres";
import {
  roles,
  users,
  farms,
  suppliers,
  supplies,
  logistics,
  orders,
  expenses,
  payroll,
  chickenHealthRecords,
  reports,
  sales,
} from "@/lib/db"; 
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// const db = drizzle(sql);

// Helper function to handle errors
const handleAPIError = (error: any, tableName: string) => {
  console.error(`Error fetching data from ${tableName}:`, error);
  return NextResponse.json(
    { error: `Failed to fetch data from ${tableName}` },
    { status: 500 },
  );
};

// GET all roles
export async function getRoles() {
  try {
    const data = await db.select().from(roles);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "roles");
  }
}

// GET all users
export async function getUsers() {
  try {
    const data = await db.select().from(users);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "users");
  }
}

// GET all farms
export async function getFarms() {
  try {
    const data = await db.select().from(farms);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "farms");
  }
}

// GET all suppliers
export async function getSuppliers() {
  try {
    const data = await db.select().from(suppliers);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "suppliers");
  }
}

// GET all supplies
export async function getSupplies() {
  try {
    const data = await db.select().from(supplies);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "supplies");
  }
}

// GET all logistics
export async function getLogistics() {
  try {
    const data = await db.select().from(logistics);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "logistics");
  }
}

// GET all orders
export async function getOrders() {
  try {
    const data = await db.select().from(orders);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "orders");
  }
}

// GET all expenses
export async function getExpenses() {
  try {
    const data = await db.select().from(expenses);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "expenses");
  }
}

// GET all payroll entries
export async function getPayroll() {
  try {
    const data = await db.select().from(payroll);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "payroll");
  }
}

// GET all chicken health records
export async function getChickenHealthRecords() {
  try {
    const data = await db.select().from(chickenHealthRecords);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "chickenHealthRecords");
  }
}

// GET all reports
export async function getReports() {
  try {
    const data = await db.select().from(reports);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "reports");
  }
}

// GET all sales
export async function getSales() {
  try {
    const data = await db.select().from(sales);
    return NextResponse.json(data);
  } catch (error) {
    return handleAPIError(error, "sales");
  }
}
