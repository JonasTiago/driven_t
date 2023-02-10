import { prisma } from "@/config";

async function getBookingById(userId: number) {
    return await prisma.booking.findFirst({
        where: { userId }
    });
};

async function getRoomById(roomId: number) {
    return prisma.room.findFirst({
        where: { id: roomId },
        include:{
            Booking:true
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

const bookingRepository = {
    getBookingById,
    createBooking,
    getRoomById
};

export default bookingRepository

