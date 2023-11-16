const { File } = require("../models/index");

class FileRepository {
  async #getFileDatabyId(id) {
    try {
      const file = await File.findByPk(id);
      return file;
    } catch (error) {
      console.log("Error in file repository layer");
      throw { err };
    }
  }

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

  async updateFile(data) {
    try {
      const fileData = await this.#getFileDatabyId(data.id);
      if (data.fileName) {
        fileData.fileName = data.fileName;
      }
      if (data.parentFolder) {
        fileData.parentFolder = data.parentFolder;
      }
      await fileData.save();
      return fileData;
    } catch (error) {
      console.log("Error in folder repository layer");
      throw { err };
    }
  }
}

module.exports = FileRepository;
