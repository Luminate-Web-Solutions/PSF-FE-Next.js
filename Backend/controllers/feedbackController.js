import { query } from '../config/db.js';

// Submit feedback for an event
export const submitFeedback = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.auth.sub; // Auth0 user ID from JWT token
    const { rating, comments } = req.body;
    
    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    // Check if user attended the event
    const rsvps = await query(
      'SELECT * FROM event_rsvps WHERE event_id = ? AND user_id = ?',
      [eventId, userId]
    );
    
    if (rsvps.length === 0) {
      return res.status(400).json({ message: 'You did not RSVP to this event' });
    }
    
    const rsvp = rsvps[0];
    const eventDate = await query('SELECT date FROM events WHERE id = ?', [eventId]);
    
    if (eventDate.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const isEventPast = new Date(eventDate[0].date) < new Date();
    
    if (!isEventPast) {
      return res.status(400).json({ message: 'Cannot provide feedback for future events' });
    }
    
    // Check if feedback already exists
    const existingFeedback = await query(
      'SELECT * FROM event_feedback WHERE event_id = ? AND user_id = ?',
      [eventId, userId]
    );
    
    if (existingFeedback.length > 0) {
      return res.status(400).json({ message: 'You have already provided feedback for this event' });
    }
    
    // Insert feedback
    await query(
      'INSERT INTO event_feedback (event_id, user_id, rating, comments) VALUES (?, ?, ?, ?)',
      [eventId, userId, rating, comments || '']
    );
    
    // Update RSVP to mark feedback as provided
    await query(
      'UPDATE event_rsvps SET feedback_provided = true WHERE event_id = ? AND user_id = ?',
      [eventId, userId]
    );
    
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error in submitFeedback:', error);
    next(error);
  }
};

// Get feedback for an event (admin only)
export const getEventFeedback = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    
    // Check if user has admin role
    const userRole = req.auth?.['https://membershipportal.com/roles'] || [];
    const isAdmin = Array.isArray(userRole) 
      ? userRole.includes('admin')
      : userRole === 'admin';
      
    if (!isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }
    
    // Get all feedback for the event
    const feedback = await query(`
      SELECT ef.*, u.name as user_name
      FROM event_feedback ef
      LEFT JOIN users u ON ef.user_id = u.auth0_id
      WHERE ef.event_id = ?
    `, [eventId]);
    
    // Format the response
    const formattedFeedback = feedback.map(item => ({
      id: item.id,
      userId: item.user_id,
      userName: item.user_name || 'Anonymous',
      rating: item.rating,
      comments: item.comments,
      createdAt: item.created_at
    }));
    
    res.status(200).json(formattedFeedback);
  } catch (error) {
    console.error('Error in getEventFeedback:', error);
    next(error);
  }
};