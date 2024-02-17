/*

This is a MANUAL migration file. It is not generated automatically by Drizzle ORM.
PLEASE REVIEW VERY CAREFULLY BEFORE APPLYING TO THE DATABASE.

*/


ALTER TABLE `user_uploads` RENAME TO `old_user_uploads`;
--> statement-breakpoint
CREATE TABLE `user_uploads` (
	`user_id` text NOT NULL,
	`filename` text NOT NULL,
	`hash` text NOT NULL,
	`size` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`hash`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `user_uploads` SELECT * FROM `old_user_uploads`;
--> statement-breakpoint
DROP TABLE `old_user_uploads`;


/*
SQLite does not support altering primary key
You can do it in 3 steps with drizzle orm:
 - create new mirror table with needed pk, rename current table to old_table, generate SQL
 - migrate old data from one table to another
 - delete old_table in schema, generate sql

or create manual migration like below:

ALTER TABLE table_name RENAME TO old_table;
CREATE TABLE table_name (
	column1 datatype [ NULL | NOT NULL ],
	column2 datatype [ NULL | NOT NULL ],
	...
	PRIMARY KEY (pk_col1, pk_col2, ... pk_col_n)
 );
INSERT INTO table_name SELECT * FROM old_table;

Due to that we don't generate migration automatically and it has to be done manually
*/
