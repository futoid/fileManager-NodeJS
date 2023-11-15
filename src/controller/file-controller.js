const FileService = require("../services/file-service");

const fileService = new FileService();

const create = async (req, res) => {
  try {
    const fileData = {
      userId: req.body.userId,
      fileName: req.body.fileName,
    };
    req.body.parentFolder
      ? (fileData.parentFolder = req.body.parentFolder)
      : (fileData.parentFolder = "root");
    const data = await fileService.createFile(fileData);
    return res.status(201).json({
      data: data,
      success: "true",
      message: "new file created",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "not able to create file",
      error: error,
    });
  }
};

const getFiles = async (req, res) => {
  try {
    const data = {
      userId: req.body.userId,
      parentFolder: req.body.parentFolder,
    };
    const response = await fileService.getFiles(data);
    return res.status(200).json({
      data: response,
      success: "true",
      message: "files fetched successfully",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "not able to fetch files",
      error: error,
    });
  }
};

const deleteFile = async (req, res) => {
  try {
    const data = {
      fileId: req.body.fileId,
      userId: req.body.userId,
    };
    await fileService.deleteFile(data);
    return res.status(200).json({
      data: true,
      success: "true",
      message: "file removed",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "not able to delete file",
      error: error,
    });
  }
};

module.exports = {
  create,
  getFiles,
  deleteFile,
};
