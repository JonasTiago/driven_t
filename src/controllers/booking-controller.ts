import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { Request, Response } from 'express';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.body;

  try {
    const booking = await bookingService.getBooking(userId);

  } catch (err) {
    return res.sendStatus(500);
  }
}
