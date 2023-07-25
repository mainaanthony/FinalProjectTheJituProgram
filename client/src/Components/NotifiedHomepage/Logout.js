import React, { useState } from 'react';
import './Logout.css';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Logout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // State to manage the dialog box open/close

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:4042/users/logout', {
        withCredentials: true,
      });

      toast.success('Logged out successfully');
      setTimeout(() => {
        navigate('/');
      }, 1500); // Delay the navigation for 1.5 seconds
    } catch (error) {
      toast.error('Failed to logout');
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='logout'>
      <div className='logoutBox'>
        <h3>Logout from the Notified Social App</h3>
        <Button className='logoutButton' onClick={() => setOpen(true)}>
          Logout
        </Button>
        {/* Dialog for Logout Confirmation */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
          <DialogActions>
            <Button onClick={handleLogout} color='primary'>
              Yes
            </Button>
            <Button onClick={() => setOpen(false)} color='primary'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Logout;
