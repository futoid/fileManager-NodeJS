const { File } = require("../models/index");

class FileRepository {
  async createFile(data) {
    try {
      const fileResponse = await File.create(data);
      return fileResponse;
    } catch (error) {
      console.log("Error in file repository layer");
      throw { err };
    }
  }

  async getFiles(data) {
    try {
      const response = await File.findAll({
        where: {
          userId: data.userId,
          parentFolder: data.parentFolder,
        },
      });
      return response;
    } catch (error) {
      console.log("Error in file repository layer");
      throw { err };
    }
  }

  async deleteFile(data) {
    try {
      await File.destroy({
        where: {
          id: data.fileId,
          userId: data.userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Error in file repository layer");
      throw { err };
    }
  }
}

module.exports = FileRepository;
