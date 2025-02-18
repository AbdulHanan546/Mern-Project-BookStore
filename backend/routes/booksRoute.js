import express from "express";
import { Book } from "../models/bookmodel.js";

const router = express.Router()

router.post("/",  async (request,response) => {
    try{
     if (!request.body.title || !request.body.author || !request.body.publishYear) {
        return response.status(400).send({
            message: "Send all the required attributes"
        })
     }
     const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear
     }
     const book = await Book.create(newBook)
     return response.status(200).send(book)

    }catch (error){
       console.log(error.message)
    }

})

router.get("/", async(request,response) => {
    try{
        const books = await Book.find({})
        return response.status(200).json(
            {
                count: books.length,
                data: books
            }
        )

    }catch(error){
        console.log(error.message)
        return response.status(500).send({message: error.message})
    }
})


// get book by id
router.get("/:id", async(request,response) => {
    try{

        const {id} = request.params
        const book = await Book.findById(id)
        return response.status(200).json(book)
        

    }catch(error){
        console.log(error.message)
        return response.status(500).send({message: error.message})
    }
})

//update the book by id

router.put("/:id",   async(request,response) => {
    try{

        if (!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send("Please provide all the required attributes")
        }

        const {id} = request.params
        const result =  await Book.findByIdAndUpdate(id,request.body)
       if (!result){
        return response.status(404).json(
            {message: "Book Not found"}
        )
       }
       return response.status(200).send({message: "Book updated successfully"})


    }catch(error){
        return response.status(500).send({message: error.message})
    }
})

router.delete("/:id", async(request,response) => {
    try{
        const {id} = request.params
        const result = await Book.findByIdAndDelete(id)
        if (!result){
            return response.status(404).send({message: "Book Not found"})
        }
        return response.status(200).send({message: "Book deleted successfully"})
    } catch(error){
        return response.status(500).send({message: error.message})
    }
    
})

export  default router