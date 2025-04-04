// Import needed hooks and functions
import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import auth from '../utils/auth';
// Variable for the different states
const boardStates = ['Todo', 'In Progress', 'Done'];

// Board page comonent
const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  // Check if the login token has expired every 1s and if it has, log the user out
  if (loginCheck) {
    setInterval(() => {
      const token = auth.getToken()
      const expired = auth.isTokenExpired(token)
      if (expired) {
        setLoginCheck(false)
        auth.logout()
      }
    }, 1000)
  }

  // Function to check if a user is logged in
  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  // Function to fetch the tickets from the database
  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  // Function to delete a ticket
  const deleteIndvTicket = async (ticketId: number) : Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // Check log in when the page first mounts
  useEffect(() => {
    checkLogin();
  }, []);

  // Fetch tickets when the page first mounts if a user is logged in
  useEffect(() => {
    if(loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  // If there's an error, return the error page
  if (error) {
    return <ErrorPage />;
  }

  // Return the HTML for the board page 
  return (
    <>
    {
      !loginCheck ? (
        <div className='login-notice'>
          <h1>
            Login to create & view tickets
          </h1>
        </div>  
      ) : (
          <div className='board'>
            <button type='button' id='create-ticket-link'>
              <Link to='/create' >New Ticket</Link>
            </button>
            <div className='board-display'>
              {boardStates.map((status) => {
                const filteredTickets = tickets.filter(ticket => ticket.status === status);
                return (
                  <Swimlane 
                    title={status} 
                    key={status} 
                    tickets={filteredTickets} 
                    deleteTicket={deleteIndvTicket}
                  />
                );
              })}
            </div>
          </div>
        )
    }
    </>
  );
};

// Export the board page component
export default Board;
