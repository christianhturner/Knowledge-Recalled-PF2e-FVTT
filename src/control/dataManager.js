import {worldName} from "../constants/constants.js";

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

export const createBackupFile = async (data) =>
{
   const timestamp = new Date().toISOString().replace(/:/g, '-');
   const backupFilename = `${worldName}_${timestamp}.json`;
   const backupFile = new File([JSON.stringify(data)], backupFilename, { type: "application/json" });

   await FilePicker.upload(ORIGIN_FOLDER, `${moduleDataDirectory}/`, backupFile, {});


   console.log(`Backup file created: ${backupFilename}`);
};

export const cleanBackupFolder = async () =>
{
   const folderLocation = await FilePicker.browse(ORIGIN_FOLDER, moduleDataDirectory);
   const files = folderLocation.files;
   const worldsFiles = files.filter((file) => file.includes(worldName));
   const worldsFilesSorted = worldsFiles.sort((a, b) => b - a);

   if (worldsFilesSorted.length > 4)
   {
      const filesToDelete = worldsFilesSorted.slice(4);
      for (const file of filesToDelete)
      {
         await FilePicker.delete(ORIGIN_FOLDER, `${moduleDataDirectory}/${file}`);
      }
   }
};

export const getBackupFiles = async () =>
{
   const folderLocation = await FilePicker.browse(ORIGIN_FOLDER, moduleDataDirectory);
   const worldBackupFiles = folderLocation.files.filter((file) => file.includes(worldName));
   return worldBackupFiles.files.sort((a, b) => b - a)[0];
};

// create the file Processor here
