import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function fillDb() {
    await prisma.category.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Спорт',
        posts: {
          create: [
            {
              title: 'Советую!',
              userId: '13',
              text: 'Недавно приобрёл протеин фирмы BombBar...',
              announceText: 'Вкус не приедается, хорошее соотношение. Советую.'
            },
          ]
        },
      }
    });
    await prisma.category.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'Техника',
        posts: {
          create: [
            {
              title: 'Обновление!',
              userId: '13',
              text: '',
              announceText: 'Заказал со Штатов новенький Alienware X17...',
              comments: {
                create: [
                  {
                    text: 'Пользовался таким,пушка!',
                    userId: '17',
                  }
                ]
              }
            },
            {
              title: 'Моя первая сборка',
              userId: '13',
              text: 'В моей первой сборке стоял...',
              announceText: 'Простенькие Intel Pentium Gold и GTX 940...'
            }
          ]
        }
      }
    });
    console.info("Database was filled!")
}

fillDb()
    .then(async () => {
    await prisma.$disconnect()
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect
    })