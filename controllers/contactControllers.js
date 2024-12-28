const asyncHandler = require('express-async-handler');
const Contact = require("../models/contact");

exports.getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts);
})

exports.getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Unauthorized to access this contact")
    }
    res.status(200).json(contact);
})

exports.addNewContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({name, email, phone, user_id: req.user.id})
    res.status(200).json(contact);
})

exports.updateContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Unauthorized to access this contact")
    }
    const { name, email, phone } = req.body
    if (name) contact.name = name
    if (email) contact.email = email
    if (phone) contact.phone = phone
    const updatedContact = await contact.save()
    res.status(200).json(updatedContact);
})

exports.deleteContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Unauthorized to access this contact")
    }
    await Contact.deleteOne({_id : contact._id})
    res.status(200).json(contact);
}) 