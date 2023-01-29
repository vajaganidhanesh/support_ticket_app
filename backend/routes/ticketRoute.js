const express = require("express");
const router = express.Router();
const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

// Re-route into note router
const noteRouter = require('./noteRoute')
router.use('/:ticketId/notes',noteRouter)

// Tickets from all the users
router
   .route("/")
   .get(protect, getTickets)
   .post(protect, createTicket);

// Ticket for particular user
router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);


module.exports = router;
