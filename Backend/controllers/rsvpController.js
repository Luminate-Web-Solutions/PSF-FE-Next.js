import { query } from '../config/db.js';

// RSVP to an event
export const rsvpToEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.auth.sub; // Auth0 user ID from JWT token
    
    // Check if event exists
    const events = await query('SELECT * FROM events WHERE id = ?', [eventId]);
    
    if (events.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user has already RSVP'd
    const existingRsvp = await query(
      'SELECT * FROM event_rsvps WHERE event_id = ? AND user_id = ?',
      [eventId, userId]
    );
    
    if (existingRsvp.length > 0) {
      // If previously cancelled, update to confirmed
      if (existingRsvp[0].status === 'cancelled') {
        await query(
          'UPDATE event_rsvps SET status = "confirmed", updated_at = NOW() WHERE event_id = ? AND user_id = ?',
          [eventId, userId]
        );
        return res.status(200).json({ message: 'RSVP updated to confirmed' });
      }
      return res.status(400).json({ message: 'You have already RSVP\'d to this event' });
    }
    
    // Create new RSVP
    await query(
      'INSERT INTO event_rsvps (event_id, user_id, status) VALUES (?, ?, "confirmed")',
      [eventId, userId]
    );
    
    res.status(201).json({ message: 'RSVP successful' });
  } catch (error) {
    console.error('Error in rsvpToEvent:', error);
    next(error);
  }
};

// Cancel RSVP
export const cancelRsvp = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.auth.sub; // Auth0 user ID from JWT token
    
    // Check if RSVP exists
    const rsvps = await query(
      'SELECT * FROM event_rsvps WHERE event_id = ? AND user_id = ?',
      [eventId, userId]
    );
    
    if (rsvps.length === 0) {
      return res.status(404).json({ message: 'RSVP not found' });
    }
    
    // Update RSVP status to cancelled
    await query(
      'UPDATE event_rsvps SET status = "cancelled", updated_at = NOW() WHERE event_id = ? AND user_id = ?',
      [eventId, userId]
    );
    
    res.status(200).json({ message: 'RSVP cancelled successfully' });
  } catch (error) {
    console.error('Error in cancelRsvp:', error);
    next(error);
  }
};

// Mark user as attended
export const markAttended = async (req, res, next) => {
  try {
    const { eventId, userId } = req.params;
    
    // Check if user has admin role
    const userRole = req.auth?.['https://membershipportal.com/roles'] || [];
    const isAdmin = Array.isArray(userRole) 
      ? userRole.includes('admin')
      : userRole === 'admin';
      
    if (!isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }
    
    // Check if RSVP exists
    const rsvps = await query(
      'SELECT * FROM event_rsvps WHERE event_id = ? AND user_id = ?',
      [eventId, userId]
    );
    
    if (rsvps.length === 0) {
      return res.status(404).json({ message: 'RSVP not found' });
    }
    
    // Update RSVP status to attended
    await query(
      'UPDATE event_rsvps SET status = "attended", updated_at = NOW() WHERE event_id = ? AND user_id = ?',
      [eventId, userId]
    );
    
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error in markAttended:', error);
    next(error);
  }
};

// Get user's RSVPs with event details
export const getUserRsvps = async (req, res, next) => {
  try {
    const userId = req.auth.sub; // Auth0 user ID from JWT token
    
    // Get all RSVPs for the user with event details
    const rsvps = await query(`
      SELECT er.id as rsvp_id, er.status, er.feedback_provided, er.created_at as rsvp_date,
             e.id as event_id, e.name, e.description, e.date, e.image, 
             (e.date < CURDATE()) as is_past
      FROM event_rsvps er
      JOIN events e ON er.event_id = e.id
      WHERE er.user_id = ?
      ORDER BY e.date ASC
    `, [userId]);
    
    // Format the response
    const formattedRsvps = rsvps.map(rsvp => ({
      rsvpId: rsvp.rsvp_id,
      status: rsvp.status,
      feedbackProvided: rsvp.feedback_provided === 1,
      rsvpDate: rsvp.rsvp_date,
      event: {
        id: rsvp.event_id,
        name: rsvp.name,
        description: rsvp.description,
        date: rsvp.date,
        image: rsvp.image ? `${req.protocol}://${req.get('host')}/uploads/events/${rsvp.image}` : null,
        isPast: rsvp.is_past === 1
      }
    }));
    
    res.status(200).json(formattedRsvps);
  } catch (error) {
    console.error('Error in getUserRsvps:', error);
    next(error);
  }
};

// Get user's attendance statistics
export const getUserEventStats = async (req, res, next) => {
  try {
    const userId = req.auth.sub; // Auth0 user ID from JWT token
    
    // Get statistics about the user's event attendance
    const stats = await query(`
      SELECT 
        COUNT(CASE WHEN status = 'confirmed' AND DATE(e.date) >= CURDATE() THEN 1 END) as upcoming_events,
        COUNT(CASE WHEN status = 'attended' THEN 1 END) as attended_events,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_events,
        COUNT(CASE WHEN status = 'confirmed' AND DATE(e.date) < CURDATE() THEN 1 END) as missed_events
      FROM event_rsvps er
      JOIN events e ON er.event_id = e.id
      WHERE er.user_id = ?
    `, [userId]);
    
    res.status(200).json(stats[0]);
  } catch (error) {
    console.error('Error in getUserEventStats:', error);
    next(error);
  }
};