import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, reset as noteRest } from "../features/notes/noteSlice";
import BackButton from "../component/BackButton";
import Spinner from "../component/Spinner";
import NoteItem from "./noteItem";
function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const { notes, isLoading: noteIsLoading } = useSelector(
    (state) => state.notes
  );


  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  if (isLoading || noteIsLoading) {
    return <Spinner />;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-IN")}
        </h3>

        <h3>Product : {ticket.product}</h3>

        <hr />

        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>

        <h2>Notes</h2>
      </header>
        {notes.map((note) => (
          <NoteItem key={note} note={note} />
        ))}
      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
