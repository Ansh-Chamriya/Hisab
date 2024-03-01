import { serial, text, varchar, pgTable, numeric, date, time, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
export const profile = pgTable('profiles', {
	profile_id: uuid('profile_id').primaryKey(),
	fullName: varchar('full_name'),
	email: varchar('email'),
	phone: varchar('p_no', { length: 10 }),
	user_id: uuid('user_id')
});

export const income = pgTable('income', {
	income_id: serial('income_id').primaryKey(),
	article: text('article'),
	price: numeric('price'),
	date: date('date'),
	time: time('time'),
	user_id: uuid('user_id')
});
