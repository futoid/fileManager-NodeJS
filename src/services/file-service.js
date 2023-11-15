const FileRepository = require("../repository/file-repository");

class FileService {
  constructor() {
    this.fileRepository = new FileRepository();
  }

  async createFile(data) {
    try {
      const fileResponse = await this.fileRepository.createFile(data);
      return fileResponse;
    } catch (error) {
      console.log("error in file service layer");
      throw { error };
    }
  }

  async getFiles(data) {
    try {
      const fileResponse = await this.fileRepository.getFiles(data);
      return fileResponse;
    } catch (error) {
      console.log("error in file service layer");
      throw { error };
    }
  }

  async deleteFile(data) {
    try {
      await this.fileRepository.deleteFile(data);
      return true;
    } catch (error) {
      console.log("error in file service layer");
      throw { error };
    }
  }
}

module.exports = FileService;
