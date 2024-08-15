import prisma from "../prisma/prisma.js";
import Joi from "joi";

// Create - POST
const CategoryCreate = async (req, res) => {
    try {
        // const { categoryName, description } = req.body;
        const Validator = await CategoryValidator(req.body);
        if (Validator.message) return res.status(400).json({ message: Validator.message });
        await prisma.category.create({
            data: req.body
        })
            .then( result => res.status(201).json(result))
            .catch( error => res.status(400).json({ message: error.message }));
        // return res.status(200).json(Validator);
        // await prisma.category.create({
        //     data: {
        //         categoryName,
        //         description,
        //     }
        // }).then(result => res.status(201).json(result))
        //   .catch( error => res.status(400).json({ message: error.message}));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//  Read All  - GET
const CategoryGetAll = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                products: true,
            }
        });
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//  Read by Id - GET
const CategoryGetById = async (req, res) => {
    try {
        const { id } = req.params;
        // const category = await prisma.category.findUnique({ where: { categoryId: +id } });
        // if (!category) return res.status(404).json({ message: 'Category not found' });
        // return res.status(200).json(category);
        await prisma.category.findUnique({ where: { categoryId: +id } })
                             .then( result => {
                                if (!result) return res.status(404).json({ message: 'Category not found' });
                                return res.status(200).json(result);
                             })
                             .catch( error => res.status(400).json({ message: error.message }));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//  Update - PUT / PATCH
const CategoryUpdateById = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, description } = req.body;
        await prisma.category.update({ 
            where: { categoryId: +id },
            data: {
                categoryName,
                description,
            }
        }).then( result => res.status(200).json(result))
          .catch(error => {
            if (error.code === 'P2025') return res.status(404).json({message: 'Category not found'});
            return res.status(400).json({ message: error.message })
          });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//  Delete - DELETE
const CategoryDeleteById = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.category.delete({ where: { categoryId: +id } })
                    .then( () => res.status(200).json({ message: 'Category delete successful' }))
                    .catch( error => {
                        if (error.code === 'P2025') return res.status(404).json({ message: 'Category not found' });
                        return res.status(400).json({ message: error.message});
                        
                    });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
 
const CategoryValidator = async (data) => {  // data from req.body
    const Schema = Joi.object({
        categoryName: Joi.string().alphanum().min(3).max(20).required()
            .messages({
                "string.min": "กรอกอย่างน้อย 3 ตัวอักษร",
                "string.max": "ห้ามกรอกเกิน 20 ตัวอักษร",
                "any.require": "กรุณากรอกข้อมูลชื่อสินค้า"
            }),
        description: Joi.string()
    });
    return await Schema.validateAsync(data);
}

export { CategoryCreate, CategoryGetAll, CategoryGetById, CategoryUpdateById, CategoryDeleteById, CategoryValidator };