const mssql = require('mssql');
const config = require('../Config/config');
//const { uploadImage, uploadVideo } = require('../utils/uploaderUtil');

async function createDisplayNotificationPerUser(req, res) {
  try {
    const UserID = req.session?.user.UserID

    

    // Connect to the database
    await mssql.connect(config);

   

    // Insert the new post into the "posts" table
    const request = new mssql.Request();

    request.input('UserID', UserID);
   
    // Execute the stored procedure to create a new post
    let results = await request.execute('ViewUserNotifications');

    res.status(201).json({
         message: 'Notifications to the user',
        results:[...results.recordset]
        });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the database connection
    mssql.close();
  }
}


async function createMarkNotificationAsReadOnView(req, res) {
  

try {
  const {NotificationID } = req.body;

 //const LikedObjectType = 'Post'

  // Connect to the database
  await mssql.connect(config);

 
  // Insert the new post into the "posts" table
  const request = new mssql.Request();

  request.input('NotificationID', NotificationID);
  
 
  

  // Execute the stored procedure to create a new post
  await request.execute('MarkNotificationAsRead');

  res.status(201).json({ message: 'Notification successfully set to read' });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal server error');
} finally {
  // Close the database connection
  mssql.close();
}
}



module.exports = {createDisplayNotificationPerUser, createMarkNotificationAsReadOnView}