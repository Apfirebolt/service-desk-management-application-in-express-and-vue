import bcrypt from 'bcryptjs'

const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john_doe@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    firstName: 'Mac',
    lastName: 'Connors',
    email: 'mac_connors@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
]

export default users
