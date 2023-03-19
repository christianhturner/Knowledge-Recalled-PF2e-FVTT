import {FILES} from "../constants/constants.js";


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
export const doesFileExist = async (sourceDirectory, fileName) =>
{
   const fileArray = [];
   await listFiles(FILES.ORIGIN_FOLDER, `${FILES.moduleDataDirectory}`, fileArray);
      console.log(fileArray);
      console.log(`${sourceDirectory}/${fileName}`);
   if (fileArray.includes(`${sourceDirectory}${fileName}`))
   {
      console.log('file exists');
      return true;
   }
   else
   {
      console.log('file does not exist');
      return false;
   }
};

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
      const folderLocation = await FilePicker.browse(FILES.ORIGIN_FOLDER, FILES.moduleDataDirectory);
      if (folderLocation.target === '.')
      {
         await FilePicker.createDirectory(FILES.ORIGIN_FOLDER, FILES.moduleDataDirectory, {});
      }
   }
   catch (e)
   {
      await FilePicker.createDirectory(FILES.ORIGIN_FOLDER, FILES.moduleDataDirectory, {});
   }
};

// create a backup file

export const createInitBackupStore = async () =>
{
   try
   {
      const findFiles = [];
      await listFiles(FILES.ORIGIN_FOLDER, `${FILES.moduleDataDirectory}/`, findFiles);
      console.log(findFiles);
      const emptyFile = {
         name: "this is a test to see if overwrite occurs"
      };
         const worldName = game.world.id;
         const fileExist = await doesFileExist(`${FILES.moduleDataDirectory}/`, `${worldName}.json`);
         console.log(fileExist);
         if (!fileExist)
         {
            const backUpFileString = `${worldName}.json`;
            const backupFile = new File([JSON.stringify(emptyFile)], backUpFileString, { type: 'application/json' });
            await FilePicker.upload(FILES.ORIGIN_FOLDER, `${FILES.moduleDataDirectory}/`, backupFile);
            return console.log(`Initializing backup for ${worldName}`);
         }
         else
         {
            return console.log(`${worldName} has already been initialized`);
         }
   }
   catch (e)
   {
      console.log(e);
   }
};

const createBackupFile = async (data) =>
{
   const worldName = game.world.id;
   const backupFileString = `${worldName}.json`;
   return new File([JSON.stringify(data)], backupFileString, { type: 'application/json' });
};
export const POSTBackup = async (data) =>
{
   const backupFile = await createBackupFile(data);
   await FilePicker.upload(FILES.ORIGIN_FOLDER, `${FILES.moduleDataDirectory}/`, backupFile);
};

   export function fetchBackupFile(localDataObject)
   {
      const worldName = game.world.id;
      const backupFileString = `${worldName}.json`;
      console.log(backupFileString);
      localDataObject =  fetchFile(FILES.moduleDataDirectory, backupFileString).then((data) =>
      {
         return data;
      });
      return localDataObject;
   }


// create the file Processor here


