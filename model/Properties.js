import mongoose from "mongoose"

// Define User Schema
const propertySchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique:true
    },
    email:String,
    address:{
        type:String,
        required: true,
        unique:true
    },
    videos:[
        {
            public_id: {
                type: String,
                required: true,
              },
              url: {
                type: String,
                required: true,
              },
        }
    ],
    images:[
        {
            public_id: {
                type: String,
                required: true,
              },
              url: {
                type: String,
                required: true,
              },
        }
    ]
});

// Create User Model
export const Property = mongoose.model('Property', propertySchema);
