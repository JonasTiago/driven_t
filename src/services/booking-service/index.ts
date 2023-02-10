import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import httpStatus from 'http-status';

async function getBooking(userId: number) {
    const booking = await bookingRepository.getBookingById(userId);
    if (!booking) throw notFoundError()
    return booking;
};

async function createBooking(userId: number, roomId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();

    if (ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
        throw cannotListHotelsError();
    }

    const room = await bookingRepository.getRoomById(roomId)
    if (!room) throw notFoundError();

    const vagas = room.capacity - room.Booking.length
    if(vagas === 0) throw (httpStatus.FORBIDDEN);

    const bookingCreate = await bookingRepository.createBooking(userId, roomId);
    return bookingCreate;
};

const bookingService = {
    getBooking,
    createBooking
};

export default bookingService;