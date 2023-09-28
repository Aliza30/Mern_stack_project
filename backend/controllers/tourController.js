import Tour from "../models/Tour.js";

// Create a new tour
export const createTour = async(req, res) => {
    const newTour = new Tour(req.body);
    try{
        const savedTour = await newTour.save();
        res.status(200).json({success: true, message: "Successfully created", data: savedTour});
    } catch(error) {
        res.status(500).json({ success: false, message: "Failed to create. Try again"});
    }
};


// Update a tour
export const updateTour = async(req, res) => {
    const id = req.params.id;
    try{
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true});
        res.status(200).json({success: true, message: "Successfully Updated", data: updatedTour});
    } catch(error){
        res.status(500).json({ success: false, message: "Failed to Update. Try again"});
    }
};


// Delete a tour
export const deleteTour = async(req, res) => {
    const id = req.params.id;
    try{
        await Tour.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Successfully Deleted"});
    } catch(error){
        res.status(500).json({ success: false, message: "Failed to Delete. Try again"});
    }
};


// Get single tour
export const getSingleTour = async(req, res) => {
    const id = req.params.id;
    try{
        const tour = await Tour.findById(id).populate("reviews");
        res.status(200).json({success: true, message: "Found", data: tour});
    } catch(error){
        res.status(500).json({ success: false, message: "Not Found"});
    }
};


// Get all tour
export const getAllTour = async(req, res) => {
    // For Pagination
    const page = parseInt(req.query.page);
    try{
        const tours = await Tour.find({}).populate("reviews").skip(page*8).limit(8);
        res.status(200).json({success: true, count: tours.length, message: "Found", data: tours});
    } catch(error){
        res.status(500).json({ success: false, message: "Not Found. Try again"});
    }
};


// Get tour by Search
export const getTourBySearch = async(req, res) => {
    // i = case sensitive
    const city = new RegExp(req.query.city, "i");
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);
    try{
        // get = greater then equal
        const tours = await Tour.find({ city, distance:{$gte : distance}, maxGroupSize : {$gte:maxGroupSize}}).populate("reviews");
        res.status(200).json({success: true, message: "Successful", data: tours});
    } catch(error){
        res.status(404).json({ success: false, message : "Try again"});
    }
}


// Get featured tour
export const getFeaturedTours = async(req, res) => {
    try{
        const tours = await Tour.find({ featured: true}).populate("reviews").limit(8);
        res.status(200).json({success: true, message: "Successful", data: tours});
    } catch(err) {
        res.status(404).json({success: false, message: "Not found"});
    }
};


// Get tour count
export const getTourCount = async(req, res) => {
    try{
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({success: true, data: tourCount});
    } catch(err) {
        res.status(500).json({success: false, message: "Failed to fetch"});
    }
};
