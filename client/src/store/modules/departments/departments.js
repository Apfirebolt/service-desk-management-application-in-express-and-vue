import * as types from "./department-types";
import events from "../../../plugins/events";
import interceptor from "../../../plugins/interceptor";

const state = {
  count: 0,
  department: null,
  departments: [],
};

const getters = {
  [types.GET_DEPARTMENT_COUNT]: (state) => state.count,
  [types.GET_DEPARTMENT_DETAIL]: (state) => state.department,
  [types.GET_ALL_DEPARTMENTS]: (state) => state.departments,
};

const mutations = {
  [types.SET_DEPARTMENT_DETAIL]: (state, payload) => {
    state.department = payload;
  },
  [types.SET_ALL_DEPARTMENTS]: (state, payload) => {
    state.departments = payload;
  },
  [types.SET_DEPARTMENT_COUNT]: (state, payload) => {
    state.count = payload;
  },
};

const actions = {
  // Create DEPARTMENT Action
  [types.CREATE_DEPARTMENT_ACTION]: ({ commit }, payload) => {
    const url = "api/departments";
    interceptor
      .post(url, payload)
      .then((response) => {
        if (response) {
          events.emit("add_toast", {
            content: "Department added successfully",
            type: "success",
          });
          interceptor.get(url).then((response) => {
            commit(types.SET_ALL_DEPARTMENTS, response);
            commit(types.SET_DEPARTMENT_COUNT, response.count);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Setting all DEPARTMENTS
  [types.GET_ALL_DEPARTMENTS_ACTION]: ({ commit }, urlParams) => {
    const url = "api/departments";
    interceptor
      .get(url, {
        params: urlParams,
      })
      .then((response) => {
        commit(types.SET_ALL_DEPARTMENTS, response);
        commit(types.SET_DEPARTMENT_COUNT, response.count);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Set single DEPARTMENT data
  [types.GET_DEPARTMENT_DETAIL_ACTION]: ({ commit }, id) => {
    const url = `api/departments/${id}`;
    interceptor
      .get(url)
      .then((response) => {
        commit(types.SET_DEPARTMENT_DETAIL, response.department);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Delete a DEPARTMENT
  [types.DELETE_DEPARTMENT_ACTION]: ({ commit }, name) => {
    const url = `api/departments/${name}`;
    interceptor
      .delete(url)
      .then((response) => {
        if (response) {
          events.emit("add_toast", {
            content: "Department deleted successfully",
            type: "success",
          });
          interceptor.get("api/departments").then((response) => {
            commit(types.SET_ALL_DEPARTMENTS, response);
            commit(types.SET_DEPARTMENT_COUNT, response.count);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Update a DEPARTMENT
  [types.UPDATE_DEPARTMENT_ACTION]: ({ commit }, payload) => {
    const url = `api/departments/${payload.name}`;
    interceptor
      .patch(url, payload)
      .then((response) => {
        if (response) {
          events.emit("add_toast", {
            content: "Department updated successfully",
            type: "success",
          });
          interceptor.get("api/departments").then((response) => {
            commit(types.SET_ALL_DEPARTMENTS, response);
            commit(types.SET_DEPARTMENT_COUNT, response.count);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
