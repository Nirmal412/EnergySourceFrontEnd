import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const UserManagement = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editUserId, setEditUserId] = useState(null); 
  const [openEditDialog, setOpenEditDialog] = useState(false); 
  const [loading, setLoading] = useState(false);

  const role = useSelector((store) => store?.auth?.user?.userdata?.roleName);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getUsers");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getUsers");
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/createUser",
        { userName, email, password, roleId }
      );
      setUsers((prevUsers) => [...prevUsers, response.data.user]);
      setUserName("");
      setEmail("");
      setPassword("");
      setRoleId("");
      setError("");
    } catch (err) {
      setError("Failed to create user");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/deleteUser/${userId}`);
      setUsers(users.filter((user) => user.userId !== userId));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const handleEditOpen = (user) => {
    setUserName(user.user_name);
    setEmail(user.email);
    setRoleId(user.role_id);
    setEditUserId(user.user_id); 
    setOpenEditDialog(true); 
  };

  const handleEditClose = () => {
    setOpenEditDialog(false); 
    setUserName("");
    setEmail("");
    setPassword("");
    setRoleId("");
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8000/api/updateUser/${editUserId}`,
        { userName, email, password, roleId }
      );

      // Update the user in the state after successful update
    //   setUsers(users.map(user => (user?.user_id === editUserId ? response?.data?.user : user)));
    fetchUsers()
      handleEditClose();
    } catch (err) {
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 variant="h4" gutterBottom>
        User Management
      </h2>

      {/* Create User Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="space-between" direction="row">
          <Grid item xs={3}>
            <TextField
              label="User Name"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Role</InputLabel>
              <Select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                label="Role"
                required
              >
                {users.map((user) => (
                  <MenuItem key={user?.role_id} value={user?.role_id}>
                    {user?.role?.role_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create User
            </Button>
          </Grid>
        </Grid>
      </form>

      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user?.user_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user?.user_name || "N/A"}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.role?.role_name}</TableCell>
                  <TableCell>
                    <EditIcon variant="outlined" color="primary" onClick={() => handleEditOpen(user)}></EditIcon>
                    {role === "admin" && (<DeleteIcon
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(user?.user_id)}
                    />)}
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="User Name"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                label="Role"
                required
              >
                {users.map((user) => (
                  <MenuItem key={user?.role_id} value={user?.role_id}>
                    {user?.role?.role_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update User"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
