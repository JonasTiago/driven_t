import { prisma } from "@/config";

async function getBookingByUserId(userId: number) {
    return await prisma.booking.findFirst({
        where: { userId }
    });
};

async function getRoomById(roomId: number) {
    return prisma.room.findFirst({
        where: { id: roomId },
        include: {
            Booking: true
        }
    })
}

async function createBooking(userId: number, roomId: number) {
    return prisma.booking.create({
        data: {
            userId,
            roomId
        }
    })
};

async function updateBooking(roomId: number, bookingId: number) {
    return prisma.booking.update({
        where: {
            id: bookingId
        },
        data: {
            roomId,
        }
    })
}

const bookingRepository = {
    getBookingByUserId,
    createBooking,
    getRoomById,
    updateBooking,
};

export default bookingRepository

