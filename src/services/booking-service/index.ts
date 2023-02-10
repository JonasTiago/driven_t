import bookingRepository from "@/repositories/booking-repository";

async function getBooking(userId:number) {
    const booking = await bookingRepository.getBookingById(userId)
    return booking;
}

const bookingService = {
    getBooking
}

export default bookingService;