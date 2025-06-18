const Contact=require('../models/contactModel')
const asyncHandler=require('express-async-handler')

//@desc get all contacts
//@route get/api/contacts
//access public
const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts)
})

//@desc create a contact
//@route post/api/contacts
//access public
const createContact=asyncHandler(async(req,res)=>{
    console.log("The request body:",req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const contact= await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(contact);
})

//@desc update a contact
//@route put/api/contacts
//access public
const updateContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if (contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update others user contacts");
    }
    const updatecontact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updatecontact)
})

//@desc delete a contact
//@route delete/api/contacts
//access public
const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if (contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update others user contacts");
    }
    const deletecontact=await Contact.findByIdAndDelete(req.params.id,req.body);
    res.status(200).json(deletecontact);
})

//@desc get only one contact
//@route get/api/contacts
//access public
const getContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})


module.exports={createContact,getContact,getContacts,updateContact,deleteContact};