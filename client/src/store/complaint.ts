import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from './auth';

// Define Complaint interface
export interface Complaint {
  _id: string;
  title: string;
  description: string;
  department: string;
  device?: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Closed';
  createdBy: string | { _id: string; firstName: string; lastName: string };
  managedBy?: string | { _id: string; firstName: string; lastName: string };
  createdAt?: string;
  updatedAt?: string;
}

// Define Paginated Response interface matching your backend
export interface ComplaintPaginatedResponse {
  data: Complaint[];
  total: number;
  success: boolean;
  itemsPerPage: number;
  startPage: number;
  lastPage: number;
}

export const useComplaintStore = defineStore('complaint', () => {
  // State
  const complaints = ref<Complaint[]>([]);
  const myComplaints = ref<Complaint[]>([]);
  const assignedComplaints = ref<Complaint[]>([]);
  const currentComplaint = ref<Complaint | null>(null);

  // Pagination states
  const totalComplaints = ref<number>(0);
  const currentPage = ref<number>(1);
  const lastPage = ref<number>(1);
  const itemsPerPage = ref<number>(5);

  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Helper to attach authorization headers
  const getAuthHeaders = () => {
    const authStore = useAuthStore();
    return {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    };
  };

  // Actions

  // 1. Get All Complaints (Paginated)
  const fetchComplaints = async (page: number = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<ComplaintPaginatedResponse>(`/api/complaints?page=${page}`);
      const resData = response.data;

      complaints.value = resData.data;
      totalComplaints.value = resData.total;
      currentPage.value = resData.startPage;
      lastPage.value = resData.lastPage;
      itemsPerPage.value = resData.itemsPerPage;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch complaints';
    } finally {
      loading.value = false;
    }
  };

  // 2. Get Logged-in User's Complaints
  const fetchMyComplaints = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<Complaint[]>('/api/complaints/my-complaints', getAuthHeaders());
      myComplaints.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch your complaints';
    } finally {
      loading.value = false;
    }
  };

  // 3. Get Assigned Complaints (Staff/Admin)
  const fetchAssignedComplaints = async (page: number = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<ComplaintPaginatedResponse>(`/api/complaints/assigned-complaints?page=${page}`, getAuthHeaders());
      const resData = response.data;

      assignedComplaints.value = resData.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch assigned complaints';
    } finally {
      loading.value = false;
    }
  };

  // 4. Get Single Complaint by ID
  const fetchComplaintById = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<Complaint>(`/api/complaints/${id}`, getAuthHeaders());
      currentComplaint.value = response.data;
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Complaint not found';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 5. Create Complaint
  const createComplaint = async (complaintData: {
    title: string;
    description: string;
    department: string;
    device?: string;
    status?: string;
    managedBy?: string;
  }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post<Complaint>('/api/complaints', complaintData, getAuthHeaders());
      complaints.value.unshift(response.data);
      myComplaints.value.unshift(response.data);
      totalComplaints.value += 1;
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create complaint';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 6. Update Complaint
  const updateComplaint = async (id: string, updateData: Partial<Complaint>) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.patch<Complaint>(`/api/complaints/${id}`, updateData, getAuthHeaders());
      const updated = response.data;

      // Update local state arrays
      const index = complaints.value.findIndex((c) => c._id === id);
      if (index !== -1) complaints.value[index] = updated;

      const myIndex = myComplaints.value.findIndex((c) => c._id === id);
      if (myIndex !== -1) myComplaints.value[myIndex] = updated;

      if (currentComplaint.value?._id === id) {
        currentComplaint.value = updated;
      }

      return updated;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update complaint';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 7. Delete Complaint
  const deleteComplaint = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`/api/complaints/${id}`, getAuthHeaders());

      complaints.value = complaints.value.filter((c) => c._id !== id);
      myComplaints.value = myComplaints.value.filter((c) => c._id !== id);
      assignedComplaints.value = assignedComplaints.value.filter((c) => c._id !== id);
      totalComplaints.value -= 1;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete complaint';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    complaints,
    myComplaints,
    assignedComplaints,
    currentComplaint,
    totalComplaints,
    currentPage,
    lastPage,
    itemsPerPage,
    loading,
    error,
    fetchComplaints,
    fetchMyComplaints,
    fetchAssignedComplaints,
    fetchComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint,
  };
});