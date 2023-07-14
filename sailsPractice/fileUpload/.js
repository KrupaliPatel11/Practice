const uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
      file.upload({
        // set the upload options, such as the maximum file size
        maxBytes: 10000000
      }, (err, uploadedFiles) => {
        if (err) return reject(err);
  
        // resolve with the file name of the uploaded file
        resolve(uploadedFiles[0].fd);
      });
    });
  };
  
  const createProfile = async (profileData, profilePicFile) => {
    try {
      const profilePicName = await uploadFile(profilePicFile);
      console.log(profilePicName);
  
      // add the profile pic name to the profile data
      profileData.profilePic = profilePicName;
  
      // create the profile in the database
      const createdProfile = await Profile.create(profileData).fetch();
  
      return createdProfile;
    } catch (err) {
      throw new Error(err);
    }
  };
  
  // call the function to create the profile
  createProfile({
    // set the profile data, such as the user's name and email
    name: "John Doe",
    email: "john@example.com"
  }, req.file("profilePic")).then((createdProfile) => {
    console.log("Profile created:", createdProfile);
  }).catch((err) => {
    console.error("Error creating profile:", err);
  });
  
