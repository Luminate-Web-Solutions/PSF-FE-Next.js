import axios from 'axios';

const API_URL = 'http://localhost:4000/api/teams';

export const getTeams = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const createTeam = async (teamData) => {
  try {
    const response = await axios.post(API_URL, teamData);
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

export const updateTeam = async (id, teamData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, teamData);
    return response.data;
  } catch (error) {
    console.error('Error updating team:', error);
    throw error;
  }
};

export const deleteTeam = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting team:', error);
    throw error;
  }
};

export const createTeamMember = async (teamId, memberData) => {
  try {
    const formData = new FormData();
    formData.append('name', memberData.name);
    formData.append('role', memberData.role);
    if (memberData.image) {
      formData.append('image', memberData.image);
    }

    const response = await axios.post(`${API_URL}/${teamId}/members`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating team member:', error);
    throw error;
  }
};

export const updateTeamMember = async (teamId, memberId, memberData) => {
  try {
    const formData = new FormData();
    formData.append('name', memberData.name);
    formData.append('role', memberData.role);
    if (memberData.image) {
      formData.append('image', memberData.image);
    }

    const response = await axios.put(`${API_URL}/${teamId}/members/${memberId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating team member:', error);
    throw error;
  }
};

export const deleteTeamMember = async (teamId, memberId) => {
  try {
    await axios.delete(`${API_URL}/${teamId}/members/${memberId}`);
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }
};