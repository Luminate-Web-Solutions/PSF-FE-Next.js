import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import eventRoutes from './routes/events.js';
import rsvpRoutes from './routes/rsvps.js';
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payment.js';
import { connectDB } from './config/db.js';

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:3000' ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for testing
  crossOriginResourcePolicy: false // Disable CORP for testing
}));

app.use(express.json());
app.use(morgan('dev'));

// Serve static files from uploads directory
// Important: This should be a direct path, not under /api
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/rsvps', rsvpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;