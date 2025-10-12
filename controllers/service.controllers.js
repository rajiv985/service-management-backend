import Service from "../models/service.model.js";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

export const createService = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return next(new ApiError(400, "Title and description are required"));
    }

    const service = await Service.create({
      user: req.user._id,
      title,
      description,
    });

    res.status(201).json(new ApiResponse(201, "Service created successfully", service));
  } catch (error) {
    console.error("Error creating service:", error);
    next(new ApiError(500, "Error creating service"));
  }
};


export const getUserServices = async (req, res, next) => {
  try {
    const services = await Service.find({ user: req.user._id });
    res.status(200).json(new ApiResponse(200, "User services fetched", services));
  } catch (error) {
    next(new ApiError(500, "Error fetching services"));
  }
};

// Update a service
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Service.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return next(new ApiError(404, "Service not found"));
    res.status(200).json(new ApiResponse(200, "Service updated", updated));
  } catch (error) {
    next(new ApiError(500, "Error updating service"));
  }
};

// Delete a service
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findOneAndDelete({ _id: id, user: req.user._id });
    if (!deleted) return next(new ApiError(404, "Service not found"));
    res.status(200).json(new ApiResponse(200, "Service deleted"));
  } catch (error) {
    next(new ApiError(500, "Error deleting service"));
  }
};
