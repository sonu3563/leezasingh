const express = require("express");
const router = express.Router();
const { sendEmail } = require('../email/emailUtils');
const Subscription = require("../models/userSubscriptions");
const { authenticateToken } = require("../routes/userRoutes"); 
const { Designee, Userlogin } = require("../models/userModel");
const { File } = require("../models/userUpload");
const Voice = require("../models/uservoiceUpload");
const { decryptField } = require("../utilities/encryptionUtils");
const { decryptvoice } = require("../utilities/voiceencryptionUtils");
const Nominee = require("../models/nomineeModel"); 




// router.post("/add-nominee", authenticateToken, async (req, res) => {
//     const { nomineeEmail } = req.body;
  
//     try {
//       const userId = req.user.user_id;
//       if (!nomineeEmail) {
//         return res.status(400).json({ message: "Nominee email is required." });
//       }

//       const user = await Userlogin.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found." });
//       }

//       const nominee = await Userlogin.findOne({ email: nomineeEmail });
//       if (!nominee) {
//         return res.status(404).json({ message: "Nominee not found." });
//       }

//       const existingNominee = await Nominee.findOne({
//         user_id: userId,
//         nominee_id: nominee._id,
//       });
  
//       if (existingNominee) {
//         return res.status(400).json({ message: "Nominee is already assigned to this user." });
//       }

//       const newNominee = new Nominee({
//         user_id: userId,
//         nominee_id: nominee._id,
//       });
  
//       await newNominee.save();

//       const emailBody = `
//         Hello ${nominee.username},<br/><br/>
//         You have been added as a nominee by ${user.username}.<br/><br/>
//         You now have special access to their account in case of specific events.<br/><br/>
//         Thanks,<br/>
//         Cumulus Team
//       `;
  
//       await sendEmail({
//         to: nominee.email,
//         subject: "Nominee Assignment Notification",
//         body: emailBody,
//       });
  
