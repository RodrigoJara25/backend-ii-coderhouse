import userModel from "../models/user.model.js";

export default class User {

    getUsers = async () => {
        try {
            const users = await userModel.find().lean();
            return users;
        } catch (error) {
            console.error("Error fetching users:", error.message);
            return [];
        }
    }

    getUserById = async (id) => {
        try {
            const user = await userModel.findById(id).lean();
            return user || null;
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error.message);
            return null;
        }
    }

    getUserByEmail = async (email) => {
        try {
            const user = await userModel.findOne({ email: email }).lean();
            return user || null;
        } catch (error) {
            console.error(`Error fetching user with email ${email}:`, error.message);
            return null;
        }
    }

    createUser = async (userData) => {
        try {
            const newUser = await userModel.create(userData);
            await newUser.save();
            return newUser;
        } catch (error) {
            console.error("Error creating user:", error.message);
            return null;
        }
    }

    updateUser = async (userId, updateData) => {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true }).lean();
            return updatedUser;
        } catch (error) {
            console.error(`Error updating user with ID ${userId}:`, error.message);
            return null;
        }
    }

    deleteUser = async (id) => {
        try {
            const deleted = await userModel.findByIdAndDelete(id).lean();
            return deleted || null;
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error.message);
            return null;
        }
    }
}