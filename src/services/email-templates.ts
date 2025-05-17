
// This file contains all the email templates for the application
// These would typically be stored in the database or in separate HTML files
// For this example, we'll store them as template strings

export interface EmailTemplateContext {
  username?: string;
  timestamp?: string;
  ip?: string;
  location?: string;
  device?: string;
  transactionId?: string;
  amount?: string;
  currency?: string;
  recipient?: string;
  failureReason?: string;
  activityDescription?: string;
  currencyPair?: string;
  currentLiquidity?: string;
  threshold?: string;
  sender?: string;
  secureAccountUrl?: string;
  currentYear?: string;
}

// Email type definitions
export type EmailTemplateType = 
  | 'login_alert' 
  | 'registration' 
  | 'password_change'
  | 'p2p_transaction_release'
  | 'p2p_transaction_failed'
  | 'suspicious_activity'
  | 'liquidity_threshold'
  | 'deposit_received';

// Template registry
export const emailTemplates: Record<EmailTemplateType, string> = {
  // Template for login alert (already provided by user)
  login_alert: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA Security Alert</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 100px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .security-tip { background-color: #f8f8f8; border-left: 4px solid #f0b90b; padding: 10px; margin: 15px 0; font-size: 14px; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>Did You Login From a New Device or Location?</h1>
      
      <p>We noticed your KOB HAWALA account <strong>{{username}}</strong> was accessed from a new IP address.</p>
      
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">When:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">IP Address:</div>
          <div class="info-value">{{ip}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Location:</div>
          <div class="info-value">{{location}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Device:</div>
          <div class="info-value">{{device}}</div>
        </div>
      </div>
      
      <p>If this was you, no further action is required.</p>
      
      <div class="security-tip">
        <strong>Security Tip:</strong> Enable Two-Factor Authentication (2FA) for additional account security.
      </div>
      
      <p>Don't recognize this activity? Please secure your account immediately:</p>
      
      <a href="{{secureAccountUrl}}" class="btn">Secure My Account</a>
      
      <p>Or follow these steps manually:</p>
      <ol style="margin-left: 20px; margin-bottom: 20px;">
        <li>Change your password immediately</li>
        <li>Enable Two-Factor Authentication (2FA)</li>
        <li>Review your recent account activity</li>
        <li>Contact customer support if needed</li>
      </ol>
      
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
      <p>For security tips and to manage your email preferences, visit your account settings.</p>
    </div>
  </div>
</body>
</html>`,

  // Template for registration (already provided by user)
  registration: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA Welcome</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 100px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .security-tip { background-color: #f8f8f8; border-left: 4px solid #f0b90b; padding: 10px; margin: 15px 0; font-size: 14px; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>Welcome to KOB HAWALA!</h1>
      <p>Hello <strong>{{username}}</strong>,</p>
      <p>Your account has been successfully created. We're excited to have you on board!</p>
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">Registered On:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">IP Address:</div>
          <div class="info-value">{{ip}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Location:</div>
          <div class="info-value">{{location}}</div>
        </div>
      </div>
      <p>Get started by securing your account:</p>
      <a href="{{secureAccountUrl}}" class="btn">Secure My Account</a>
      <div class="security-tip">
        <strong>Security Tip:</strong> Enable Two-Factor Authentication (2FA) to protect your account.
      </div>
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
      <p>For security tips and to manage your email preferences, visit your account settings.</p>
    </div>
  </div>
</body>
</html>`,

  // Template for password change (already provided by user)
  password_change: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA Security Alert</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 100px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .security-tip { background-color: #f8f8f8; border-left: 4px solid #f0b90b; padding: 10px; margin: 15px 0; font-size: 14px; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>Your Password Has Been Changed</h1>
      <p>Hello <strong>{{username}}</strong>,</p>
      <p>We wanted to let you know that your KOB HAWALA account password was successfully changed.</p>
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">When:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">IP Address:</div>
          <div class="info-value">{{ip}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Location:</div>
          <div class="info-value">{{location}}</div>
        </div>
      </div>
      <p>If this was you, no further action is required.</p>
      <div class="security-tip">
        <strong>Security Tip:</strong> Keep your password secure and enable Two-Factor Authentication (2FA) for added protection.
      </div>
      <p>If you didn't initiate this change, please secure your account immediately:</p>
      <a href="{{secureAccountUrl}}" class="btn">Secure My Account</a>
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
      <p>For security tips and to manage your email preferences, visit your account settings.</p>
    </div>
  </div>
</body>
</html>`,

  // Additional templates based on the provided style
  
  // P2P Transaction Release Email
  p2p_transaction_release: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA P2P Transaction Alert</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 120px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>P2P Escrow Released</h1>
      <p>Hello <strong>{{username}}</strong>,</p>
      <p>Your P2P escrow transaction has been successfully released.</p>
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">Transaction ID:</div>
          <div class="info-value">{{transactionId}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Amount:</div>
          <div class="info-value">{{amount}} {{currency}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Recipient:</div>
          <div class="info-value">{{recipient}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Date:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
      </div>
      <p>If you have any questions, please contact support.</p>
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`,

  // P2P Transaction Failed Email
  p2p_transaction_failed: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA P2P Transaction Failed</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 120px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>P2P Transaction Failed</h1>
      <p>Hello <strong>{{username}}</strong>,</p>
      <p>We regret to inform you that your P2P transaction has failed.</p>
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">Transaction ID:</div>
          <div class="info-value">{{transactionId}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Amount:</div>
          <div class="info-value">{{amount}} {{currency}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Recipient:</div>
          <div class="info-value">{{recipient}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Reason:</div>
          <div class="info-value">{{failureReason}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Date:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
      </div>
      <p>Please review the details and contact support if needed.</p>
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`,

  // Suspicious Activity Alert
  suspicious_activity: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA Security Alert</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 100px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>Suspicious Activity Detected</h1>
      <p>Hello <strong>{{username}}</strong>,</p>
      <p>We have detected suspicious activity on your KOB HAWALA account.</p>
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">Activity:</div>
          <div class="info-value">{{activityDescription}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">IP Address:</div>
          <div class="info-value">{{ip}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Location:</div>
          <div class="info-value">{{location}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Date:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
      </div>
      <p>Please secure your account immediately:</p>
      <a href="{{secureAccountUrl}}" class="btn">Secure My Account</a>
      <p>Or follow these steps manually:</p>
      <ol style="margin-left: 20px; margin-bottom: 20px;">
        <li>Change your password immediately</li>
        <li>Enable Two-Factor Authentication (2FA)</li>
        <li>Review your recent account activity</li>
        <li>Contact customer support if needed</li>
      </ol>
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`,

  // Liquidity Below Threshold Alert
  liquidity_threshold: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA Liquidity Alert</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 150px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>Liquidity Below Threshold</h1>
      <p>Dear Admin,</p>
      <p>The liquidity for {{currencyPair}} is below the set threshold.</p>
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">Currency Pair:</div>
          <div class="info-value">{{currencyPair}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Current Liquidity:</div>
          <div class="info-value">{{currentLiquidity}} {{currency}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Threshold:</div>
          <div class="info-value">{{threshold}} {{currency}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Date:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
      </div>
      <p>Please take action to replenish liquidity.</p>
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`,

  // New Deposit Received
  deposit_received: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOB HAWALA New Deposit Received</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #fff; }
    .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .logo { color: #f0b90b; font-size: 24px; font-weight: bold; }
    .content { padding: 20px; }
    h1 { font-size: 22px; margin-bottom: 15px; color: #333; }
    .alert-info { background-color: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 100px; }
    .btn { display: block; background-color: #f0b90b; color: #1a1a1a; text-decoration: none; padding: 12px 20px; 
          text-align: center; margin: 20px auto; width: 200px; font-weight: bold; border-radius: 4px; }
    .btn:hover { background-color: #d9a408; }
    .footer { font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">KOB HAWALA</div>
    </div>
    <div class="content">
      <h1>New Deposit Received</h1>
      <p>Hello <strong>{{username}}</strong>,</p>
      <p>A new deposit has been received.</p>
      <div class="alert-info">
        <div class="info-row">
          <div class="info-label">Amount:</div>
          <div class="info-value">{{amount}} {{currency}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">From:</div>
          <div class="info-value">{{sender}}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Date:</div>
          <div class="info-value">{{timestamp}}</div>
        </div>
      </div>
      <p>Please review the details.</p>
      <p style="font-style: italic; font-size: 13px;">This is an automated message, please do not reply.</p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} KOB HAWALA. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`,
};

// Helper function to render templates with context
export const renderEmailTemplate = (
  type: EmailTemplateType,
  context: EmailTemplateContext
): string => {
  let template = emailTemplates[type];
  
  // Add current year if not provided
  context.currentYear = context.currentYear || new Date().getFullYear().toString();
  
  // Replace all placeholders in the template
  Object.entries(context).forEach(([key, value]) => {
    if (value) {
      template = template.replace(
        new RegExp(`{{${key}}}`, 'g'),
        value.toString()
      );
    }
  });
  
  return template;
};

// Export a sample function to send an email (this would connect to an email service in a real app)
export const sendEmail = async (
  to: string,
  type: EmailTemplateType,
  context: EmailTemplateContext
): Promise<boolean> => {
  try {
    const renderedTemplate = renderEmailTemplate(type, context);
    
    // In a real application, this would send the email using an email service
    console.log(`Sending ${type} email to ${to}`);
    console.log('Email content:', renderedTemplate.substring(0, 100) + '...');
    
    // Mock successful email sending
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
