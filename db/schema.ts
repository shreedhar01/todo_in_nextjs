import { InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
    'backlog',
    'todo',
    'in_progress',
    'done',
])

export const priorityEnum = pgEnum("priority", ['low', 'medium', 'high'])

//issue table
export const issuesTable = pgTable("issues", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    status: statusEnum("status").default("backlog").notNull(),
    priority: priorityEnum("priority").default("medium").notNull(),
    createdAt: timestamp("cratedAt").defaultNow().notNull(),
    updatedAt: timestamp("updated").defaultNow().notNull(),
    userId: text("userId").notNull()
})

//user table
export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created").defaultNow().notNull()
})

//relation between tables
export const issuesRelation = relations(issuesTable, ({ one }) => ({
    user: one(userTable, {
        fields: [issuesTable.userId],
        references: [userTable.id]
    })
}))

export const userRelation = relations(userTable,({many})=>({
    issues:many(issuesTable)
}))


//types
export type userTable = InferSelectModel<typeof userTable>
export type issueTable = InferSelectModel<typeof issuesTable>