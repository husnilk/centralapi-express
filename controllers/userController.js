const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const listUser = async (req, res, next) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.json(users).status(200);
};

const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User creation failed" });
  }
};

const editUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, password },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User update failed" });
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User deletion failed" });
  }
};

module.exports = {
  listUser,
  addUser,
  editUser,
  deleteUser,
};
