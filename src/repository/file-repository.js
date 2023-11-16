const { Op } = require("sequelize");
const { File } = require("../models/index");

class FileRepository {
  async #getFileDatabyId(id) {
    try {
      const file = await File.findByPk(id);
      return file;
    } catch (error) {
      console.log("Error in file repository layer");
      throw { error };
    }
  }

  async createFile(data) {
    try {
      const fileResponse = await File.create(data);
      return fileResponse;
    } catch (error) {
      console.log("Error in file repository layer");
      throw { error };
    }
  }

  async getFiles(data) {
    try {
      let response, filterString;
      if (data.fileName) {
        filterString = data.fileName + "?";
        response = await File.findAll({
          where: {
            userId: data.userId,
            fileName: { [Op.regexp]: filterString },
          },
        });
      } else {
        response = await File.findAll({
          where: {
            userId: data.userId,
          },
        });
      }
      return response;
    } catch (error) {
      console.log("Error in file repository layer");
      throw { error };
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
      throw { error };
    }
  }

  async updateFile(data) {
    try {
      const fileData = await this.#getFileDatabyId(data.id);
      if (data.userId !== fileData.userId) {
        throw "you cannot update this file";
      }
      if (data.fileName) {
        fileData.fileName = data.fileName;
      }
      if (data.parentFolder) {
        fileData.parentFolder = data.parentFolder;
      }
      if (data.isPublic) {
        fileData.isPublic = data.isPublic;
      }
      await fileData.save();
      return fileData;
    } catch (error) {
      console.log("Error in file repository layer");
      throw { error };
    }
  }

  async getFileIfPublic(data) {
    try {
      const fileData = await File.findByPk(data.id);
      return fileData;
    } catch (error) {
      console.log("Error in file repository layer");
      throw { error };
    }
  }
}

module.exports = FileRepository;
