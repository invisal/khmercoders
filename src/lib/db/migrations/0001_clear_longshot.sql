CREATE TABLE `user_uploads` (
	`user_id` text NOT NULL,
	`filename` text NOT NULL,
	`hashed_filename` text NOT NULL,
	`size` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`hashed_filename`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
