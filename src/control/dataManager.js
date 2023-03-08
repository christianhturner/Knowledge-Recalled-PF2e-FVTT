/*import { CONSTANTS } from "../constants/constants.js";

const worldName = CONSTANTS.worldName;*/
import {settings} from "@typhonjs-config/eslint-config/shared/default.js";

const moduleDataDirectory = "knowledge-recalled-data";
export const ORIGIN_FOLDER = 'data';


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
      const DATA_DIR = await FilePicker.browse(ORIGIN_FOLDER, `${moduleDataDirectory}/`);
      const worldName = "testing";
      const backupManagementFileString = DATA_DIR.files.includes('backup-manager.json');
      console.log(backupManagementFileString);
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
      if (!backupManagementFileString)
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
   const worldName = 'testing';
   const timestamp = new Date().toISOString().replace(/:/g, '-');
   const backupFilename = `${worldName}_${timestamp}.json`;
   const backupFile = new File([JSON.stringify(data)], backupFilename, { type: "application/json" });

   await FilePicker.upload(ORIGIN_FOLDER, `${moduleDataDirectory}/`, backupFile, {});


   console.log(`Backup file created: ${backupFilename}`);
};

export const cleanBackupFolder = async () =>
{
   const worldName = 'testing';
   const folderLocation = await FilePicker.browse(ORIGIN_FOLDER, moduleDataDirectory);
   const files = folderLocation.files;
   const worldsFiles = files.filter((file) => file.includes(worldName));
   const worldsFilesSorted = worldsFiles.sort((a, b) => b - a);

   if (worldsFilesSorted.length > 4)
   {
      const filesToDelete = worldsFilesSorted.slice(4);
      for (const file of filesToDelete)
      {
         // convert await FilePicker.delete(ORIGIN_FOLDER, `${moduleDataDirectory}/${file}`); to use node fs
         await FilePicker.delete(ORIGIN_FOLDER, `${moduleDataDirectory}/${file}`);
      }
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
