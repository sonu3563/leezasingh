const express = require("express");
const router = express.Router();
const { sendEmail } = require('../email/emailUtils');
const Subscription = require("../models/userSubscriptions");
const { authenticateToken } = require("../routes/userRoutes"); 
const { UserSharedFile, Designee, Userlogin } = require("../models/userModel");
const { File } = require("../models/userUpload");
const Voice = require("../models/uservoiceUpload");
const { decryptField } = require("../utilities/encryptionUtils");
const { decryptvoice } = require("../utilities/voiceencryptionUtils");
// router.post("/add", authenticateToken, async (req, res) => {
//   const user_id = req.user.user_id; // Extracted from token
//   const { designeeName, designeePhone, designeeEmail } = req.body;
//   // Ensure valid email
//   if (!designeeEmail || !designeeName) {
//       return res.status(400).json({ message: "Designee name and email are required." });
//   }
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(designeeEmail)) {
//       return res.status(400).json({ message: "Invalid email address format." });
//   }
//   console.log("Valid email to be sent to:", designeeEmail);  // Ensure it's a valid email address
//   try {
//       let otp = Math.floor(100000 + Math.random() * 900000);
//       var body = `Hello ${designeeName}<br/><br/>Please click on below link for registration with Cumulus.<br/><br/>`;
//       body += `<a href='http://localhost:3000/SharedFiles?email=${designeeEmail}&created_by=${user_id}'>http://localhost:3000/SharedFiles?email=${designeeEmail}&created_by=${user_id}</a>`;
//       body += "<br/>Your OTP is: "+otp;
//       body += "<br/><br/>Thanks<br/>Cumulus Team!";
//       const emailResponse = await sendEmail({
//           to: designeeEmail,  // Only valid email here
//           subject: "Member Registration Email",
//           body
//       });
//       if (emailResponse.success) {
//           let designee=new Designee({from_user_id: user_id, name: designeeName, phone_number: designeePhone, email: designeeEmail, otp});
//           await designee.save();
//           res.status(200).json({
//               message: "Subscription created successfully.",
//               previewURL: emailResponse.previewURL,
//           });
//       } else {
//           res.status(500).json({ message: "Error sending OTP email.", error: emailResponse.error });
//       }
//   } catch (error) {
//       console.error("Error creating subscription:", error);
//       res.status(500).json({ message: "Error creating subscription.", error: error.message });
//   }
// });
// POST route to add a designee with OTP and registration link
router.post("/add-designee", authenticateToken, async (req, res) => {
  const user_id = req.user.user_id; 
  const { designeeName, designeePhone, designeeEmail } = req.body;
  if (!designeeEmail || !designeeName || !designeePhone) {
    return res.status(400).json({ message: "Designee name, phone, and email are required." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(designeeEmail)) {
    return res.status(400).json({ message: "Invalid email address format." });
  }
  try {
    // Check if the designee already exists
    let designee = await Designee.findOne({ email: designeeEmail });
    // Check if the designee exists in the User schema
    const user = await Userlogin.findOne({ email: designeeEmail });
    // Set member field based on whether the user exists in the User schema
    const memberStatus = user ? true : false;
    if (!designee) {
      let otp = Math.floor(100000 + Math.random() * 900000);
      let body = `Hello ${designeeName}<br/><br/>Please click on the link below for registration with Cumulus.<br/><br/>`;
      body += `<a href='http://localhost:3001/SharedFiles?email=${designeeEmail}&created_by=${user_id}'>http://localhost:3000/SharedFiles?email=${designeeEmail}&created_by=${user_id}</a>`;
      body += "<br/>Your OTP is: " + otp;
      body += "<br/><br/>Thanks<br/>Cumulus Team!";
      const emailResponse = await sendEmail({
        to: designeeEmail,
        subject: "Member Registration Email",
        body,
      });
      if (emailResponse.success) {
  
        designee = new Designee({
          from_user_id: [user_id],
          name: designeeName,
          phone_number: designeePhone,
          email: designeeEmail,
          password: otp, 
          member: memberStatus, 
        });
        await designee.save();
        return res.status(200).json({
          message: "Designee created successfully. OTP sent.",
          previewURL: emailResponse.previewURL,
        });
      } else {
        return res.status(500).json({ message: "Error sending OTP email.", error: emailResponse.error });
      }
    } else {
      if (designee.member) {
     
        if (!designee.from_user_id.includes(user_id)) {
          designee.from_user_id.push(user_id);
        }
        await designee.save();
        return res.status(200).json({
          message: "User ID added to existing designee.",
          designee,
        });
      } else {
       
        let otp = designee.password; 
        let body = `Hello ${designeeName}<br/><br/>Please click on the link below for registration with Cumulus.<br/><br/>`;
        body += `<a href='http://localhost:3000/SharedFiles?email=${designeeEmail}&created_by=${user_id}'>http://localhost:3000/SharedFiles?email=${designeeEmail}&created_by=${user_id}</a>`;
        body += "<br/>Your OTP is: " + otp;
        body += "<br/><br/>Thanks<br/>Cumulus Team!";
        const emailResponse = await sendEmail({
          to: designeeEmail,
          subject: "Member Registration Email",
          body,
        });
        if (emailResponse.success) {
          
          if (!designee.from_user_id.includes(user_id)) {
            designee.from_user_id.push(user_id);
          }
          await designee.save();
          return res.status(200).json({
            message: "User ID added to existing designee. OTP sent.",
            previewURL: emailResponse.previewURL,
          });
        } else {
          return res.status(500).json({ message: "Error sending OTP email.", error: emailResponse.error });
        }
      }
    }
  } catch (error) {
    console.error("Error adding designee:", error);
    res.status(500).json({ message: "Error adding designee.", error: error.message });
  }
});
// router.post("/get", async (req, res) => {
//   const { email } = req.body;
//   //let designee=await UserSharedFile.find({to_email_id: email}).populate("from_user_id").populate("to_user_id");
//   let designee=[];
//   const designee1 = await UserSharedFile.aggregate([
//     // Match documents based on the provided email
//     {
//       $match: {
//         to_email_id: email
//       }
//     },
//     // Group by 'from_user_id' and accumulate the documents in an array
//     {
//       $group: {
//         _id: "$from_user_id",
//       }
//     }
//   ]);
//   for(var i=0; i<designee1.length; i++){
//     var designee2=await UserSharedFile.find({from_user_id: designee1[i]._id, to_email_id: email}).populate("file_id").populate("from_user_id").populate("to_user_id");
//     designee.push({_id: designee1[i]._id, files: designee2});
//   }
//   res.status(200).json(designee);
// });
// router.post("/auth-get", authenticateToken, async (req, res) => {
//   const user_id = req.user.user_id;
//   //let designee=await UserSharedFile.find({to_user_id: user_id}).populate("file_id").populate("from_user_id").populate("to_user_id");
//   let designee=[];
//   const designee1 = await UserSharedFile.aggregate([
//     // Match documents based on the provided email
//     {
//       $match: {
//         to_user_id: user_id
//       }
//     },
//     // Group by 'from_user_id' and accumulate the documents in an array
//     {
//       $group: {
//         _id: "$from_user_id",
//       }
//     }
//   ]);
//   for(var i=0; i<designee1.length; i++){
//     var designee2=await UserSharedFile.find({from_user_id: designee1[i]._id, to_user_id: user_id}).populate("file_id").populate("from_user_id").populate("to_user_id");
//     designee.push({_id: designee1[i]._id, files: designee2});
//   }
//   res.status(200).json(designee);
// });
// router.post("/set-permission", authenticateToken, async (req, res) => {
//   const user_id = req.user.user_id;
//   const { userId, data } = req.body;
//   let result = userId.indexOf("@");
//   if(result!="-1"){
//     var designee=await UserSharedFile.findOne({from_user_id: user_id, to_email_id: userId});
//   }
//   else{
//     var designee=await UserSharedFile.findOne({from_user_id: user_id, to_user_id: userId});
//   }
//   designee.access=data;
//   await designee.save();
//   res.status(200).json({success: true});
// });
  
// router.post("/verify-email-otp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const designee = await Designee.findOne({ email, otp });
//     if(designee==null){
//       res.status(200).json({success: false, message: "OTP is wrong!"});
//     }
//     else{
//       //designee.otp="";
//       //await designee.save();
//       res.status(200).json({success: true, message: "Thanks for login with email and OTP!"});
//     }
//   } catch (error) {
//     console.error("Error fetching subscriptions:", error);
//     res.status(500).json({ message: "Error fetching subscriptions.", error: error.message });
//   }
// });
router.post('/nc-designee-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the designee by email
    const designee = await Designee.findOne({ email });
    if (!designee) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Directly compare the entered password with the stored password
    if (designee.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // If successful, return a success message (you can also return a JWT token here)
    res.status(200).json({ message: 'Login successful', designee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




router.post("/share-files", authenticateToken, async (req, res) => {
  const { to_email_id, file_id, access, notify } = req.body; 
  const from_user_id = req.user.user_id; 
  if (!to_email_id || !Array.isArray(to_email_id) || !file_id) {
    return res.status(400).json({ message: "Designee emails (array) and file ID are required." });
  }
  const results = [];
  for (const email of to_email_id) {
    try {
      // Check if the designee exists
      const designee = await Designee.findOne({ email });
      if (!designee) {
        results.push({ email, status: "failed", message: "Designee not found." });
        continue;
      }
      // Check if the user is authorized to share files with the designee
      if (!designee.from_user_id.includes(from_user_id)) {
        results.push({ email, status: "failed", message: "Not authorized to share files with this designee." });
        continue;
      }
      // Check if the file exists
      const fileExists = await File.findById(file_id);
      if (!fileExists) {
        results.push({ email, status: "failed", message: "Invalid file ID." });
        continue;
      }
      // Find or create a UserSharedFile entry
      let userSharedFile = await UserSharedFile.findOne({ from_user_id, to_email_id: email });
      if (!userSharedFile) {
        userSharedFile = new UserSharedFile({
          from_user_id,
          to_email_id: email,
          files: [],
        });
      }
      // Check if the file already exists in the files array
      const existingFile = userSharedFile.files.find(f => f.file_id.toString() === file_id);
      if (existingFile) {
        // Update access if the file already exists
        existingFile.access = access || existingFile.access;
      } else {
        // Add the new file to the files array
        userSharedFile.files.push({ file_id, access });
      }
      // Save the updated or new UserSharedFile
      await userSharedFile.save();
      // Send notification email if requested
      if (notify) {
        const otp = designee.password;
        const body = `
          Hello ${designee.name},<br/><br/>
          Please click on the link below to access shared files on Cumulus.<br/><br/>
          <a href='http://localhost:3000/SharedFiles?email=${email}&created_by=${from_user_id}'>
            http://localhost:3000/SharedFiles?email=${email}&created_by=${from_user_id}
          </a>
          <br/><br/>
          Your OTP is: ${otp}<br/><br/>
          Thanks,<br/>
          Cumulus Team!
        `;
        await sendEmail({
          to: email,
          subject: "File Sharing Invitation",
          body,
        });
        results.push({ email, status: "success", message: "File shared and email sent with OTP." });
      } else {
        results.push({ email, status: "success", message: "File shared successfully. No email sent." });
      }
    } catch (error) {
      console.error(`Error sharing file with ${email}:`, error);
      results.push({ email, status: "failed", message: "Error sharing file or sending email.", error: error.message });
    }
  }
  res.status(200).json({ message: "File sharing process completed.", results });
});


router.post("/share-files", authenticateToken, async (req, res) => {
  const { to_email_id, file_id, access, notify } = req.body; // file_id is now an array
  const from_user_id = req.user.user_id;

  if (!to_email_id || !Array.isArray(to_email_id) || !Array.isArray(file_id) || file_id.length === 0) {
    return res.status(400).json({ message: "Designee emails (array) and file IDs (array) are required." });
  }

  const results = [];

  for (const email of to_email_id) {
    try {
      // Check if the designee exists
      const designee = await Designee.findOne({ email });
      if (!designee) {
        results.push({ email, status: "failed", message: "Designee not found." });
        continue;
      }

      // Check if the user is authorized to share files with the designee
      if (!designee.from_user_id.includes(from_user_id)) {
        results.push({ email, status: "failed", message: "Not authorized to share files with this designee." });
        continue;
      }

      // Find or create a UserSharedFile entry
      let userSharedFile = await UserSharedFile.findOne({ from_user_id, to_email_id: email });
      if (!userSharedFile) {
        userSharedFile = new UserSharedFile({
          from_user_id,
          to_email_id: email,
          files: [],
        });
      }

      // Process each file_id in the array
      for (const fileId of file_id) {
        // Check if the file exists
        const fileExists = await File.findById(fileId);
        if (!fileExists) {
          results.push({ email, file_id: fileId, status: "failed", message: "Invalid file ID." });
          continue;
        }

        // Check if the file already exists in the files array
        const existingFile = userSharedFile.files.find(f => f.file_id.toString() === fileId);
        if (existingFile) {
          // Update access if the file already exists
          existingFile.access = access || existingFile.access;
        } else {
          // Add the new file to the files array
          userSharedFile.files.push({ file_id: fileId, access });
        }
      }

      // Save the updated or new UserSharedFile
      await userSharedFile.save();

      // Send notification email if requested
      if (notify) {
        const otp = designee.password;
        const body = `
          Hello ${designee.name},<br/><br/>
          Please click on the link below to access shared files on Cumulus.<br/><br/>
          <a href='http://localhost:3000/SharedFiles?email=${email}&created_by=${from_user_id}'>
            http://localhost:3000/SharedFiles?email=${email}&created_by=${from_user_id}
          </a>
          <br/><br/>
          Your OTP is: ${otp}<br/><br/>
          Thanks,<br/>
          Cumulus Team!
        `;
        await sendEmail({
          to: email,
          subject: "File Sharing Invitation",
          body,
        });
        results.push({ email, status: "success", message: "Files shared and email sent with OTP." });
      } else {
        results.push({ email, status: "success", message: "Files shared successfully. No email sent." });
      }
    } catch (error) {
      console.error(`Error sharing files with ${email}:`, error);
      results.push({ email, status: "failed", message: "Error sharing files or sending email.", error: error.message });
    }
  }

  res.status(200).json({ message: "File sharing process completed.", results });
});



// API to get shared files for a particular designee (NON CUMULUS USER)
router.post("/get-shared-files-nc", async (req, res) => {
  try {
    const { to_email_id } = req.body;
    if (!to_email_id) {
      return res.status(400).json({ message: "Email is required." });
    }
    const sharedFiles = await UserSharedFile.find({ to_email_id })
      .populate("from_user_id", "username email")
      .populate({
        path: "files.file_id",
        select: "file_name aws_file_link iv_file_name iv_file_link",
      });
    if (!sharedFiles || sharedFiles.length === 0) {
      return res.status(404).json({ message: "No shared files found for this email." });
    }
    const decryptedSharedFiles = sharedFiles.map((sharedFile) => ({
      from_user: {
        username: sharedFile.from_user_id?.username || "Unknown User",
        email: sharedFile.from_user_id?.email || "Unknown Email",
        _id: sharedFile.from_user_id?._id || null,
      },
      created_at: sharedFile.created_at,
      shared_files: sharedFile.files
        .filter((file) => file.file_id) 
        .map((file) => {
          const fileName = decryptField(file.file_id.file_name, file.file_id.iv_file_name);
          const fileLink = decryptField(file.file_id.aws_file_link, file.file_id.iv_file_link);
          return {
            file_id: file.file_id._id,
            file_name: fileName,
            aws_file_link: fileLink,
            iv_file_link: file.file_id.iv_file_link,
            access: file.access,
          };
        }),
    }));
    res.status(200).json({ files: decryptedSharedFiles });
  } catch (error) {
    console.error("Error retrieving shared files:", error);
    res.status(500).json({ message: "Error retrieving shared files.", error: error.message });
  }
});
// API to get shared files for Cumulus user (logged-in user)
router.post("/get-shared-files-cumulus", authenticateToken, async (req, res) => {
  try {
    const from_user_id = req.user.user_id;
    const user = await Userlogin.findById(from_user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const to_email_id = user.email;
    const sharedFiles = await UserSharedFile.find({ to_email_id })
      .populate("from_user_id", "username email")
      .populate({
        path: "files.file_id",
        select: "file_name aws_file_link iv_file_name iv_file_link",
      });
    if (!sharedFiles || sharedFiles.length === 0) {
      return res.status(404).json({ message: "No shared files found for this email." });
    }
    const decryptedSharedFiles = sharedFiles.map((sharedFile) => ({
      from_user: {
        username: sharedFile.from_user_id?.username || "Unknown User",
        email: sharedFile.from_user_id?.email || "Unknown Email",
        _id: sharedFile.from_user_id?._id || null,
      },
      created_at: sharedFile.created_at,
      shared_files: sharedFile.files
        .filter((file) => file.file_id) // Ensure file_id is not null
        .map((file) => {
          const fileName = decryptField(file.file_id.file_name, file.file_id.iv_file_name);
          const fileLink = decryptField(file.file_id.aws_file_link, file.file_id.iv_file_link);
          return {
            file_id: file.file_id._id,
            file_name: fileName,
            aws_file_link: fileLink,
            iv_file_link: file.file_id.iv_file_link,
            access: file.access,
          };
        }),
    }));
    res.status(200).json({ decryptedSharedFiles });
  } catch (error) {
    console.error("Error retrieving shared files:", error);
    res.status(500).json({ message: "Error retrieving shared files.", error: error.message });
  }
});
router.post("/get", authenticateToken, async (req, res) => {
  // Extract user_id from the authenticated token
  const { user_id } = req.user; // Extract user_id from the authenticated token
console.log("useriddd",user_id);
  if (!user_id) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Fetch designee data linked to the user_id
    const designees = await Designee.find({ from_user_id: user_id }).populate({
      path: "from_user_id",
      select: "username email",
    });

    if (!designees || designees.length === 0) {
      return res.status(404).json({ message: "No designees found for the specified user." });
    }

    // Optionally fetch shared files for each designee
    const designeeData = await Promise.all(
      designees.map(async (designee) => {
        const sharedFiles = await UserSharedFile.find({ to_email_id: designee.email }).populate({
          path: "file_id",
          select: "filename filetype", // Include necessary file details
        });

        return {
          name: designee.name,
          email: designee.email,
          phone_number: designee.phone_number,
          member: designee.member,
          sharedFiles: sharedFiles.map((file) => ({
            filename: file.file_id.filename,
            filetype: file.file_id.filetype,
            access: file.access,
          })),
        };
      })
    );

    res.status(200).json({
      message: "Designee data retrieved successfully.",
      designeeData,
    });
  } catch (error) {
    console.error("Error fetching designee data:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

router.post("/auth-get", authenticateToken, async (req, res) => {
  const user_id = req.user.user_id;  // Extract user_id from the authenticated token
  console.log("Authenticated User ID:", user_id);

  try {
    // Step 1: Find all Designee documents where from_user_id contains the authenticated user's ID
    const designees = await Designee.find({
      from_user_id: user_id,  // Match where the from_user_id array contains the user_id
    }).populate("from_user_id", "username email")  // Populate from_user_id to get details like username, email
      .populate("member");  // Optionally populate other fields if needed

    if (!designees || designees.length === 0) {
      return res.status(404).json({ message: "No designees found for the specified user." });
    }

    // Step 2: Return the designees with necessary details
    res.status(200).json({
      message: "Designees retrieved successfully.",
      designees,  // Send the designees with populated data
    });
  } catch (error) {
    console.error("Error fetching designee data:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

router.post("/share-voices", authenticateToken, async (req, res) => {
  const { to_email_id, voice_id, access, notify } = req.body; 
  const from_user_id = req.user.user_id; 
  if (!to_email_id || !Array.isArray(to_email_id) || !voice_id) {
    return res.status(400).json({ message: "Designee emails (array) and voice ID are required." });
  }
  const results = [];
  for (const email of to_email_id) {
    try {
      const designee = await Designee.findOne({ email });
      if (!designee) {
        results.push({ email, status: "failed", message: "Designee not found." });
        continue;
      }
      if (!designee.from_user_id.includes(from_user_id)) {
        results.push({ email, status: "failed", message: "Not authorized to share voices with this designee." });
        continue;
      }
      const voiceExists = await Voice.findById(voice_id);
      if (!voiceExists) {
        results.push({ email, status: "failed", message: "Invalid voice ID." });
        continue;
      }
      let userSharedFile = await UserSharedFile.findOne({ from_user_id, to_email_id: email });
      if (!userSharedFile) {
        userSharedFile = new UserSharedFile({
          from_user_id,
          to_email_id: email,
          voices: [],
        });
      }
      const existingVoice = userSharedFile.voices.find(v => v.voice_id.toString() === voice_id);
      if (existingVoice) {
        existingVoice.access = access || existingVoice.access;
      } else {
        userSharedFile.voices.push({ voice_id, access });
      }
      await userSharedFile.save();
      if (notify) {
        const otp = designee.password;
        const body = `
          Hello ${designee.name},<br/><br/>
          Please click on the link below to access shared voice memos on Cumulus.<br/><br/>
          <a href='http://localhost:3000/SharedVoices?email=${email}&created_by=${from_user_id}'>
            http://localhost:3000/SharedVoices?email=${email}&created_by=${from_user_id}
          </a>
          <br/><br/>
          Your OTP is: ${otp}<br/><br/>
          Thanks,<br/>
          Cumulus Team!
        `;
        await sendEmail({
          to: email,
          subject: "Voice Sharing Invitation",
          body,
        });
        results.push({ email, status: "success", message: "Voice memo shared and email sent with OTP." });
      } else {
        results.push({ email, status: "success", message: "Voice memo shared successfully. No email sent." });
      }
    } catch (error) {
      console.error(`Error sharing voice memo with ${email}:`, error);
      results.push({ email, status: "failed", message: "Error sharing voice memo or sending email.", error: error.message });
    }
  }
  res.status(200).json({ message: "Voice sharing process completed.", results });
});

router.post("/get-shared-voices-nc", async (req, res) => {
  try {
    const { to_email_id } = req.body;
    if (!to_email_id) {
      return res.status(400).json({ message: "Email is required." });
    }
    // Fetch shared voices with populated voice details
    const sharedVoices = await UserSharedFile.find({ to_email_id })
      .populate("from_user_id", "username email")
      .populate({
        path: "voices.voice_id",
        select: "voice_name aws_file_link iv_voice_name iv_file_link duration file_size",
      });
    if (!sharedVoices || sharedVoices.length === 0) {
      return res.status(404).json({ message: "No shared voices found for this email." });
    }
    // Map and decrypt the shared voices
    const decryptedSharedVoices = sharedVoices.map((sharedVoice) => ({
      from_user: {
        username: sharedVoice.from_user_id?.username || "Unknown User",
        email: sharedVoice.from_user_id?.email || "Unknown Email",
        _id: sharedVoice.from_user_id?._id || null,
      },
      created_at: sharedVoice.created_at,
      shared_voices: sharedVoice.voices
        .filter((voice) => voice.voice_id) // Ensure voice_id exists
        .map((voice) => {
          const { voice_name, aws_file_link, iv_voice_name, iv_file_link, duration, file_size } =
            voice.voice_id;
          // Check for missing fields
          if (!voice_name || !iv_voice_name || !aws_file_link || !iv_file_link) {
            console.warn("Missing voice details for voice_id:", voice.voice_id._id);
            return null; // Skip this voice entry
          }
          // Decrypt fields
          const decryptedVoiceName = decryptvoice(voice_name, iv_voice_name);
          const decryptedVoiceLink = decryptvoice(aws_file_link, iv_file_link);
          return {
            voice_id: voice.voice_id._id,
            voice_name: decryptedVoiceName,
            aws_file_link: decryptedVoiceLink,
            duration,
            file_size,
            access: voice.access,
          };
        })
        .filter((voice) => voice !== null), // Remove null entries
    }));
    res.status(200).json({ voices: decryptedSharedVoices });
  } catch (error) {
    console.error("Error retrieving shared voices:", error);
    res.status(500).json({ message: "Error retrieving shared voices.", error: error.message });
  }
});

router.post("/get-shared-voices-cumulus", authenticateToken, async (req, res) => {
  try {
    const from_user_id = req.user.user_id;
    const user = await Userlogin.findById(from_user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const to_email_id = user.email;
    const sharedVoices = await UserSharedFile.find({ to_email_id })
      .populate("from_user_id", "username email")
      .populate({
        path: "voices.voice_id",
        select: "voice_name aws_file_link iv_voice_name iv_file_link duration file_size",
      });
      if (!sharedVoices || sharedVoices.length === 0) {
        return res.status(404).json({ message: "No shared voices found for this email." });
      }
      const decryptedSharedVoices = sharedVoices.map((sharedVoice) => ({
        from_user: {
          username: sharedVoice.from_user_id?.username || "Unknown User",
          email: sharedVoice.from_user_id?.email || "Unknown Email",
          _id: sharedVoice.from_user_id?._id || null,
        },
        created_at: sharedVoice.created_at,
        shared_voices: sharedVoice.voices
          .filter((voice) => voice.voice_id) 
          .map((voice) => {
            const { voice_name, aws_file_link, iv_voice_name, iv_file_link, duration, file_size } =
              voice.voice_id;
  
         
            if (!voice_name || !iv_voice_name || !aws_file_link || !iv_file_link) {
              console.warn("Missing voice details for voice_id:", voice.voice_id._id);
              return null; 
            }
  
            const decryptedVoiceName = decryptvoice(voice_name, iv_voice_name);
            const decryptedVoiceLink = decryptvoice(aws_file_link, iv_file_link);
  
            return {
              voice_id: voice.voice_id._id,
              voice_name: decryptedVoiceName,
              aws_file_link: decryptedVoiceLink,
              duration,
              file_size,
              access: voice.access,
            };
          })
          .filter((voice) => voice !== null), // Remove null entries
      }));
  
      res.status(200).json({ voices: decryptedSharedVoices });
  } catch (error) {
    console.error("Error retrieving shared voices:", error);
    res.status(500).json({ message: "Error retrieving shared voices.", error: error.message });
  }
});




router.post('/update-access', authenticateToken, async (req, res) => {
  const from_user_id = req.user.user_id;
  const { to_email_id, edit_access, file_id, voice_id } = req.body;


  if (!to_email_id || !edit_access || (!file_id && !voice_id)) {
    return res.status(400).json({ message: 'to_email_id, edit_access, and either file_id or voice_id are required.' });
  }

  try {
 
    const sharedRecord = await UserSharedFile.findOne({ from_user_id, to_email_id });

    if (!sharedRecord) {
      return res.status(404).json({ message: 'Shared record not found for the specified user and email.' });
    }

    let itemUpdated = false;


    if (file_id) {
      const file = sharedRecord.files.find(f => f.file_id.toString() === file_id);
      if (file) {
        file.access = edit_access;
        itemUpdated = true;
      }
    }

  
    if (voice_id) {
      const voice = sharedRecord.voices.find(v => v.voice_id.toString() === voice_id);
      if (voice) {
        voice.access = edit_access;
        itemUpdated = true;
      }
    }

    if (!itemUpdated) {
      return res.status(404).json({ message: 'Specified file_id or voice_id not found in the shared record.' });
    }


    await sharedRecord.save();

    res.status(200).json({ message: 'Access level updated successfully.' });
  } catch (error) {
    console.error('Error updating access level:', error);
    res.status(500).json({ message: 'An error occurred while updating access level.', error: error.message });
  }
});




router.get('/getting-all-shared-files', authenticateToken, async (req, res) => {
  try {
    const from_user_id = req.user.user_id;

    // Find all shared files where the from_user_id matches
    const sharedFiles = await UserSharedFile.find({ from_user_id })
      .populate('files.file_id', null, null, { retainNullValues: true })
      .populate('voices.voice_id', null, null, { retainNullValues: true });

    // Iterate through shared files and handle null references
    const result = await Promise.all(sharedFiles.map(async (sharedFile) => {
      const designee = await Designee.findOne({ email: sharedFile.to_email_id });

      return {
        to_email_id: sharedFile.to_email_id,
        files: sharedFile.files.map(file => ({
          file_id: file.file_id ? file.file_id._id : null,  // Only include the file_id and not encrypted fields
          file_name: file.file_id ? decryptField(file.file_id.file_name, file.file_id.iv_file_name) : null,  // Decrypt file name
          aws_file_link: file.file_id ? decryptField(file.file_id.aws_file_link, file.file_id.iv_file_link) : null,  // Decrypt file link
          access: file.access,
        })),
        voices: sharedFile.voices.map(voice => ({
          voice_id: voice.voice_id ? voice.voice_id._id : null,  // Only include the voice_id and not encrypted fields
          voice_name: voice.voice_id ? decryptvoice(voice.voice_id.voice_name, voice.voice_id.iv_voice_name) : null,  // Decrypt voice name
          aws_file_link: voice.voice_id ? decryptvoice(voice.voice_id.aws_file_link, voice.voice_id.iv_file_link) : null,  // Decrypt voice file link
          access: voice.access,
        })),
        designee: designee ? {
          name: designee.name,
          phone_number: designee.phone_number,
        } : { name: 'Unknown', phone_number: 'N/A' },
      };
    }));

    // Send the result with decrypted data
    res.json(result);
  } catch (err) {
    console.error('Error retrieving shared files:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;
