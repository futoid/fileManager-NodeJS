const { Folder } = require("../models/index");

class FolderRepository {
  async createFolder(data) {
    try {
      const folderResponse = await Folder.create(data);
      return folderResponse;
    } catch (err) {
      console.log("Error in folder repository layer");
      throw { err };
    }
  }

  async getAllFoldersByUserId(id) {
    try {
      const data = await Folder.findAll({
        where: {
          userId: id,
        },
      });
      return data;
    } catch (err) {
      console.log("Error in folder repository layer");
      throw { err };
    }
  }

  async #getFolderById(id) {
    try {
      const folder = await Folder.findByPk(id);
      return folder;
    } catch (err) {
      console.log("Error in folder repository layer");
      throw { err };
    }
  }

  async updateFolder(data) {
    try {
      const folderData = await this.#getFolderById(data.id);
      if (data.folderName) {
        folderData.folderName = data.folderName;
      }
      if (data.parentFolder) {
        folderData.parentFolder = data.parentFolder;
      }
      await folderData.save();
      return folderData;
    } catch (err) {
      console.log("Error in folder repository layer");
      throw { err };
    }
  }
}

module.exports = FolderRepository;
