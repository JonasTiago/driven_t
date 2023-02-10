import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const booking = await bookingService.getBooking(userId);
        return res.send(booking);

    } catch (err) {
        if (err.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND)
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { roomId } = req.body;

    try {
        const createBooking = await bookingService.createBooking(userId, roomId);
        return res.status(httpStatus.OK).send({ bookingId: createBooking.id })
    } catch (err) {
        if (err.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND)
        return res.sendStatus(httpStatus.FORBIDDEN)
    }
}

export async function changeBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { roomId } = req.body;
    const {bookingId} = req.params;

    try {

        const bookingUpdate = await bookingService.changeBooking(userId, roomId, Number(bookingId))

        return res.send({bookingId:bookingUpdate.id});

    } catch (err) {
        if (err.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND)
        return res.sendStatus(httpStatus.FORBIDDEN)
    }
}
