import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Button, Box, Typography, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

export default function ProductionTable() {
  const [productions, setProductions] = useState([]);
  const [energySources, setEnergySources] = useState([]); 
  const [newProduction, setNewProduction] = useState({
    energy_source_id: '',
    date: '',
    production: '',
  });

  const [editProduction, setEditProduction] = useState(null); 
  const [openDialog, setOpenDialog] = useState(false); 
  const role = useSelector((store)=>store?.auth?.user?.userdata?.roleName)

  useEffect(() => {
    fetchProductions();
    fetchEnergySources();
  }, []);

  const fetchProductions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getProduction');
      console.log(response,"responce in for frtch production ")
      setProductions(response.data.productions);
    } catch (error) {
      console.error('Failed to fetch productions', error);
    }
  };

  const fetchEnergySources = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getAllEnergySources');
      console.log(response,"responce====>")
      setEnergySources(response.data.energySources);
    } catch (error) {
      console.error('Failed to fetch energy sources', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAdd = async () => {
    if (newProduction.energy_source_id && newProduction.date && newProduction.production) {
      try {
        const selectedEnergySource = energySources.find(source => source.id === newProduction.energy_source_id);
        
        if (selectedEnergySource) {
          const response = await axios.post('http://localhost:8000/api/createProduction', {
            ...newProduction,
            energy_source_name: selectedEnergySource.name, 
          });
  
          // setProductions((prev) => [
          //   ...prev,
          //   { 
          //     ...response.data, 
          //     energy_source_name: selectedEnergySource.name, 
          //   },
          // ]);
          fetchProductions();
          setNewProduction({ energy_source_id: '', date: '', production: '' });
        }
      } catch (error) {
        console.error('Failed to add new production', error);
      }
    }
  };
  
  

  const handleEditOpen = (prod) => {
    setEditProduction({ ...prod });  
    setOpenDialog(true);
  };
  

  const handleEditClose = () => {
    setOpenDialog(false);
    setEditProduction(null);
  };

  const handleEditSave = async (id) => {
    if (editProduction) {
      try {
        await axios.put(`http://localhost:8000/api/updateProduction/${editProduction.id}`, editProduction);
        fetchProductions();
        handleEditClose();
      } catch (error) {
        console.error('Failed to update production', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id,"id===>")
      await axios.delete(`http://localhost:8000/api/deleteProduction/${id}`);
      // setProductions((prev) => prev.filter((prod) => prod.production_id !== id));
      fetchProductions();
    } catch (error) {
      console.error('Failed to delete production', error);
    }
  };

  const getEnergySourceName = (energy_source_id) => {
    const source = energySources.find((source) => source.id === energy_source_id);
    return source ? source.name : '';
  };

  const validProductions = productions.filter(prod => energySources.some(source => source.id === prod.energy_source_id));

  return (
    <Box>
      <h2 variant="h4" gutterBottom>
        Production
      </h2>
      <Box display="flex" alignItems="center" width={"70%"}  gap={2} mb={2}>
      <FormControl fullWidth variant="outlined">
          <InputLabel>Energy Source</InputLabel>
          <Select
            label="Energy Source"
            name="energy_source_id"
            value={newProduction.energy_source_id}
            onChange={handleChange}
          >
            {energySources.map((source) => (
              <MenuItem key={source.id} value={source.id}>
                {source.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Date"
          name="date"
          value={newProduction.date}
          onChange={handleChange}
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Production"
          name="production"
          value={newProduction.production}
          onChange={handleChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="production table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Energy Source</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Production</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validProductions.map((prod, index) => (
              <TableRow key={prod.production_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{getEnergySourceName(prod.energy_source_id)}</TableCell>
                <TableCell>{prod.date}</TableCell>
                <TableCell>{prod.production}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEditOpen(prod)}>
                    <EditIcon />
                  </IconButton>
                  {role === "admin" && (<IconButton color="secondary" onClick={() => handleDelete(prod.id)}>
                    <DeleteIcon />
                  </IconButton>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Production</DialogTitle>
        <DialogContent>
          <Select
            label="Energy Source"
            name="energy_source_id"
            value={editProduction?.energy_source_id || ''}
            onChange={(e) => setEditProduction({ ...editProduction, energy_source_id: e.target.value })}
            fullWidth
          >
            {energySources.map((source) => (
              <MenuItem key={source.id} value={source.id}>
                {source.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Date"
            name="date"
            value={editProduction?.date || ''}
            onChange={(e) => setEditProduction({ ...editProduction, date: e.target.value })}
            variant="outlined"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Production"
            name="production"
            value={editProduction?.production || ''}
            onChange={(e) => setEditProduction({ ...editProduction, production: e.target.value })}
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
