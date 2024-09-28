// MongoDB Playground
use('HRIS_Training_System');

// สร้าง collection
db.createCollection('roles', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['role_id', 'name', 'description', 'permissions'],
      properties: {
        role_id: {
          bsonType: 'int',
          description: 'Role unique ID'
        },
        name: {
          bsonType: 'string',
          description: 'Role name'
        },
        description: {
          bsonType: 'string',
          description: 'Role description'
        },
        permissions: {
          bsonType: 'array',
          items: {
            bsonType: 'string',
            description: 'Permissions associated with this role'
          }
        }
      }
    }
  }
});

db.createCollection('positions', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['position_id', 'name', 'description'],
      properties: {
        position_id: {
          bsonType: 'int',
          description: 'Position unique ID'
        },
        name: {
          bsonType: 'string',
          description: 'Position name'
        },
        description: {
          bsonType: 'string',
          description: 'Position description'
        }
      }
    }
  }
});

db.createCollection('departments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['department_id', 'name', 'description'],
      properties: {
        department_id: {
          bsonType: 'int',
          description: 'Department unique ID'
        },
        name: {
          bsonType: 'string',
          description: 'Department name'
        },
        description: {
          bsonType: 'string',
          description: 'Department description'
        }
      }
    }
  }
});

db.createCollection('employees', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['employee_id', 'first_name', 'last_name', 'email', 'role', 'position', 'department', 'date_joined', 'status'],
      properties: {
        employee_id: {
          bsonType: 'int',
          description: 'Employee unique ID'
        },
        first_name: {
          bsonType: 'string',
          description: 'First name of the employee'
        },
        last_name: {
          bsonType: 'string',
          description: 'Last name of the employee'
        },
        email: {
          bsonType: 'string',
          pattern: '^.+@.+$',
          description: 'Valid email address'
        },
        phone_number: {
          bsonType: 'string',
          description: 'Phone number of employee'
        },
        role: {
          bsonType: 'objectId',
          description: 'Reference to the role of the employee'
        },
        position: {
          bsonType: 'objectId',
          description: 'Reference to the position of the employee'
        },
        department: {
          bsonType: 'objectId',
          description: 'Reference to the department of the employee'
        },
        date_joined: {
          bsonType: 'date',
          description: 'Date when the employee joined the company'
        },
        status: {
          enum: ['active', 'inactive', 'terminated'],
          description: 'Employment status'
        }
      }
    }
  }
});

db.createCollection('auth', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['user_id', 'email', 'hashed_password'],
      properties: {
        user_id: {
          bsonType: 'objectId',
          description: 'Reference to the employee user'
        },
        email: {
          bsonType: 'string',
          pattern: '^.+@.+$',
          description: 'Valid email address'
        },
        hashed_password: {
          bsonType: 'string',
          description: 'Hashed password for authentication'
        }
      }
    }
  }
});

db.createCollection('training_groups', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['group_id', 'name', 'description'],
      properties: {
        group_id: {
          bsonType: 'int',
          description: 'Training group unique ID'
        },
        name: {
          bsonType: 'string',
          description: 'Group name'
        },
        description: {
          bsonType: 'string',
          description: 'Group description'
        }
      }
    }
  }
});

db.createCollection('training_courses', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['course_id', 'course_group', 'name', 'description', 'instructor', 'date_start', 'date_end', 'duration', 'status'],
      properties: {
        course_id: {
          bsonType: 'int',
          description: 'Training course unique ID'
        },
        course_group: {
          bsonType: 'objectId',
          description: 'Reference to the training group'
        },
        name: {
          bsonType: 'string',
          description: 'Training course name'
        },
        description: {
          bsonType: 'string',
          description: 'Course description'
        },
        instructor: {
          bsonType: 'objectId',
          description: 'Reference to the instructor of the course'
        },
        date_start: {
          bsonType: 'date',
          description: 'Start date of the course'
        },
        date_end: {
          bsonType: 'date',
          description: 'End date of the course'
        },
        duration: {
          bsonType: 'int',
          description: 'Duration of the course in days'
        },
        status: {
          enum: ['planned', 'ongoing', 'completed', 'canceled'],
          description: 'Course status'
        }
      }
    }
  }
});

db.createCollection('enrollments', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['enrollment_id', 'course', 'student', 'enrollment_date', 'status'],
      properties: {
        enrollment_id: {
          bsonType: 'int',
          description: 'Enrollment unique ID'
        },
        course: {
          bsonType: 'objectId',
          description: 'Reference to the training course'
        },
        student: {
          bsonType: 'objectId',
          description: 'Reference to the employee'
        },
        enrollment_date: {
          bsonType: 'date',
          description: 'Date of enrollment'
        },
        status: {
          enum: ['enrolled', 'in-progress', 'completed', 'failed'],
          description: 'Enrollment status'
        }
      }
    }
  }
});

db.createCollection('action_types', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['action_type_id', 'name', 'description'],
      properties: {
        action_type_id: {
          bsonType: 'int',
          description: 'Action type unique ID'
        },
        name: {
          bsonType: 'string',
          description: 'Name of the action'
        },
        description: {
          bsonType: 'string',
          description: 'Action description'
        }
      }
    }
  }
});

db.createCollection('transactions', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['transaction_id', 'action_type', 'user', 'timestamp'],
      properties: {
        transaction_id: {
          bsonType: 'int',
          description: 'Transaction unique ID'
        },
        action_type: {
          bsonType: 'objectId',
          description: 'Reference to the action type'
        },
        user: {
          bsonType: 'objectId',
          description: 'Reference to the user who performed the action'
        },
        timestamp: {
          bsonType: 'date',
          description: 'Timestamp of the action'
        }
      }
    }
  }
});

db.createCollection('report_types', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['report_type_id', 'name', 'description'],
      properties: {
        report_type_id: {
          bsonType: 'int',
          description: 'Report type unique ID'
        },
        name: {
          bsonType: 'string',
          description: 'Name of the report type'
        },
        description: {
          bsonType: 'string',
          description: 'Description of the report type'
        }
      }
    }
  }
});

db.createCollection('reports', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['report_id', 'report_type', 'report_date', 'report_data'],
      properties: {
        report_id: {
          bsonType: 'int',
          description: 'Report unique ID'
        },
        report_type: {
          bsonType: 'objectId',
          description: 'Reference to the report type'
        },
        report_date: {
          bsonType: 'date',
          description: 'Date of the report'
        },
        report_data: {
          bsonType: 'string',
          description: 'Data associated with the report'
        }
      }
    }
  }
});

db.createCollection('achievements', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['achievement_id', 'name', 'description'],
      properties: {
        achievement_id: {
          bsonType: 'int',
          description: 'Achievement unique ID'
        },
        name: {
          bsonType: 'string',
          description: 'Name of the achievement'
        },
        description: {
          bsonType: 'string',
          description: 'Description of the achievement'
        }
      }
    }
  }
});

db.createCollection('hall_of_fame', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['employee_id', 'achievements'],
      properties: {
        employee_id: {
          bsonType: 'objectId',
          description: 'Reference to the employee'
        },
        achievements: {
          bsonType: 'objectId',
          description: 'Reference to the achievements'
        }
      }
    }
  }
});
  