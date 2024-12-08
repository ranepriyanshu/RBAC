import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Education } from "../models/education.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Certificate } from "../models/certificate.model.js";
import { Project } from "../models/project.model.js";
import { POR } from "../models/por.model.js";
import { WorkExperience } from "../models/workExperience.model.js";

const uploadUserProfilePicture = asyncHandler(async (req, res) => {
  console.log("uploadUserProfilePicture API Called")
  //Extracting the local path of the file
  const profilePictureLocalPath = req.files?.profilePicture[0]?.path;

  // if local path does not exist that means file DNE on server
  if (!profilePictureLocalPath) {
    throw new ApiError(404, "Kindly attach profile picture");
  }

  // Upload file on cloudinary
  const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);

  // If url not received from cloudinary
  if (!profilePicture) {
    throw new ApiError(400, 'Failed to upload picture on cloudinary!!');
  }

  // if everything is perfect then update the url received from cloudinary
  const updatedUser = await User.findByIdAndUpdate(req.user._id, { profilePicture: profilePicture?.url }, { new: true }).select("-password -refreshToken");
  // Here due to {new : true}, we will get the updated user

  return res.status(200).json(
    new ApiResponse(200, updatedUser, "Profile Picture uploaded successfully")
  );

})

const addEducation = asyncHandler(async (req, res) => {
  console.log("addEducation API Called")
  const { university, degree, grade, fieldOfStudy, startDate, endDate } = req.body;
  const createEducation = await Education.create({
    university,
    degree,
    grade,
    fieldOfStudy,
    startDate,
    endDate
  });

  if (!createEducation) {
    throw new ApiError(400, "Failed to create education detail!!");
  }

  const user = await User.findById(req.user._id);
  user.profileSection.education.push(createEducation._id);
  await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Education added successfully!!"
    )
  );
})

const addProject = asyncHandler(async (req, res) => {
  console.log("addProject API Called")
  const { projectTitle, description, projectLink, skills } = req.body;
  const createProject = await Project.create({
    projectTitle,
    description,
    projectLink,
    skills
  });

  if (!createProject) {
    throw new ApiError(400, 'Failed to upload project!!');
  }

  const user = await User.findById(req.user._id);
  user.profileSection.project.push(createProject._id);
  await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Project added successfully!!"
    )
  )
})

const addCertificate = asyncHandler(async (req, res) => {
  console.log("addCertificate API Called")

  const { title, certificateLink, description } = req.body;
  const createCertificate = await Certificate.create({
    title,
    certificateLink,
    description
  });

  if (!createCertificate) {
    throw new ApiError(400, 'Failed to upload certificate!!');
  }

  const user = await User.findById(req.user._id);
  user.profileSection.certificate.push(createCertificate._id);
  await user.save();

  res.status(200).json(
    new ApiResponse(200, "Certificate created successfully!!")
  );
})

const addPosOfRes = asyncHandler(async (req, res) => {
  console.log("addPosOfRes API Called")

  const { positionOfResponsibility, institute } = req.body;
  const createPosOfRes = await POR.create({
    positionOfResponsibility,
    institute
  });

  if (!createPosOfRes) {
    throw new ApiError(400, 'Failed to upload position of responsibility!!');
  }

  const user = await User.findById(req.user._id);
  user.profileSection.positionOfResponsibility.push(createPosOfRes._id);
  await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Position of Responsibility added successfully!!"
    )
  )
})

const addWorkExperience = asyncHandler(async (req, res) => {
  console.log("addWorkExperience API Called")

  const { companyName, certificateLink, startDate, endDate } = req.body;
  const createWorkExperience = await WorkExperience.create({
    companyName,
    certificateLink,
    startDate,
    endDate
  });

  if (!createWorkExperience) {
    throw new ApiError(400, 'Failed to upload work experience!!');
  }
  const user = await User.findById(req.user._id);
  user.profileSection.workExperience.push(createWorkExperience._id);
  await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Work Experience added successfully!!"
    )
  )
})

const addSkill = asyncHandler(async (req, res) => {
  console.log("addSkill API Called")

  const { skill } = req.body;

  if (!skill) {
    throw new ApiError(400, 'Please enter a skill');
  }

  const user = await User.findById(req.user._id);
  user.profileSection.skills.push(skill);
  await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Skill added successfully!!"
    )
  )
})

const deleteEducation = asyncHandler(async (req, res) => {
  const { educationId } = req.params;

  const deletedEducation = await Education.findByIdAndDelete(educationId);

  if (!deletedEducation) {
    throw new ApiError(400, 'Failed to delete education!!');
  }

  const user = await User.findByIdAndUpdate(req.user._id, { $pull: { "profileSection.education": educationId } });

  if (!user) {
    throw new ApiError(500, 'Failed to make changes in database!!');
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Education deleted successfully!!"
    )
  )
})

