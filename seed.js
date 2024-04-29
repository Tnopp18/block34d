const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const createUsers = async() => {
  const user1 = await prisma.user.create({
    data: {
      username: "user1",
      password: "password",
    },
  });

const user2 = await prisma.user.create({
  data: {
    username: "user2",
    password: "password",
  },
});

const user3 = await prisma.user.create({
  data: {
    username: "user3",
    password: "password",
  },
});
}

const createPosts = async() => {
  const post1 = await prisma.post.create({
    data: {
      title: "title1",
      content: "Lorem ipsum dolor sit amet.",
      ownerId: 1,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "title2",
      content: "Lorem ipsum dolor sit amet.",
      ownerId: 1,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: "title3",
      content: "Lorem ipsum dolor sit amet.",
      ownerId: 1,
    },
  });

  const post4 = await prisma.post.create({
    data: {
      title: "title4",
      content: "Lorem ipsum dolor sit amet.",
      ownerId: 2,
    },
  });

  const post5 = await prisma.post.create({
    data: {
      title: "title5",
      content: "Lorem ipsum dolor sit amet.",
      ownerId: 2,
    },
  });

  const post6 = await prisma.post.create({
    data: {
      title: "title6",
      content: "Lorem ipsum dolor sit amet.",
      ownerId: 2,
    },
  });
  const post7 = await prisma.post.create({
    data: {
      title: "title7",
      content: "Lorem ipsum dolor sit amet.",
      ownerId: 3,
    },
  });
  const post8 = await prisma.post.create({
    data: {
      title: "title8",
      content: "Lorem ipsum dolor sit amet.",
      ownerId: 3,
    },
  });
  const post9 = await prisma.post.create({
    data: {
      title: "title9",
      content: "Lorem ipsum dolor sit amet.",
      ownerId: 3,
    },
  });
}

const main = async() => {
  await createUsers();
  await createPosts();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })