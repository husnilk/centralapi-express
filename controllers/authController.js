const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const register = (req, res) => {
  var { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Password hashing failed" });
    }
    prisma.user
      .create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "User registration failed" });
      });
  });
};

const login = (req, res) => {
  var { email, password } = req.body;
  // Login logic here
  console.log(email, password);

  prisma.user
    .findUnique({
      where: {
        email: email,
      },
    })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        var token = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "1800s",
          }
        );
        res.status(200).json({
          message: "Login successful",
          token: token,
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Login failed" });
    });
};

const profile = async (req, res) => {
  var user_id = req.user.id;
  var user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  res.json({ message: "User profile", user: user }).status(200);
};

module.exports = {
  register,
  login,
  profile,
};