const deleteCertificate = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;

  const deletedCertificate = await Certificate.findByIdAndDelete(certificateId);

  if (!deletedCertificate) {
    throw new ApiError(400, 'Failed to delete certificate!!');
  }

  const user = await User.findByIdAndUpdate(req.user._id, { $pull: { "profileSection.certificate": certificateId } });

  if (!user) {
    throw new ApiError(500, 'Failed to make changes in database!!');
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Certificate deleted successfully!!"
    )
  )
})

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const deletedProject = await Project.findByIdAndDelete(projectId);
  if (!deletedProject) {
    throw new ApiError(400, 'Failed to delete project!!');
  }
  const user = await User.findByIdAndUpdate(req.user._id, { $pull: { "profileSection.project": projectId } });
  if (!user) {
    throw new ApiError(500, 'Failed to make changes in database!!');
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      "Project deleted successfully!!"
    )
  )
})

const deletePosOfRes = asyncHandler(async (req, res) => {
  const { posOfResId } = req.params;
  const deletedPosOfRes = await POR.findByIdAndDelete(posOfResId);
  if (!deletedPosOfRes) {
    throw new ApiError(400, 'Failed to delete position of responsibility!!');
  }
  const user = await User.findByIdAndUpdate(req.user._id, { $pull: { "profileSection.positionOfResponsibility": posOfResId } });
  if (!user) {
    throw new ApiError(500, 'Failed to make changes in database!!');
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      "Position of Responsibility deleted successfully!!"
    )
  )
})

const deleteWorkExperience = asyncHandler(async (req, res) => {
  const { workExperienceId } = req.params;
  const deletedWorkExperience = await WorkExperience.findByIdAndDelete(workExperienceId);

  if (!deletedWorkExperience) {
    throw new ApiError(400, 'Failed to delete work experience!!');
  }

  const user = await User.findByIdAndUpdate(req.user._id, { $pull: { "profileSection.workExperience": workExperienceId } });

  if (!user) {
    throw new ApiError(500, 'Failed to make changes in database!!');
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      "Work Experience deleted successfully!!"
    )
  )
})

const deleteSkill = asyncHandler(async (req, res) => {
  const { skill } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { $pull: { "profileSection.skills": skill } });
  if (!user) {
    throw new ApiError(500, 'Failed to make changes in database!!');
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      "Skill deleted successfully!!"
    )
  )
})

const viewProfile = asyncHandler(async (req, res) => {
  console.log("viewProfile API Called")

  const { userId } = req.params;
  const user = await User.findById(userId).populate('profileSection.education').populate('profileSection.positionOfResponsibility').populate('profileSection.project').populate('profileSection.workExperience').populate('profileSection.certificate');

  if (!user) {
    throw new ApiError(404, 'User not found!!');
  }

  const profileSection = {
    ...user.profileSection.toObject(),
    domain: user.domain,
    fullName: user.fullName,
    collegeName: user.collegeName,
    profilePicture: user.profilePicture,
    role: user.role
  };

  if (!profileSection) {
    throw new ApiError(404, 'User profileSection does not exist!!');
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "User profile retrieved successfully!!",
      profileSection,
    )
  )
})

const getNotifications = asyncHandler(async (req, res) => {
  console.log("getNotifications API Called")

  const user = await User.findById(req.user._id).populate({
    path: 'notifications',
    options: { sort: { createdAt: -1 }, limit: 10 }
  });
  const notifications = user.notifications;
  if (!user) {
    throw new ApiError(404, 'User not found!!');
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      "Notifications retrieved successfully!!",
      notifications
    )
  )
})

const getProfileDetail = asyncHandler(async (req, res) => {
  console.log('getProfileDetail API Called');
  const myId = req.user._id;

  const user = await User.findById(myId).populate('profileSection.education').populate('profileSection.positionOfResponsibility').populate('profileSection.project').populate('profileSection.workExperience').populate('profileSection.certificate');

  if (!user) {
    throw new ApiError(404, 'User not found!!');
  }

  const profileSection = {
    ...user.profileSection.toObject(),
    profilePicture: user.profilePicture,
  };

  if (!profileSection) {
    throw new ApiError(404, 'User profileSection does not exist!!');
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Logged In user profile retrieved successfully!!",
      profileSection
    )
  )

})

export { addEducation, uploadUserProfilePicture, addCertificate, addProject, addPosOfRes, addWorkExperience, addSkill, deleteEducation, deleteCertificate, deleteProject, deletePosOfRes, deleteWorkExperience, deleteSkill, viewProfile, getNotifications, getProfileDetail }