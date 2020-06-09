import bcrypt from "bcryptjs";

const passwordHash = (password, salt) => bcrypt.hashSync(password, salt);
const comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);
export { passwordHash, comparePassword };
