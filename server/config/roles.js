module.exports = {
  SUPER_ADMIN: {
    institutions: ["create", "read", "update", "delete"],
    subscriptions: ["create", "read", "update"],
    dashboards: ["read"]
  },

  ADMIN: {
    students: ["create", "read", "update", "delete"],
    faculty: ["create", "read", "update"],
    attendance: ["create", "read"],
    fees: ["create", "read", "update"],
    dashboards: ["read"]
  },

  FACULTY: {
    attendance: ["create", "read"],
    exams: ["create", "read"],
    materials: ["create", "read"]
  },

  STUDENT: {
    attendance: ["read"],
    exams: ["read"],
    fees: ["read"]
  },

  PARENT: {
    attendance: ["read"],
    fees: ["read"]
  }
};
