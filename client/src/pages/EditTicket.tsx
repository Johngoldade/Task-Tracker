// Import react hooks and functions
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Import needed functions and interfaces
import { retrieveTicket, updateTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import auth from '../utils/auth';


// Function for the edit ticket page
const EditTicket = () => {
  // Set state variables
  const [ticket, setTicket] = useState<TicketData | undefined>();
  const [loginCheck, setLoginCheck] = useState(false);
  
  
  // Check every 1s to see if the token has expired and if so, log out
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
    
  
  // Function to check if the user is logged in
  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
     }
  };
  
  // Check login status on first mount
  useEffect(() => {
    checkLogin();
  }, []);

  // useNavigate hook
  const navigate = useNavigate();
  const { state } = useLocation();


  // Fetch and return a ticket by id
  const fetchTicket = async (ticketId: TicketData) => {
    try {
      const data = await retrieveTicket(ticketId.id);
      setTicket(data);
    } catch (err) {
      console.error('Failed to retrieve ticket:', err);
    }
  }


  // Fetch ticket on first mount
  useEffect(() => {
    fetchTicket(state);
  }, []);


  // If a valid ticket is submitted, navigate to the home page
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ticket && ticket.id !== null){
      updateTicket(ticket.id, ticket);
      navigate('/');
    }
    else{
      console.error('Ticket data is undefined.');
    }
  }


  //Handle ticket inputs
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };
  //Handle ticket change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  // return HTML for the component
  return (
    <>
      <div className='container'>
        {
          ticket ? (
            <form className='form' onSubmit={handleSubmit}>
              <h1>Edit Ticket</h1>
              <label htmlFor='tName'>Ticket Name</label>
              <textarea
                id='tName'
                name='name'
                value={ticket.name || ''}
                onChange={handleTextAreaChange}
                />
              <label htmlFor='tStatus'>Ticket Status</label>
              <select
                name='status'
                id='tStatus'
                value={ticket.status || ''}
                onChange={handleChange}
              >
                <option  value='Todo'>Todo</option>
                <option  value='In Progress'>In Progress</option>
                <option  value='Done'>Done</option>
            </select>
            <label htmlFor='tDescription'>Ticket Description</label>
              <textarea
                id='tDescription'
                name='description'
                value={ticket.description || ''}
                onChange={handleTextAreaChange}
              />
              <button type='submit'>Submit Form</button>
            </form>
          ) : (
            <div>Issues fetching ticket</div>
          )
        }
      </div>  
    </>
  );
};

// Export component
export default EditTicket;
