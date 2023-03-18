import { FILES } from "../constants/constants.js";


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

export function findCurrentWorldIDIndex()
{
   let index = 0;
   const worldName = game.world.id;
   console.log(worldName);

   fetchFile(FILES.moduleDataDirectory, FILES.backupManagerJSON).then((contents) =>
   {
      const backupManagerObject = contents;
      console.log(backupManagerObject);
      while (index < backupManagerObject.data.length)
      {
         if (backupManagerObject.data[index].world === worldName)
         {
            console.log(index);
            return index;
         }
         else
         {
            console.log('incrementing');
            index++;
            console.log(index);
         }
      }
   });
   console.log(index);
   return index;
}
// create a backup file

export const createInitBackupStore = async () =>
{
   try
   {
      const findFiles = [];
      await listFiles(FILES.ORIGIN_FOLDER, `${FILES.moduleDataDirectory}/`, findFiles);
      const detectBackupManager = findFiles.includes(`${FILES.moduleDataDirectory}/${FILES.backupManagerJSON}`);
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
         const backupManagementJSON = new File([JSON.stringify(backupManagementFile)], FILES.backupManagerJSON);
         await FilePicker.upload(FILES.ORIGIN_FOLDER, `${FILES.moduleDataDirectory}/`, backupManagementJSON);
         console.log("backup management file created");
      }
      while (index < 5)
      {
         const worldName = game.world.id;
         const backUpFileString = `${worldName}-${index}.json`;
         const backupFile = new File([JSON.stringify(emptyFile)], backUpFileString, { type: 'application/json' });
         await FilePicker.upload(FILES.ORIGIN_FOLDER, `${FILES.moduleDataDirectory}/`, backupFile);
         console.log(backupFile);
         index++;
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
   const index = findCurrentWorldIDIndex();

   let storeIndex = fetchFile(`${FILES.moduleDataDirectory}`, FILES.backupManagerJSON).then((contents) =>
   {
      return contents.data[index].storeIndex++;
   });
   if (storeIndex > 5)
   {
      storeIndex = 1;
   }
   const backupFileString = `${worldName}-${storeIndex}.json`;
   return new File([JSON.stringify(data)], backupFileString, { type: 'application/json' });
};
export const POSTBackup = async (data) =>
{

   const backupFile = await createBackupFile(data);
   await FilePicker.upload(FILES.ORIGIN_FOLDER, `${FILES.moduleDataDirectory}/`, backupFile);
   fetchFile(FILES.moduleDataDirectory, FILES.backupManagerJSON).then((contents) =>
   {
      const backupManagerObject = contents;
      const backupManagerIndex = findCurrentWorldIDIndex();
      let storeIndex = backupManagerObject.data[backupManagerIndex].storeIndex++;
      if (storeIndex > 5)
      {
         storeIndex = 1;
      }
      backupManagerObject.data[backupManagerIndex].storeIndex = storeIndex;
      const newBackupManagerFile = new File([JSON.stringify(backupManagerObject)], FILES.backupManagerJSON, { type: 'application/json' });
      FilePicker.upload(FILES.ORIGIN_FOLDER, `${FILES.moduleDataDirectory}/`, newBackupManagerFile);
   });
};

   export function fetchIndexedBackupFiles()
   {
      const worldName = game.world.id;
      const worldIndex = findCurrentWorldIDIndex();
      const backupManagerObject = fetchFile(FILES.moduleDataDirectory, FILES.backupManagerJSON).then((contents) =>
      {
         return contents;
      });
      console.log(backupManagerObject);
      const index = backupManagerObject
      console.log(index);

      const backupFileString = `${worldName}-${index}.json`;
      console.log(backupFileString);
      const backupFile = fetchFile(FILES.moduleDataDirectory, backupFileString);
      const parseJSON = JSON.parse(backupFile);
      console.log(parseJSON);
      return parseJSON;
   }


// create the file Processor here


