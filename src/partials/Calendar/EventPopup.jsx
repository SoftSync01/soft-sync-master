// ModalComponent.js
import React from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';



const EventPopup = ({ open, handleClose, handleSave }) => {
    return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
              width: 400,
              outline: 'none',
            }}
          >
            <Typography id="simple-modal-title" variant="h6" component="h2" align="center">
              Add Event
            </Typography>
            <Box component="form" mt={2}>
              <TextField
                fullWidth
                margin="normal"
                id="event-name"
                label="Event Name"
                variant="outlined"
              />
              <TextField
                fullWidth
                margin="normal"
                id="event-date"
                label="Event Date"
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={handleSave} color="primary">
                Save Changes
              </Button>
            </Box>
          </Box>
        </Modal>
      );
};

export default EventPopup;