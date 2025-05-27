'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Box, 
  Typography, 
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Alert,
  Snackbar
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default function UserManagement() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    password: '',
    role: 'team administrator'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      if (!token) {
        // router.push('/admin/login');
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/users');
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch users');
      if (err.response?.status === 401) {
        // router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/dashboard/usermanagement');
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if (editMode && currentUserId) {
        await api.put(`/users/${currentUserId}`, formData);
        setSuccess('User updated successfully!');
      } else {
        await api.post('/users', formData);
        setSuccess('User created successfully!');
      }

      setSnackbarOpen(true);
      fetchUsers();
      handleCloseDialog();
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Operation failed');
      if (err.response?.status === 401) {
        router.push('/dashboard/usermanagement');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      emailId: user.emailId,
      password: '',
      role: user.role
    });
    setCurrentUserId(user.id);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/dashboard/usermanagement');
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await api.delete(`/users/${userId}`);
      setSuccess('User deleted successfully!');
      setSnackbarOpen(true);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setEditMode(false);
    resetForm();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError('');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      emailId: '',
      password: '',
      role: 'team administrator'
    });
    setCurrentUserId(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error || success}
        </Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
          disabled={loading}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.emailId}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton 
                        onClick={() => handleEdit(user)}
                        disabled={loading}
                      >
                        <Edit color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton 
                        onClick={() => handleDelete(user.id)}
                        disabled={loading}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editMode ? 'Edit User' : 'Create New User'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
            />
            
            <TextField
              fullWidth
              label="Email Address"
              name="emailId"
              type="email"
              value={formData.emailId}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading || editMode}
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required={!editMode}
              disabled={loading}
              helperText={editMode ? "Leave blank to keep current password" : ""}
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
                required
                disabled={loading}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="president">President</MenuItem>
                <MenuItem value="vertical administrator">Vertical Administrator</MenuItem>
                <MenuItem value="team administrator">Team Administrator</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : editMode ? (
              'Update'
            ) : (
              'Create'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}