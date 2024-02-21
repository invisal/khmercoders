import { db } from "../db";

/**
 * Retrieves a user by their username.
 *
 * @param {string} username - the username of the user to retrieve
 * @return {Promise<user>} the user object
 */
export const getUserByUsername = async (username: string) => {
  return await db.query.users.findFirst({
    where: (field, op) => op.eq(field.username, username.toLowerCase()),
  });
};
