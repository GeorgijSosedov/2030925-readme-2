export const NOTIFY_SERVICE_ENV_PATH = 'environments/.notify.env';

export enum EnvValidationMessage {
    DBHostRequired = 'MongoDB host is required',
    DBNameRequired = 'MongoDB name is required',
    DBPortRequired = 'MongoDB port is required',
    DBUserRequired = 'MongoDB user is required',
    DBPasswordRequired = 'MongoDB password is required',
    DBBaseAuthRequired = 'MongoDB authentication base is required',
    RMQHostRequired = 'RabbitMQ host is required',
    RMQUserRequired = 'RabbitMQ user is required',
    RMQPasswordRequired = 'RabbitMQ password is required',
    RMQSubscriberRequired = 'RabbitMQ Subscribers Queue is required',
    MailServerHostRequired = 'SMTP Server is required',
    MailServerPortRequired = 'SMTP Server port is required',
    MailServerUserNameRequired = 'SMTP Server username is required',
    MailServerPasswordRequired = 'SMTP Server password is required',
    MailServerDefaultFromRequired = 'Default value for mail from field is required',
}