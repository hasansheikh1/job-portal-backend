const { createUser } = require('../controller/userCtrl');
const User = require('../models/userModel');

jest.mock('../models/userModel');

describe('User Controller - createUser', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { firstname: 'Test', email: 'test@example.com', password: 'password123' } };
    res = { json: jest.fn() };
    User.findOne.mockClear();
    User.create.mockClear();
  });

  it('should create a new user if email does not exist', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ _id: '1', ...req.body });

    await createUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(User.create).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ _id: '1', ...req.body });
  });

  it('should throw an error if user already exists', async () => {
    User.findOne.mockResolvedValue({ _id: '1', ...req.body });
    let error;
    try {
      await createUser(req, res);
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.message).toBe('User Already Exists');
  });
}); 