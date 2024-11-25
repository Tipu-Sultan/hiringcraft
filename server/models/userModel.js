const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    mobile: { type: String,default: '' },
    password: { type: String },
    role: { type: String, enum: ['normal', 'employer', 'super-admin'], default: 'normal' },
    profileImage: { type: String, default: '' },
    address: { type: String, default: '' },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    verificationToken: { type: String, unique: true, sparse: true },
    isVerified: { type: Boolean, default: false },
    isOtp: { type: Number, default: null },
    otpExpires: { type: Date, default: null },
    summary: { type: String, default: '' },
    profileVisibility: [{
      email: { type: String, default: ''},
      mobile: { type: String, default: '' },
      resume: { type: String, default: '' },
      passingYear: { type: String, default: '' },
      cgpaOrPercentage: { type: String, default: '' }
    }],
    education: [{
      CourseOrBranchName: { type: String,default: '' },
      collegeOrUniversity: { type: String,default: '' },
      collegeOrUniversityAddress: { type: String,default: ''},
      passingYear: { type: String,default: '' },
      cgpaOrPercentage: { type: String,default: '' }
    }],
    projects: [{
      projectTitle: { type: String ,default: ''},
      projectDuration: { type: String ,default: ''},
      projectDescription: { type: String ,default: ''},
      projectCodeOrHostLink: { type: String ,default: ''}
    }],
    experience: [{
      companyName: { type: String,default: '' },
      jobProfile: { type: String,default: '' },
      jobType: { type: String,default: '' },
      jobDescription: { type: String,default: '' }
    }],
    resumeOrCv: { type: String, default: '' }
  },
  { timestamps: true }
);

// Ensure the password is hashed before saving the user document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt); 
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('hiringcraft', userSchema);

module.exports = User;
