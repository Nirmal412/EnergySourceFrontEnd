import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

const EnergySourceTable = () => {
  const [energySources, setEnergySources] = useState([]);
  const [newEnergySource, setNewEnergySource] = useState({
    name: '',
    type: '',
    capacity: '',
  });
  const [editEnergySource, setEditEnergySource] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const role = useSelector((store)=>store?.auth?.user?.userdata?.roleName)

  useEffect(() => {
    fetchEnergySources();
  }, []);

  const fetchEnergySources = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getAllEnergySources');
      setEnergySources(response.data.energySources);
    } catch (error) {
      console.error('Failed to fetch energy sources', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEnergySource((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    if (newEnergySource.name && newEnergySource.type && newEnergySource.capacity) {
      try {
        const response = await axios.post('http://localhost:8000/api/createEnergySource', newEnergySource);
        // setEnergySources((prev) => [...prev, response.data]);
        fetchEnergySources()
        setNewEnergySource({ name: '', type: '', capacity: '' });
      } catch (error) {
        console.error('Failed to add new energy source', error);
      }
    }
  };

  const handleEditClick = (source) => {
    setEditEnergySource({ ...source });
    setOpenDialog(true); 
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEnergySource((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    if (editEnergySource) {
      try {
        await axios.put(`http://localhost:8000/api/updateEnergySource/${editEnergySource.id}`, editEnergySource);
        fetchEnergySources();
        setOpenDialog(false);
      } catch (error) {
        console.error('Failed to update energy source', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/deleteEnergySource/${id}`);
      setEnergySources((prev) => prev.filter((source) => source.id !== id));
    } catch (error) {
      console.error('Failed to delete energy source', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <h2 variant="h4" gutterBottom>
        Energy Source Management
      </h2>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          label="Name"
          name="name"
          value={newEnergySource.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Type"
          name="type"
          value={newEnergySource.type}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Capacity"
          name="capacity"
          value={newEnergySource.capacity}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="energy source table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {energySources.map((source, index) => (
              <TableRow key={source.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{source.name}</TableCell>
                <TableCell>{source.type}</TableCell>
                <TableCell>{source.capacity}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEditClick(source)}>
                    <EditIcon />
                  </IconButton>
                  {role === "admin" && (<IconButton color="secondary" onClick={() => handleDelete(source.id)}>
                    <DeleteIcon />
                  </IconButton>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Energy Source</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={editEnergySource?.name || ''}
            onChange={handleEditChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Type"
            name="type"
            value={editEnergySource?.type || ''}
            onChange={handleEditChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Capacity"
            name="capacity"
            value={editEnergySource?.capacity || ''}
            onChange={handleEditChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EnergySourceTable;
