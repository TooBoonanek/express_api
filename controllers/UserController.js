import prisma from "../prisma/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Register
const UserSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    await prisma.user
      .create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      })
      .then((user) => {
        const token = generateToken(user);
        res.status(201).json({ username: user.username, token: token });
      })
      .catch((error) => res.status(400).json({ message: error.message }));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login
const UserSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return res.status(401).json({message: 'Credentials could not verify'});
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({message: 'Credentials could not verify'});
    const token = generateToken(user);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Logout
const UserSignOut = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "5m" }
  );
};

export { UserSignUp, UserSignIn, UserSignOut };
