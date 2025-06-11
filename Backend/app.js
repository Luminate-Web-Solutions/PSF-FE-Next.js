const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");
const sequelize = require("./config/db")
const PORT = process.env.PORT || 3000;

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')) // Serve static files from the 'uploads' directory


//models
const events = require("./models/event.js");
const president = require("./models/president.js");
const { Team, TeamMember } = require('./models/team.js');
const verticals = require("./models/verticals.js");
const newsletter = require("./models/newsletter.js");
const testimonials = require('./models/testimonials.js')
const verticalGallery = require('./models/verticalGallery.js')
const subscriberContact = require('./models/subscriberContact.js')
const subscriberNews = require('./models/subscriberNews.js')

//import routes
const presidentRoutes = require('./routes/president.js') 
const teamRoutes = require('./routes/team.js')
const verticalsRoutes = require('./routes/verticals.js')
const eventRoutes = require('./routes/events.js')
const newsletterRoutes = require('./routes/newsletter.js')
const userRoutes = require('./routes/user.js')
const testimoialsRoutes = require('./routes/testimonials.js');
const galleryRoutes = require('./routes/gallery.js')
const subscriberRoutes = require('./routes/subscriber.js')

//routes
app.use("/api/president", presidentRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/verticals", verticalsRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/admin", userRoutes )
app.use("/api/gallery", galleryRoutes)
app.use('/api/testimonials',testimoialsRoutes)
app.use('/api/subscribe', subscriberRoutes)


app.get("/", (req, res) => {
    res.send("Hello World!");
})

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
testConnection();

async function syncDb(){

  await sequelize.sync({ alter: true });
  console.log('All models were synchronized successfully.');
}
syncDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