//       res.status(200).json({ message: "Nominee added successfully and email sent." });
//     } catch (error) {
//       console.error("Error adding nominee:", error);
//       res.status(500).json({ message: "An error occurred while adding the nominee.", error: error.message });
//     }
//   });

  // router.post("/update-death-date", async (req, res) => {
  //   const { email, deathDate } = req.body;
  
  //   try {

  //     if (!email || !deathDate) {
  //       return res.status(400).json({ message: "Email and death date are required." });
  //     }

  //     const user = await Userlogin.findOne({ email });
  //     if (!user) {
  //       return res.status(404).json({ message: "User with the provided email not found." });
  //     }
  

  //     user.deathDate = new Date(deathDate);  
  //     await user.save();
  

  //     res.status(200).json({ message: "Death date updated successfully." });
  //   } catch (error) {
  //     console.error("Error updating death date:", error);
  //     res.status(500).json({ message: "An error occurred while updating the death date." });
  //   }
  // });
  


  // router.post("/nominee-share", authenticateToken, async (req, res) => {
  //   const { nomineeEmails, file_ids, voice_ids, access } = req.body;
  
  //   try {
  //     const userId = req.user.user_id;
  

  //     if (!nomineeEmails || nomineeEmails.length === 0) {
  //       return res.status(400).json({ message: "At least one nominee email is required." });
  //     }
  
  //     if ((!file_ids || file_ids.length === 0) && (!voice_ids || voice_ids.length === 0)) {
  //       return res.status(400).json({ message: "At least one file or voice is required." });
  //     }
  
  //     if (!access) {
  //       return res.status(400).json({ message: "Access level is required." });
  //     }
  

  //     const user = await Userlogin.findById(userId);
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found." });
  //     }
  
  //     for (const nomineeEmail of nomineeEmails) {
  //       const nominee = await Userlogin.findOne({ email: nomineeEmail });
  //       if (!nominee) {
  //         return res.status(404).json({ message: `Nominee with email ${nomineeEmail} not found.` });
  //       }
  

  //       const nomineeAssignment = await Nominee.findOne({
  //         user_id: userId,
  //         nominee_id: nominee._id,
  //       });
  
  //       if (!nomineeAssignment) {
  //         return res.status(400).json({ message: `Nominee with email ${nomineeEmail} is not assigned to this user.` });
  //       }
  

  //       if (file_ids && file_ids.length > 0) {
  //         nomineeAssignment.shared_files.push(...file_ids);
  //       }
  
  //       if (voice_ids && voice_ids.length > 0) {
  //         nomineeAssignment.shared_voices.push(...voice_ids);
  //       }
  
  //       nomineeAssignment.access = access; // Set the access level
  //       await nomineeAssignment.save();
  //     }
  
  //     res.status(200).json({ message: "Files and voices shared successfully with the nominees." });
  //   } catch (error) {
  //     console.error("Error sharing files and voices:", error);
  //     res.status(500).json({ message: "An error occurred while sharing files and voices.", error: error.message });
  //   }
  // });

  


  // router.post("/nominee-get-files-voices", authenticateToken, async (req, res) => {
  //   try {
  //     const nominee_id = req.user.user_id; 
      
 
  //     const nomineeAssignments = await Nominee.find({ nominee_id })
  //       .populate("user_id", "username email")
  //       .populate("shared_files")
  //       .populate("shared_voices");
  
  //     if (!nomineeAssignments || nomineeAssignments.length === 0) {
  //       return res.status(404).json({ message: "No files or voices found for this nominee." });
  //     }
  

  //     const groupedData = {};
  //     const currentDate = new Date();
  
  //     for (const assignment of nomineeAssignments) {
  //       const user = assignment.user_id; 
  //       const userId = user._id.toString();

      
  //     const userDetails = await Userlogin.findById(userId, "deathDate");
  //     if (!userDetails || !userDetails.deathDate) {
  //       continue; 
  //     }

  //     const deathDate = new Date(userDetails.deathDate);
  //     const oneYearAfterDeath = new Date(deathDate);
  //     oneYearAfterDeath.setFullYear(oneYearAfterDeath.getFullYear() + 1);

  //     if (currentDate > oneYearAfterDeath) {
  //       continue; 
  //     }
  
  //       if (!groupedData[userId]) {
  //         groupedData[userId] = {
  //           user_name: user.username, 
  //           access: assignment.access,
  //           created_at: assignment.created_at, 
  //           files: [],
  //           voices: [],
  //         };
  //       }
  

  //       const decryptedFiles = await File.find({ "_id": { $in: assignment.shared_files.map(file => file._id) } }).populate("folder_id");
  //       const decryptedFileDetails = decryptedFiles.map(file => {
  //         const fileName = decryptField(file.file_name, file.iv_file_name);
  //         const fileLink = decryptField(file.aws_file_link, file.iv_file_link);
  //         const folderName = file.folder_id ? decryptField(file.folder_id.folder_name, file.folder_id.iv_folder_name) : "Unknown Folder";
  
  //         return {
  //           file_name: fileName,
  //           aws_file_link: fileLink,
  //           folder_name: folderName,
  //           date_of_upload: file.date_of_upload,
  //           sharing_contacts: file.sharing_contacts.map(contact => ({
  //             user_id: contact.user_id,
  //             shared_on: contact.shared_on,
  //           })),
  //         };
  //       });

  //       const decryptedVoices = await Voice.find({ "_id": { $in: assignment.shared_voices.map(voice => voice._id) } });
  //       const decryptedVoiceDetails = decryptedVoices.map(voice => {
  //         const voiceName = decryptvoice(voice.voice_name, voice.iv_voice_name);
  //         const fileLink = decryptvoice(voice.aws_file_link, voice.iv_file_link);
  
  //         return {
  //           voice_name: voiceName,
  //           aws_file_link: fileLink,
  //           date_of_upload: voice.date_of_upload,
  //         };
  //       });
  //       groupedData[userId].files.push(...decryptedFileDetails);
  //       groupedData[userId].voices.push(...decryptedVoiceDetails);
  //     }
  
 
  //     const responseData = Object.values(groupedData);
  

  //     res.status(200).json(responseData);
  //   } catch (error) {
  //     console.error("Error retrieving files and voices:", error);
  //     res.status(500).json({ message: "An error occurred while fetching files and voices.", error: error.message });
  //   }
  // });





  router.post("/share-items", authenticateToken, async (req, res) => {
    const { to_email_id, file_ids, voice_ids, access, notify } = req.body;
    const from_user_id = req.user.user_id;
  
    if (!to_email_id || !Array.isArray(to_email_id) || (!file_ids && !voice_ids)) {
      return res.status(400).json({
        message: "Designee emails (array) and at least one of file IDs or voice IDs are required."
      });
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
          results.push({ email, status: "failed", message: "Not authorized to share items with this designee." });
          continue;
        }
  
        let nominee = await Nominee.findOne({ from_user_id, to_email_id: email });
        if (!nominee) {
          nominee = new Nominee({
            from_user_id,
            to_email_id: email,
            files: [],
            voices: []
          });
        }
  
        // Handle file sharing
        if (file_ids && Array.isArray(file_ids)) {
          for (const file_id of file_ids) {
            const fileExists = await File.findById(file_id);
            if (!fileExists) {
              results.push({ email, status: "failed", message: `Invalid file ID: ${file_id}` });
              continue;
            }
  
            const existingFile = nominee.files.find(f => f.file_id.toString() === file_id);
            if (existingFile) {
              existingFile.access = access || existingFile.access;
            } else {
              nominee.files.push({ file_id, access });
            }
          }
        }
  
        // Handle voice sharing
        if (voice_ids && Array.isArray(voice_ids)) {
          for (const voice_id of voice_ids) {
            const voiceExists = await Voice.findById(voice_id);
            if (!voiceExists) {
              results.push({ email, status: "failed", message: `Invalid voice ID: ${voice_id}` });
              continue;
            }
  
            const existingVoice = nominee.voices.find(v => v.voice_id.toString() === voice_id);
            if (existingVoice) {
              existingVoice.access = access || existingVoice.access;
            } else {
              nominee.voices.push({ voice_id, access });
            }
          }
        }
  
        await nominee.save();
  
        if (notify) {
          const otp = designee.password;
          const body = `
            Hello ${designee.name},<br/><br/>
            You have new items shared with you on Cumulus.<br/><br/>
            ${file_ids ? `<b>Files:</b> ${file_ids.length} files shared.<br/>` : ""}
            ${voice_ids ? `<b>Voices:</b> ${voice_ids.length} voices shared.<br/>` : ""}
            <a href='http://localhost:3000/SharedItems?email=${email}&created_by=${from_user_id}'>
              Click here to access shared items
            </a>
            <br/><br/>
            Your OTP is: ${otp}<br/><br/>
            Thanks,<br/>
            Cumulus Team!
          `;
          await sendEmail({
            to: email,
            subject: "Item Sharing Invitation",
            body
          });
          results.push({ email, status: "success", message: "Items shared successfully and email sent with OTP." });
        } else {
          results.push({ email, status: "success", message: "Items shared successfully. No email sent." });
        }
      } catch (error) {
        console.error(`Error sharing items with ${email}:`, error);
        results.push({
          email,
          status: "failed",
          message: "Error sharing items or sending email.",
          error: error.message
        });
      }
    }
  
    res.status(200).json({ message: "Sharing process completed.", results });
  });


  router.post("/get-shared-files-nc", async (req, res) => {
    try {
      const { to_email_id } = req.body;
      if (!to_email_id) {
        return res.status(400).json({ message: "Email is required." });
      }
  
      const sharedFiles = await Nominee.find({ to_email_id }) // Updated schema name to Nominee
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
  
  
  router.post("/get-shared-files-cumulus", authenticateToken, async (req, res) => {
    try {
      const from_user_id = req.user.user_id;
      const user = await Userlogin.findById(from_user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const to_email_id = user.email;
      const sharedFiles = await Nominee.find({ to_email_id })
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
  

  router.post("/get-shared-voices-nc", async (req, res) => {
    try {
      const { to_email_id } = req.body;
      if (!to_email_id) {
        return res.status(400).json({ message: "Email is required." });
      }
      // Fetch shared voices with populated voice details
      const sharedVoices = await Nominee.find({ to_email_id })
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
      const sharedVoices = await Nominee.find({ to_email_id })
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
  

module.exports = router;