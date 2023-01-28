import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import Spinner from "../component/Spinner";
import BackButton from "../component/BackButton";

function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch()

  useEffect(()=>{
    return ()=>{
        if(isSuccess){
            dispatch(reset())
        }
    }
  },[dispatch,isSuccess])

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if(isLoading){
    return <Spinner />
  }

  return (
    <div>
        <h1>Tickets</h1>
    </div>
  );
}

export default Tickets;
