const FolderRepository = require("../repository/folder-repository");

class FolderService {
  constructor() {
    this.folderRespository = new FolderRepository();
  }

  async createFolder(data) {
    try {
      const folderResponse = await this.folderRespository.createFolder(data);
      return folderResponse;
    } catch (error) {
      console.log("error in folder service layer");
      throw { error };
    }
  }

  async updateFolder(data) {
    try {
      const folderResponse = await this.folderRespository.updateFolder(data);
      return folderResponse;
    } catch (error) {
      console.log("error in folder service layer");
      throw { error };
    }
  }

  async getAllFolders(id) {
    try {
      const folderResponse = await this.folderRespository.getAllFoldersByUserId(
        id
      );
      return folderResponse;
    } catch (error) {
      console.log("error in folder service layer");
      throw { error };
    }
  }
}

module.exports = FolderService;
