import { prisma } from "@/config";

async function getBookingById(userId:number) {
    return await prisma.booking.findFirst({
        where:{userId}
    })
}

const bookingRepository = {
    getBookingById
};

export default bookingRepository;

