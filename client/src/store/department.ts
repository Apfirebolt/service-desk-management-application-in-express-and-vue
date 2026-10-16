import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from './auth';

// Define Department interface
export interface Department {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Define Paginated Response interface matching your backend
export interface DepartmentPaginatedResponse {
  data: Department[];
  total: number;
  success: boolean;
  itemsPerPage: number;
  startPage: number;
  lastPage: number;
}

export const useDepartmentStore = defineStore('department', () => {
  // State
  const departments = ref<Department[]>([]);
  const currentDepartment = ref<Department | null>(null);
  const totalDepartments = ref<number>(0);
  const currentPage = ref<number>(1);
  const lastPage = ref<number>(1);
  const itemsPerPage = ref<number>(5);
  
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Helper to attach authorization headers if needed for admin actions
  const getAuthHeaders = () => {
    const authStore = useAuthStore();
    return {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    };
  };

  // Actions

  // 1. Get All Departments (with pagination)
  const fetchDepartments = async (page: number = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<DepartmentPaginatedResponse>(`/api/departments?page=${page}`);
      const resData = response.data;

      departments.value = resData.data;
      totalDepartments.value = resData.total;
      currentPage.value = resData.startPage;
      lastPage.value = resData.lastPage;
      itemsPerPage.value = resData.itemsPerPage;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch departments';
    } finally {
      loading.value = false;
    }
  };

  // 2. Get Single Department by Name
  const fetchDepartmentByName = async (name: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<Department>(`/api/departments/${encodeURIComponent(name)}`);
      currentDepartment.value = response.data;
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Department not found';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 3. Create Department (Admin)
  const createDepartment = async (departmentData: { name: string; description?: string }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post<Department>('/api/departments', departmentData, getAuthHeaders());
      // Refresh list or push new entry
      departments.value.unshift(response.data);
      totalDepartments.value += 1;
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create department';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 4. Update Department (Admin)
  const updateDepartment = async (name: string, updateData: { name?: string; description?: string }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.patch<Department>(`/api/departments/${encodeURIComponent(name)}`, updateData, getAuthHeaders());
      const updated = response.data;
      
      // Update local state array
      const index = departments.value.findIndex((d) => d.name === name);
      if (index !== -1) {
        departments.value[index] = updated;
      }
      if (currentDepartment.value?.name === name) {
        currentDepartment.value = updated;
      }
      return updated;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update department';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 5. Delete Department (Admin)
  const deleteDepartment = async (name: string) => {
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`/api/departments/${encodeURIComponent(name)}`, getAuthHeaders());
      
      // Remove from local list
      departments.value = departments.value.filter((d) => d.name !== name);
      totalDepartments.value -= 1;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete department';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    departments,
    currentDepartment,
    totalDepartments,
    currentPage,
    lastPage,
    itemsPerPage,
    loading,
    error,
    fetchDepartments,
    fetchDepartmentByName,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
});