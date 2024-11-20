module.exports.resetPasswordToken = (name, url) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Password Reset Request</title>
      <style>
          body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.4;
              color: #333333;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
          }
  
          .logo {
              max-width: 200px;
              margin-bottom: 20px;
              max-height: 70px;
          }
  
          .message {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 20px;
          }
  
          .body {
              font-size: 16px;
              margin-bottom: 20px;
          }
  
          .support {
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
          }
  
          .button {
              display: inline-block;
              background-color: #fec107;
              color: black;
              text-decoration: none;
              font-size: 20px;
              font-weight: bold;
              padding: 10px 20px;
              border-radius: 10px;
              margin: 10px;
          }
  
          .button:hover {
              text-decoration: underline;
          }
      </style>
  
  </head>
  
  <body>
      <div class="container">
          <a href="#"><img class="logo" src="https://i.ibb.co/Rc4vSk4/Edu-Quest-removebg.png" alt="Edu-Quest-logo"></a>
          <div class="message">Password Reset Request</div>
          <div class="body">
              <p>Hello,${name}</p>
              <p>We received a request to reset your password. You can reset your password by clicking the button below:
              </p>
              <a class="button" href="${url}">Reset Password</a>
              <p>If you didn't request a password reset, you can ignore this email. Your password will remain unchanged.
              </p>
          </div>
          <div class="support">If you have any questions or need further assistance, please contact us at
              <a href="mailto:eduquest.contactinfo@gmail.com">eduquest.contactinfo@gmail.com</a>.
          </div>
      </div>
  </body>
  
  </html>`;
};
