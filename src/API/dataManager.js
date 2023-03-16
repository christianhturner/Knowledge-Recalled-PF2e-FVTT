/*
import { CONSTANTS } from "../constants/constants.js";

const worldName = CONSTANTS.worldName;
*/


export const ORIGIN_FOLDER = 'data';
export const moduleDataDirectory = "knowledge-recalled-data";


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
/*      export function fetchFile(targetDirectory, sourceDirectory, fileName)
      {

         FilePicker.browse(targetDirectory, sourceDirectory).then((picker) =>
         {
            for (const file of picker.files)
            {
               if (file === fileName)
               {
                  return new File(fileName, file, { type: 'application/json' });
               }
            }
         });
      }*/

export async function fetchFile(sourceDirectory, fileName)
{
   const response = await fetch(`${sourceDirectory}/${fileName}`);
   const data = await response.json().catch((error) => console.error('failed to ready json for file', error));
   if (response.ok)
   {
      return data;
   }
   else
   {
      throw new Error(data.message);
   }
}


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

// create a backup file

export const createInitBackupStore = async () =>

{
   try
   {
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
         const worldName = game.world.id;
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
   const backupManager = "backup-manager.json";
   const findBackupFiles = [];
   await listFiles(ORIGIN_FOLDER, `${moduleDataDirectory}/`, findBackupFiles);
   const detectBackupManager = findBackupFiles.includes();
   if (detectBackupManager)
   {
      fetchFile(moduleDataDirectory, backupManager).then((contents) =>
      {
         const backupManagerObject = contents;
         const storeIndex = backupManagerObject.data[0].storeIndex;
         const worldName = game.world.id;
         const backupFileString = `${worldName}-${storeIndex}.json`;
         const backupFile = new File([JSON.stringify(data)], backupFileString, { type: 'application/json' });
         FilePicker.upload(ORIGIN_FOLDER, `${moduleDataDirectory}/`, backupFile);
         console.log(backupFile);
         const newStoreIndex = storeIndex + 1;
if (newStoreIndex > 5)
         {
            backupManagerObject.data.storeIndex = 1;
         }
         else
         {
            backupManagerObject.data.storeIndex = newStoreIndex;
         }
      });
   }
   else
   {
     await createInitBackupStore();
   }
};

export const fetchIndexedBackupFiles = async () =>
{
   const worldName = game.world.id;
   const BackupFilesArray = [];
   await listFiles(ORIGIN_FOLDER, `${moduleDataDirectory}/`, BackupFilesArray);
   const backupManager = BackupFilesArray.includes("knowledge-recalled-data/backup-manager.json");
   if (backupManager)
   {
      const backupManagerFile = await fetchFile(moduleDataDirectory, "backup-manager.json");
      const storeIndex = backupManagerFile.data.storeIndex;
      const backupFileString = `${worldName}-${storeIndex}.json`;
      const backupFile = await fetchFile(moduleDataDirectory, backupFileString);
      return backupFile;
   }

};

// create the file Processor here


