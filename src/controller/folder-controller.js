const FolderService = require("../services/folder-service");

const folderService = new FolderService();

const create = async (req, res) => {
  try {
    const folderData = {
      userId: req.body.userId,
      folderName: req.body.folderName,
    };
    req.body.parentFolder
      ? (folderData.parentFolder = req.body.parentFolder)
      : (folderData.parentFolder = "root");
    const folderResponse = await folderService.createFolder(folderData);
    return res.status(201).json({
      data: folderResponse,
      success: "true",
      message: "Folder Created",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "not able to create folder",
      error: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const folderData = {
      id: req.body.folderId,
      userId: req.body.userId,
    };
    req.body.folderName ? (folderData.folderName = req.body.folderName) : " ";
    req.body.parentFolder
      ? (folderData.parentFolder = req.body.parentFolder)
      : " ";
    const folderResponse = await folderService.updateFolder(folderData);
    return res.status(200).json({
      data: folderResponse,
      success: "true",
      message: "Folder Name Updated",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "not able to update folder name",
      error: error,
    });
  }
};

const getFolders = async (req, res) => {
  try {
    const folderResponse = await folderService.getAllFolders(req.body.userId);
    return res.status(200).json({
      data: folderResponse,
      success: "true",
      message: "Folders fetched Successlly",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: "false",
      message: "not able to get folders",
      error: error,
    });
  }
};

module.exports = {
  create,
  update,
  getFolders,
};
