const { User } = require("../models/index");

class UserRepository {
  async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (err) {
      console.log("Error in user repository layer");
      throw { err };
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (err) {
      console.log("error in repository layer");
      throw { err };
    }
  }

  async getUserByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (error) {
      console.log("error in repository layer");
      throw { err };
    }
  }
}

module.exports = UserRepository;
