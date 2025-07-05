import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

// Prevent multiple instances of Prisma Client in development
export const prisma = globalThis.__prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}

// Export types
export * from '@prisma/client'

// Utility functions
export const connectDB = async () => {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  }
}

export const disconnectDB = async () => {
  await prisma.$disconnect()
}

// Common queries
export const userQueries = {
  findByFirebaseUid: (firebaseUid: string) =>
    prisma.user.findUnique({
      where: { firebaseUid },
      include: {
        profile: true,
        enrollments: {
          include: {
            subject: true,
          },
        },
      },
    }),

  createWithProfile: (userData: {
    email: string
    firebaseUid: string
    displayName?: string
    username?: string
  }) =>
    prisma.user.create({
      data: {
        ...userData,
        profile: {
          create: {},
        },
      },
      include: {
        profile: true,
      },
    }),

  updateProgress: (userId: string, xpGained: number) =>
    prisma.user.update({
      where: { id: userId },
      data: {
        totalXP: {
          increment: xpGained,
        },
        lastActiveDate: new Date(),
      },
    }),
}

export const progressQueries = {
  getUserProgress: (userId: string, subjectId?: string) =>
    prisma.progress.findMany({
      where: {
        userId,
        ...(subjectId && {
          OR: [
            { topic: { subjectId } },
            { module: { topic: { subjectId } } },
            { lesson: { module: { topic: { subjectId } } } },
          ],
        }),
      },
      include: {
        topic: true,
        module: true,
        lesson: true,
      },
    }),

  updateLessonProgress: (
    userId: string,
    lessonId: string,
    data: {
      status?: any
      completionPercentage?: number
      timeSpentMinutes?: number
      accuracyScore?: number
    }
  ) =>
    prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        ...data,
        lastAccessedAt: new Date(),
        updatedAt: new Date(),
      },
      create: {
        userId,
        lessonId,
        ...data,
        lastAccessedAt: new Date(),
      },
    }),
}

export const learningQueries = {
  getSubjectsWithProgress: (userId: string) =>
    prisma.subject.findMany({
      where: { isActive: true },
      include: {
        topics: {
          where: { isActive: true },
          include: {
            progress: {
              where: { userId },
            },
            modules: {
              where: { isActive: true },
              include: {
                progress: {
                  where: { userId },
                },
              },
            },
          },
        },
        enrollments: {
          where: { userId },
        },
      },
      orderBy: { sortOrder: 'asc' },
    }),

  getRecommendedContent: (userId: string, limit = 5) =>
    prisma.$queryRaw`
      SELECT DISTINCT l.*, m.name as module_name, t.name as topic_name
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      JOIN topics t ON m.topic_id = t.id
      LEFT JOIN progress p ON l.id = p.lesson_id AND p.user_id = ${userId}
      WHERE l.is_active = true 
        AND m.is_active = true 
        AND t.is_active = true
        AND (p.status IS NULL OR p.status != 'COMPLETED')
      ORDER BY l.sort_order
      LIMIT ${limit}
    `,
}

export default prisma
