const path = require('path');
const uuid = require('uuid').v1;
const fs = require('fs');
const { promisify } = require('util');

const mkdirPromise = promisify(fs.mkdir);

const _filesDirBuilder = async (fileName, itemId, itemType, itemClass) => {
  const pathWithoutStatic = path.join(itemClass, itemId, itemType);
  const dirPath = path.join(process.cwd(), 'static', pathWithoutStatic);

  const fileExtension = fileName.split('.').pop();
  const newFileName = `${uuid()}.${fileExtension}`;
  const finalPath = path.join(dirPath, newFileName);

  await mkdirPromise(dirPath, { recursive: true });

  const pathForDB = path.join(pathWithoutStatic, newFileName);

  return {
    finalPath,
    pathForDB
  };
};

const _filesSaver = async (fileArray, itemId, itemType, itemClass) => {
  const pathArray = [];

  for (const file of fileArray) {
    // eslint-disable-next-line no-await-in-loop
    const { finalPath, pathForDB } = await _filesDirBuilder(file.name, itemId, itemType, itemClass);

    // eslint-disable-next-line no-await-in-loop
    await file.mv(finalPath);

    pathArray.push({ pathForDB, uploadTime: new Date().toLocaleString() });
  }
  return pathArray;
};

module.exports = {
  _filesDirBuilder,
  _filesSaver
};
