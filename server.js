const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const app = express();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
app.use(express.json());

// const signtoken = (username, id) => {
//   const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
//     expiresIn: "1w",
//   });
//   return token;
// };

app.get('/', function (req, res) {
  res.send("Juicebox");
});

app.get('/api/posts', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.send(posts);
});

app.get('/api/posts/:id', async (req, res) => {
  const postId = parseInt(req.params.id);
  const specificPost = await prisma.post.findUnique({
    where: { id: postId },
  });
  res.send(specificPost);
});

app.post('/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1w',
    });

    res.send({ message: "Successful Registration", token });
  }catch (err) {
    console.error('error registering', err);
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ error: 'Wrong Password.' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1w',
    });

    res.send({ message: "Login Successful", token });
  }catch(err) {
    console.error('error logging in', err);
  }
})

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});