const Caregiver = require("../cg_model/cg_model");  // Changed from User to Caregiver

const getAllCaregivers = async (req, res, next) => {
    let caregivers;  // Changed from users to caregivers

    try {
        caregivers = await Caregiver.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (!caregivers || caregivers.length === 0) {
        return res.status(404).json({ message: "No caregivers found" });
    }

    return res.status(200).json({ caregivers });
};

const addCaregiver = async (req, res, next) => {
    const {profilePhoto,fullName,phoneNumber,email,address,language,qualifications,certifications,experience,typeOfCare,availability,workingHours,daysAvailable,preferredWorkingHours} = req.body;
    let caregiver;

    try{
        caregiver = new Caregiver({profilePhoto,fullName,phoneNumber,email,address,language,qualifications,certifications,experience,typeOfCare,availability,workingHours,daysAvailable,preferredWorkingHours});
        await caregiver.save();
    }catch (err){
        console.log(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (!caregiver){
        return res.status(404).json({message: "unable to add caregiver"});
    }
    return res.status(200).json({caregiver});
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    let caregiver;
    try {
        caregiver = await Caregiver.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }
    if (!caregiver) {
        return res.status(404).json({ message: "Caregiver not found" });
    }
    return res.status(200).json({ caregiver });
};

const updateCaregiver = async (req, res, next) => {
    const id = req.params.id;
    const {profilePhoto,fullName,phoneNumber,email,address,language,qualifications,certifications,experience,typeOfCare,availability,workingHours,daysAvailable,preferredWorkingHours} = req.body;

    let caregiver;

    try{
        caregiver = await Caregiver.findByIdAndUpdate(id, {
            profilePhoto, 
            fullName,
            phoneNumber,
            email,
            address,
            language,
            qualifications,
            certifications,
            experience,
            typeOfCare,
            availability,
            workingHours,
            daysAvailable,
            preferredWorkingHours
        }, { new: true }); // Added { new: true } to return the updated document
    }catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }
    if (!caregiver) {
        return res.status(404).json({ message: "Unable to update caregiver details" });
    }
    return res.status(200).json({ caregiver });
};

const deleteCaregiver = async (req, res, next) => {
    const id = req.params.id;

    let caregiver;

    try{
        caregiver = await Caregiver.findByIdAndDelete(id);
    }catch (err){
        console.log(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }
    if (!caregiver) {
        return res.status(404).json({ message: "Unable to delete caregiver" });
    }
    return res.status(200).json({ caregiver });
};

exports.getAllCaregivers = getAllCaregivers;
exports.addCaregiver = addCaregiver;
exports.getById = getById;
exports.updateCaregiver = updateCaregiver;
exports.deleteCaregiver = deleteCaregiver;