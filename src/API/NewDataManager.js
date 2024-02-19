import {get} from "svelte/store";

export interface KnowledgeRecalledBackupEntry {
   filename: string;
   filePath: string;
   backupIndex: number;
}
class DataFolderOptions extends FormApplication {
   get defaultOptions() {
      return mergeObject(super.defaultOptions, {
         id: "data-folder-options",
         title: "Data Folder Options",
         rezieable: false,
         minimizable: false,
         submitOnClose: false,
         closeOnSubmit: true,
         submitOnChange: false,
      });
   }
   constructor(options = {}) {
      super(options);
      this.folder = Settings.get(KnowledgeRecalledData.defaultFolder);
      this.source = Settings.get(KnowledgeRecalledData.defaultFolderSource);
   }
   getData(options) {
      return { path: this.folder };
   }
   async _renderInner(data) {
      const html = await super._renderInner(data);
      const input = html.find("input#kr-backup-folder-path")[0];
      html.find('label>button').on('click', async () => {
         event.preventDefault();
         const fp = new FilePicker({
            title: 'knowledge_recalled_data.Settings.DataFolder_Name',
            type: 'folder',
            field: input,
            callback: async path => {
               this.source = fp.activeSource;
               this.folder = path;
            },
            button: addEventListener.currentTarget,
         });
         await fp.browse(Settings.get(KnowledgeRecalledData.defaultFolder, this.folder));
         await fp.browse(Settings.get(KnowledgeRecalledData.defaultFolderSource, this.source));
      });
      return html;
   }
   async _updateObject(event:Event, formData:Object) {
      await Settings.set(KnowledgeRecalledData.defaultFolder, this.folder);
      await Settings.set(KnowledgeRecalledData.defaultFolderSource, this.source);
   }
}
export class KnowledgeRecalledData {
   static defaultLogs = 'logs';
   static defaultCID = 'currentId';
   static defaultFolder = 'backups';
   static defaultFolderSource = 'knowledge-recalled';
   static defaultFolderMenu = 'DataFolderOptions';
   static _updateListener = null;

   static get DATA_FOLDER() {
      return Settings.get(KnowledgeRecalledData.defaultFolderSource);
   }
   static setUpdateListener(listener) {
      this._updateListener = listener;
   }
   static async registerSettings() {
      Settings.register(this.defaultLogs, {
         scope: 'world',
         config: false,
         type: Object,
         default: {},
         onChange: () => {
            if (this._updateListener != null)
               this._updateListener();
         }
      });

      Settings.register(this.defaultCID, {
         scope: 'world',
         config: false,
         type: Number,
         default: 0
      });

      Settings.register(this.defaultFolderMenu, {
         label: 'Knowledge_Recalled_Data.Settings.DataFolder_Name',
         hint: 'Knowledge_Recalled_Data.Settings.DataFolder_Hint',
         restricted: true,
         type: KnowledgeRecalledData
      });
      Settings.register(this.defaultFolder, {
         scope: 'world',
         config: false,
         type: String,
         default: `worlds/${game.world.id}/knowledge-recalled}`,
         onChange: async () => {
            await this.createDataFolderIfMissing();
            if (this._updateListener != null)
               this._updateListener();
         }
      });
      Settings.register(this.defaultFolderSource, {
         scope: 'world',
         config: false,
         type: String,
         default: 'data'
      });
      await this.createDataFolderIfMissing()
   }
   static async createDataFolderIfMissing()
{
   const folder = Settings.get(this.defaultFolder);
   await FilePicker.browse(this.DATA_FOLDER, folder)
.catch(async _ => {
   if (!await FilePicker.createDirectory(this.DATA_FOLDER, folder))
   ui.notifications.error(`Failed to create folder ${folder}`);
});
}
static async getLogs() {
      return Settings.get<KnowledgeRecalledBackups[]>(this.defaultLogs);
}
static getBackups(id) {
      return this.getLogs().find(x => x.id === id);
}
static exists(id) {
      return !!this.getLogs().find(x => x.id === id);
}
static async _generateBackupFile(backupIndex, name, ActorData, EncounterData, JournalData): Promise<KnowledgeRecalledBackupEntry>
{
   const folderPath = Settings.get(this.defaultFolder);
   const safeName = name.replace(/[^ a-z0-9-_()[\]<>]/gi, '_');
   const filename = encodeURI(`${safeName}-${backupIndex}.json`);
   const file = new File([JSON.stringify({ ActorData, EncounterData, JournalData }, null, 2)],
      filename, { type: 'application/json' });
   const response: { path?: string; message?: string } = await FilePicker.upload(this.DATA_FOLDER, folderPath, file);
   if (!response.path) {
      console.error(`Could not create backup ${filename}\nReason ${response}`);
      throw new Error(`Could not upload the backup to server: ` + filename);
   }
   const backupEntry: KnowledgeRecalledBackupEntry = {
      filename,
      filePath: response.path,
      backupIndex
   };
   return backupEntry;
}
static async getBackupEntryContent(backupEntry: KnowledgeRecalledBackupEntry) {
   const response = await fetch(backupEntry.filePath);
   const data = await response.json().catch(error => console.error(`failed to read json for back ${backupEntry.filePath}\n${error}`));
   if (response.ok)
      return data;
   else
      throw new Error('Could not access the archive from server side: ' + backupEntry.filePath);

}



   get DATA_FOLDER(): FilePicker.SourceType {

   }
}

const filePath = "update/with/generated/source"

