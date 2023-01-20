const nodemailer = require("nodemailer")

async function main() {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smpt.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
    });

    let info = await transporter.sendMail({
        from: '"Bebrik" <sniff@beb.ru>',
        to: "MarmeladOFForiginal@Mail.ru, Gera@mail.ru",
        subject: "privet",
        text: "privet world",
        html: "<b>privet world</b>"
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageURL(info));

    main().catch(console.error)
}