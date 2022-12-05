export const ENV_FILE_PATH = 'environments/.users.env';

export enum EnvValidationMessage {
    DBHostRequired = 'MongoDB host is required',
    DBNameRequired = 'MongoDB name is required',
    DBPortRequired = 'MongoDB port is required',
    DBUserRequired = 'MongoDB user is required',
    DBPasswordRequired = 'MongoDB password is required',
    DBBaseAuthRequired = 'MongoDB authentication base is required',
}