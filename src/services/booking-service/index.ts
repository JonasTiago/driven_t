import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import httpStatus from 'http-status';

async function checkBooking(userId: number) {
    const booking = await bookingRepository.getBookingByUserId(userId);
    if (!booking) throw notFoundError()
    return booking;
}

async function checkVacantRooms(roomId: number) {
    const room = await bookingRepository.getRoomById(roomId)
    if (!room) throw notFoundError();

    const vacancy = room.capacity - room.Booking.length
    if (vacancy === 0) throw (httpStatus.FORBIDDEN);
}

async function getBooking(userId: number) {
    return await checkBooking(userId);
};

async function createBooking(userId: number, roomId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();

    if (ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannotListHotelsError();
    }

    await checkVacantRooms(roomId)

    const bookingCreate = await bookingRepository.createBooking(userId, roomId);
    return bookingCreate;
};

async function changeBooking(userId: number, roomId: number, bookingId: number) {

    await checkBooking(userId);

    await checkVacantRooms(roomId);

    return await bookingRepository.updateBooking(roomId, bookingId)
}

const bookingService = {
    getBooking,
    createBooking,
    changeBooking
};

export default bookingService;