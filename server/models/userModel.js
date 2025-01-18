const mongoose = require("mongoose");
const Subscription = require('./userSubscriptions');
// Role Schema
const RoleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, unique: true },
});
const Role = mongoose.model("Role", RoleSchema);
// Security Question Schema
const SecurityQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
});
const SecurityQuestion = mongoose.model("SecurityQuestion", SecurityQuestionSchema);
// User Question Schema (for storing questions and answers linked to users)
const UserQuestionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  questions: [
    {
      question_id: { type: mongoose.Schema.Types.ObjectId, ref: "SecurityQuestion", required: true }, // Reference to SecurityQuestion
      answer: { type: String, required: true }, 
    },
  ],
});
const UserQuestion = mongoose.model("UserQuestion", UserQuestionSchema);
// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, default: null },
  roles: [
    {
      role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
      roleName: { type: String, required: true },
    },
  ],
  questions: { type: Boolean, default: false },
  memberships: [
    {
      subscription_id: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", default: null },
      buyingDate: { type: Date, default: null }, // Default to null if no membership exists yet
      planTime: { type: String, enum: ["monthly", "yearly", "custom"], default: null }, // Default to null
      expiryDate: { type: Date, default: null }, // Default to null
    },
  ],
  activeMembership: { type: Boolean, default: false }, // Default to false for new users

  // nominees: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Array of references to User schema
  // ],
  deathDate: { type: Date, default: null },
});
// Middleware to calculate expiryDate and update activeMembership
UserSchema.pre('save', function (next) {
  console.log("Pre-save middleware triggered.");
  if (this.memberships && this.memberships.length > 0) {
    const latestMembership = this.memberships[this.memberships.length - 1];
    console.log("Latest membership found:", latestMembership);
    if (latestMembership.buyingDate && latestMembership.planTime) {
      // Calculate expiryDate based on planTime
      if (latestMembership.planTime === "monthly") {
        console.log("Plan time is 'monthly'. Calculating expiry date...");
        latestMembership.expiryDate = new Date(latestMembership.buyingDate);
        latestMembership.expiryDate.setMonth(latestMembership.expiryDate.getMonth() + 1);
        console.log("Expiry date set to:", latestMembership.expiryDate);
      } else if (latestMembership.planTime === "yearly") {
        console.log("Plan time is 'yearly'. Calculating expiry date...");
        latestMembership.expiryDate = new Date(latestMembership.buyingDate);
        latestMembership.expiryDate.setFullYear(latestMembership.expiryDate.getFullYear() + 1);
        console.log("Expiry date set to:", latestMembership.expiryDate);
      } else if (latestMembership.planTime === "custom") {
        console.log("Plan time is 'custom'. No expiry date will be set.");
        latestMembership.expiryDate = null;
      }
    } else {
      console.log("Membership has no buying date or plan time. Skipping expiry date calculation.");
    }
    // Update activeMembership based on the expiryDate of the latest membership
    const currentDate = new Date();
    console.log("Current date:", currentDate);
    // Check if the expiry date of the latest membership has passed
    if (latestMembership.expiryDate && latestMembership.expiryDate < currentDate) {
      this.activeMembership = false; // Expiry date has passed, set activeMembership to false
    } else {
      this.activeMembership = true; // Active membership if expiry date is valid or not set
    }
    console.log("Active membership status set to:", this.activeMembership);
  } else {
    console.log("No memberships found. Setting activeMembership to false.");
    this.activeMembership = false;
  }
  next();
});
// Query helper to ensure `activeMembership` is updated dynamically
UserSchema.post('find', function (docs) {
  console.log("Post-find middleware triggered.");
  const currentDate = new Date();
  console.log("Current date:", currentDate);
  docs.forEach((doc) => {
    if (doc.memberships && doc.memberships.length > 0) {
      const latestMembership = doc.memberships[doc.memberships.length - 1];
      console.log("Processing membership for user:", doc.username);
      console.log("Latest membership:", latestMembership);
      // Check if the expiry date of the latest membership has passed
      if (latestMembership.expiryDate && latestMembership.expiryDate < currentDate) {
        doc.activeMembership = false; // Expiry date has passed, set activeMembership to false
      } else {
        doc.activeMembership = true; // Active membership if expiry date is valid or not set
      }
      console.log("Active membership status updated to:", doc.activeMembership);
    } else {
      console.log("No memberships found for user:", doc.username);
      doc.activeMembership = false;
    }
  });
});
// Static method to refresh all users' activeMembership status
UserSchema.statics.refreshMembershipStatus = async function () {
  console.log("Refreshing membership statuses for all users...");
  const users = await this.find();
  const currentDate = new Date();
  console.log("Current date:", currentDate);
  await Promise.all(
    users.map(async (user) => {
      console.log("Processing user:", user.username);
      if (user.memberships && user.memberships.length > 0) {
        const latestMembership = user.memberships[user.memberships.length - 1];
        console.log("Latest membership:", latestMembership);
        // Check if the expiry date of the latest membership has passed
        if (latestMembership.expiryDate && latestMembership.expiryDate < currentDate) {
          user.activeMembership = false; // Expiry date has passed, set activeMembership to false
        } else {
          user.activeMembership = true; // Active membership if expiry date is valid or not set
        }
        console.log("Active membership status set to:", user.activeMembership);
      } else {
        console.log("No memberships found for user:", user.username);
        user.activeMembership = false;
      }
      await user.save();
      console.log("User updated:", user.username);
    })
  );
};



const ProfilePictureSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
      required: true,
    },
    profilePicture: {
      type: String, // Encrypted path to the uploaded profile picture
      required: true,
    },
    iv: {
      type: String, // Initialization vector for decryption
      required: true,
    },
  },
  { timestamps: true }
);

const ProfilePicture = mongoose.model("ProfilePicture", ProfilePictureSchema);
const Userlogin = mongoose.model("User", UserSchema);


const UserSharedFileSchema = new mongoose.Schema({
  from_user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, 
  to_email_id: { 
    type: String, 
    required: true, 
    ref: "Designee" 
  }, 
  files: [{ 
    file_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "File", 
      required: true 
    },
    access: { 
      type: String, 
      default: null
    }
  }],
  voices: [
    {
      voice_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voice",
        required: true,
      },
      access: {
        type: String,
        default: null,
      },
    },
  ],
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});
const UserSharedFile = mongoose.model("UserSharedFile", UserSharedFileSchema);
const DesigneeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  password: { type: String, required: false },
  from_user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  member: { type: Boolean, required: true, default: false }, 
});
const Designee = mongoose.model("Designee", DesigneeSchema);
module.exports = { Role, SecurityQuestion, Userlogin, UserQuestion, ProfilePicture, UserSharedFile, Designee };