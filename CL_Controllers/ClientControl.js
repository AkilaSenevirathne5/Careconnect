// CL_Controller/clientControl.js
const Client = require("../CL_Model/ClientModel");

const getAllClients = async (req, res, next) => {
    let clients;

    try {
        clients = await Client.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (!clients || clients.length === 0) {
        return res.status(404).json({ message: "No clients found" });
    }

    return res.status(200).json({ clients });
};

const addClient = async (req, res, next) => {
    console.log('=== Client Form Submission ===');
    console.log('Received client data:', JSON.stringify(req.body, null, 2));
    
    try {
        // Validate request body
        if (!req.body || Object.keys(req.body).length === 0) {
            console.log('Empty request body received');
            return res.status(400).json({
                success: false,
                message: "No data provided in request"
            });
        }

        const {
            name,
            age,
            contactNumber,
            location,
            typeOfCare,
            helpTiming,
            hoursPerWeek,
            durationOfHelp,
            allergies,
            medicalConditions,
            careSchedule,
            preferredCaregiverGender,
            preferredCaregiverLanguage
        } = req.body;

        // Create new client instance
        const client = new Client({
            name,
            age: Number(age),
            contactNumber: contactNumber || '',
            location,
            typeOfCare,
            helpTiming,
            hoursPerWeek,
            durationOfHelp,
            allergies,
            medicalConditions,
            careSchedule,
            preferredCaregiverGender,
            preferredCaregiverLanguage
        });

        console.log('Attempting to save client:', JSON.stringify(client, null, 2));

        // Save to database
        const savedClient = await client.save();
        console.log('Client saved successfully:', savedClient);

        return res.status(201).json({
            success: true,
            message: "Client created successfully",
            client: savedClient
        });

    } catch (err) {
        console.error('Error saving client:', err);

        if (err.name === 'ValidationError') {
            const validationErrors = Object.values(err.errors).map(e => e.message);
            console.log('Validation errors:', validationErrors);
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validationErrors
            });
        }

        return res.status(500).json({
            success: false,
            message: "Database error",
            error: err.message
        });
    }
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    let client;
    try {
        client = await Client.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }
    if (!client) {
        return res.status(404).json({ message: "Client not found" });
    }
    return res.status(200).json({ client });
};

const updateClient = async (req, res, next) => {
    const id = req.params.id;
    const {
        name,
        age,
        contactNumber,
        location,
        typeOfCare,
        helpTiming,
        hoursPerWeek,
        durationOfHelp,
        allergies,
        medicalConditions,
        careSchedule,
        preferredCaregiverGender,
        preferredCaregiverLanguage
    } = req.body;

    let client;

    try {
        client = await Client.findByIdAndUpdate(id, {
            name,
            age,
            contactNumber,
            location,
            typeOfCare,
            helpTiming,
            hoursPerWeek,
            durationOfHelp,
            allergies,
            medicalConditions,
            careSchedule,
            preferredCaregiverGender,
            preferredCaregiverLanguage
        }, { new: true });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }
    if (!client) {
        return res.status(404).json({ message: "Unable to update client details" });
    }
    return res.status(200).json({ client });
};

const deleteClient = async (req, res, next) => {
    const id = req.params.id;

    let client;

    try {
        client = await Client.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error", error: err.message });
    }
    if (!client) {
        return res.status(404).json({ message: "Unable to delete client" });
    }
    return res.status(200).json({ client });
};

exports.getAllClients = getAllClients;
exports.addClient = addClient;
exports.getById = getById;
exports.updateClient = updateClient;
exports.deleteClient = deleteClient;