import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { 
  rsvpToEvent, 
  cancelRsvp, 
  markAttended, 
  getUserRsvps,
  getUserEventStats 
} from '../controllers/rsvpController.js';
import { submitFeedback, getEventFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

// Auth middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: 'RS256'
});

// RSVP routes
router.post('/events/:eventId/rsvp', checkJwt, rsvpToEvent);
router.put('/events/:eventId/cancel', checkJwt, cancelRsvp);
router.put('/events/:eventId/users/:userId/attend', checkJwt, markAttended);
router.get('/my-events', checkJwt, getUserRsvps);
router.get('/stats', checkJwt, getUserEventStats);

// Feedback routes
router.post('/events/:eventId/feedback', checkJwt, submitFeedback);
router.get('/events/:eventId/feedback', checkJwt, getEventFeedback);

export default router;