/*import { CONSTANTS } from "../constants/constants.js";

const worldName = CONSTANTS.worldName;*/
import {settings} from "@typhonjs-config/eslint-config/shared/default.js";

const moduleDataDirectory = "knowledge-recalled-data";
export const ORIGIN_FOLDER = 'data';

export const listFiles = async (targetDirectory, sourceDirectory, depositArray) =>
{
   return await FilePicker.browse(targetDirectory, sourceDirectory).then((picker) =>
   {
      for (const file of picker.files)
      {
         depositArray.push(file);
      }
   });
};

/**
 *
 * @param {string} targetDirectory - The directory to search for files and directories, this is typically data.
 *
 *@param {string} sourceDirectory - The sub-directory you wish to search for files and any subsequent directories should be searched together with a forward slash between each.
 *
 * @param {object} fileName - The name of the file you wish to read, including the file extension.
 *
 * @returns {Promise} - A promise that resolves to the contents of the file.
 */

export function fetchFile(targetDirectory, sourceDirectory, fileName)
{
   return FilePicker.browse(targetDirectory, sourceDirectory).then((picker) =>
   {
      for (const file of picker.files)
      {
         if (file === fileName)
         {
            return FilePicker.read(targetDirectory, sourceDirectory + fileName);
         }
      }
   });
}
// create a backup file

export const createUploadFolder = async () => 
{
       try 
       {
          const folderLocation = await FilePicker.browse(ORIGIN_FOLDER, moduleDataDirectory);
          if (folderLocation.target === '.')
          {
             await FilePicker.createDirectory(ORIGIN_FOLDER, moduleDataDirectory, {});
          }
       } 
       catch (e) 
         {
            await FilePicker.createDirectory(ORIGIN_FOLDER, moduleDataDirectory, {});
         }
};
export const createInitBackupStore = async () =>
{
   try
   {
      const worldName = game.world.id;
      const findFiles = [];
      await listFiles(ORIGIN_FOLDER, `${moduleDataDirectory}/`, findFiles);
      console.log(findFiles);
      const detectBackupManager = findFiles.includes("knowledge-recalled-data/backup-manager.json");
      console.log(detectBackupManager);
      const emptyFile = {
         name: "this is a test to see if overwrite occurs"
      };
      const backupManagementFile = {
         name: "backupManager",
         data: [
            {
               world: "",
               storeIndex: 0,
            }
         ]
      };
      let index = 1;
      if (!detectBackupManager)
      {
         const backupManagementJSON = new File([JSON.stringify(backupManagementFile)], 'backup-manager.json');
         await FilePicker.upload(ORIGIN_FOLDER, `${moduleDataDirectory}/`, backupManagementJSON);
         console.log("backup management file created");
      }
      while (index < 5)
      {
         const backUpFileString = `${worldName}-${index}.json`;
         const backupFile = new File([JSON.stringify(emptyFile)], backUpFileString, { type: 'application/json' });
         await FilePicker.upload(ORIGIN_FOLDER, `${moduleDataDirectory}/`, backupFile);
         console.log(backupFile);
         index++;
      }
   }
   catch (e)
   {
      console.log(e);
   }
};

export const createBackupFile = async (data) =>
{
   const worldName = game.world.id;
   const findBackupFiles = [];
   await listFiles(ORIGIN_FOLDER, `${moduleDataDirectory}/`, findBackupFiles);
   const detectBackupManager = findBackupFiles.includes("knowledge-recalled-data/backup-manager.json");
   if (detectBackupManager)
   {
      fetchFile(ORIGIN_FOLDER, `${moduleDataDirectory}/`, "backup-manager.json").then((contents) =>
      {
         const backupManager = JSON.parse(contents);
         const storeIndex = backupManager.data.storeIndex;
         const backupFileString = `${worldName}-${storeIndex}.json`;
         const backupFile = new File([JSON.stringify(data)], backupFileString, { type: 'application/json' });
         FilePicker.upload(ORIGIN_FOLDER, `${moduleDataDirectory}/`, backupFile);
         console.log(backupFile);
         const newStoreIndex = storeIndex + 1;
if (newStoreIndex > 4)
         {
            backupManager.data.storeIndex = 1;
         }
         else
         {
            backupManager.data.storeIndex = newStoreIndex;
         }
      });
   }
};

export const getBackupFiles = async () =>
{
   const worldName = 'testing';
   const folderLocation = await FilePicker.browse(ORIGIN_FOLDER, moduleDataDirectory);
   const worldBackupFiles = folderLocation.files.filter((file) => file.includes(worldName));
   return worldBackupFiles.files.sort((a, b) => b - a)[0];
};

// create the file Processor here
