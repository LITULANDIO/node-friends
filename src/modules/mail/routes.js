
//const SibMailSdk = require('sib-api-v3-sdk')
const express = require('express')
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config()

router.post('/sendmail', sendMailGuest)

  const joinSpacesStr = (str) => str.replace(/\s/g,'')
  const apiKey = process.env.API_MAIL

  function sendMailGuest(req, res, next) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'litulandio@gmail.com',
          pass:  apiKey,
        },
      });

      const mailOptions = {
        from: req.body.sender,
        to: req.body.to,
        subject: `Benvingut a la subscripció del grup ${req.body.name}`,
        html: `
            <h3>Hola ${req.body.user }</h3>
            <p>Aquí tens el teu códig per accedir al grup</p>
            <div style="border: 2px solid; background: white; padding: 10px; margin-top: 5px; margin-bottom: 5px; font-family: monospace; font-weight: bold; letter-spacing: 0.1rem; width: 30%; text-align: center">${'CODE-'+joinSpacesStr(req.body.name)+'-00'+req.body.idAdmin+'490'}</div>
            <a href='http://localhost:3000/'>App friends invisible</a>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo electrónico:', error);
        } else {
          console.info('Correo electrónico enviado:', info.response);
        }
      });

  }


// const client = SibMailSdk.ApiClient.instance
// const apiKey = client.authentications['api-key']
// apiKey.apiKey = process.env.API_MAIL
// const joinSpacesStr = (str) => str.replace(/\s/g,'')
// console.log('API KEY =>>>>>', apiKey.apiKey )
// function sendMailGuest(req, res, next) {
//     debugger
//     try{
//         const transactionalEmailApi = new SibMailSdk.TransactionalEmailsApi()

        //  transactionalEmailApi.sendTransacEmail({
        //         subject: `Benvingut a la subscripció del grup {{ params.name }}`,
        //         sender: { email: req.body.sender },
        //         to: [{email: req.body.to }],
        //         htmlContent: `
        //             <h3>Hola {{ params.user }}</h3>
        //             <p>Aquí tens el teu códig per accedir al grup</p>
        //             <div style="border: 2px solid; background: white; padding: 10px; margin-top: 5px; margin-bottom: 5px; font-family: monospace; font-weight: bold; letter-spacing: 0.1rem; width: 30%; text-align: center">{{ params.code }}</div>
        //             <a href='http://localhost:3000/'>App friends invisible</a>
        //         `,
        //         params: {
        //           name: req.body.name,
        //           user: req.body.user,
        //           code: 'CODE-'+joinSpacesStr(req.body.name)+'-00'+req.body.idAdmin+'490'

        //         },
        //     })
//             .then(console.log)
//             .catch(console.log)
        
//     }catch(error){
//         next(error)
//     }
// }

module.exports = router

