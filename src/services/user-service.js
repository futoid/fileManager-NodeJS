const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (error) {
      console.log("error in service layer");
      throw { error };
    }
  }

  async signIn(email, password) {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        console.log("No user exist with this email try signUp");
        throw { error: "No user found" };
      }
      const passwordMatch = this.verifyPassword(
        password,
        user.dataValues.password
      );
      if (!passwordMatch) {
        console.log("Wrong Password");
        throw { error: "Wrong Password" };
      }
      const userToken = this.createToken({
        email: user.dataValues.email,
        id: user.dataValues.id,
      });
      return userToken;
    } catch (error) {
      console.log("Error while signing in");
      throw { error };
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid Token" };
      }
      const user = await this.userRepository.getUserById(response.id);
      if (!user) {
        throw { error: "No user found" };
      }
      return response;
    } catch (error) {
      console.log("Error while authenticating");
      throw { error };
    }
  }

  async getCurrentUser(token) {
    try {
      const user = this.verifyToken(token);
      return user;
    } catch (error) {
      console.log("Not able to get user in user service");
      throw { error };
    }
  }

  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return token;
    } catch (error) {
      console.log("Error in token creation");
      throw { error };
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Error in token verification");
      throw { error };
    }
  }

  verifyPassword(userPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userPassword, encryptedPassword);
    } catch (error) {
      console.log("Error in verfication of password");
      throw { error };
    }
  }
}

module.exports = UserService;
