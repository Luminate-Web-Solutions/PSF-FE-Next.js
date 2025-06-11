'use client'

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import TeamCard from '../../components/team/TeamCard';
import TeamForm from '../../components/team/TeamForm';
import MemberForm from '../../components/team/MemberForm';
import { 
  getTeams, 
  createTeam, 
  updateTeam, 
  deleteTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../../services/teamService.js';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTeams();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError('Failed to load teams. Please check if the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTeamSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      if (currentTeamId) {
        await updateTeam(currentTeamId, formData);
      } else {
        await createTeam(formData);
      }
      await fetchTeams();
      setIsTeamModalOpen(false);
    } catch (error) {
      console.error('Error saving team:', error);
      setError(error.response?.data?.message || 'Failed to save team. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm('Are you sure you want to delete this team and all its members?')) return;
    
    setIsLoading(true);
    setError(null);
    try {
      await deleteTeam(teamId);
      await fetchTeams();
    } catch (error) {
      console.error('Error deleting team:', error);
      setError('Failed to delete team. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMemberSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    if (!currentTeamId) {
      setError('No team selected for adding member');
      setIsLoading(false);
      return;
    }

    try {
      if (currentMember?.id) {
        await updateTeamMember(currentTeamId, currentMember.id, formData);
      } else {
        await createTeamMember(currentTeamId, formData);
      }
      await fetchTeams();
      setIsMemberModalOpen(false);
    } catch (error) {
      console.error('Error saving member:', error);
      setError(error.response?.data?.message || 'Failed to save member. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMember = async (teamId, memberId) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    
    setIsLoading(true);
    setError(null);
    try {
      await deleteTeamMember(teamId, memberId);
      await fetchTeams();
    } catch (error) {
      console.error('Error deleting member:', error);
      setError('Failed to delete member. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Teams</h1>
        <button
          onClick={() => {
            setCurrentTeamId(null);
            setIsTeamModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#0d2137] hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 w-full md:w-auto justify-center"
          disabled={isLoading}
        >
          <Plus size={18} />
          Add New Team
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {/* Teams List */}
      {isLoading && teams.length === 0 ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No teams found. Create your first team to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onEditTeam={() => {
                setCurrentTeamId(team.id);
                setIsTeamModalOpen(true);
              }}
              onDeleteTeam={() => handleDeleteTeam(team.id)}
              onAddMember={() => {
                setCurrentTeamId(team.id);
                setCurrentMember(null);
                setIsMemberModalOpen(true);
              }}
              onEditMember={(member) => {
                setCurrentTeamId(team.id);
                setCurrentMember(member);
                setIsMemberModalOpen(true);
              }}
              onDeleteMember={(memberId) => handleDeleteMember(team.id, memberId)}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}

      {/* Team Modal */}
      {isTeamModalOpen && (
        <TeamForm
          team={currentTeamId ? teams.find(t => t.id === currentTeamId) : null}
          onSubmit={handleTeamSubmit}
          onClose={() => {
            setIsTeamModalOpen(false);
            setError(null);
          }}
          isLoading={isLoading}
        />
      )}

      {/* Member Modal */}
      {isMemberModalOpen && (
        <MemberForm
          member={currentMember}
          onSubmit={handleMemberSubmit}
          onClose={() => {
            setIsMemberModalOpen(false);
            setError(null);
          }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default TeamsPage;