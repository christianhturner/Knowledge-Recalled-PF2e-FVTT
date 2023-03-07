
// replace t with some sort of il18n entry
export const t = "You don't have adequate permissions to upload";
export const randomString = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
export const userCanUpload = (silent = false) => {
   const userRole = (game)?.user?.role;
   const fileUploadPermissions = (game)?.permissions?.FILES_UPLOAD;
   
   if (!userRole || !fileUploadPermissions) {
      if (!silent) ui.notifications?.warn(t('uploadPermissions'));
      return false;
   }
   
   const uploadPermission = fileUploadPermissions.includes(userRole);
   if (!uploadPermission && !silent) ui.notifications?.warn(t('uploadPermissions'));
   
   return uploadPermission;
};