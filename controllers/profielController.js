const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const dotenv = require("dotenv");
dotenv.config();

const getProfile = async (req, res) => {
  var user_id = req.user.id;
  var user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  res.json({ message: "User profile", user: user }).status(200);
};

const updateProfile = async (req, res) => {
  var user_id = req.user.id;
  var { name, email } = req.body;

  var user = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      name: name,
      email: email,
    },
  });
  res
    .json({
      message: "User profile updated",
      user: user,
    })
    .status(200);
};

module.exports = {
  getProfile,
  updateProfile,
};
