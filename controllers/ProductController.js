import prisma from "../prisma/prisma.js";

const ProductCreate = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const ProductGetAll = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: 90,
                }
            },
            select: {
                productName: true,
                price: true,
                category: {
                    select: {
                        categoryName: true,
                    }
                },
            },
            orderBy: {
                price: 'desc',

            }
        });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const ProductGetById = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const ProductUpdateById = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const ProductDeleteById = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


const ProductQuery = async (req, res) => {
    try {
        // const { page, perPage } = req.query;
        // const products = await prisma.product.findMany({
        //     skip: (+page - 1) * perPage,
        //     take: +perPage
        //     where: {
        //         productName: {
        //             contains: 'ap'
        //         }
        //     },
        //     orderBy: {
        //         price: 'desc'
        //     }
        // });
        // return res.status(200).json(products);
        
        // aggregation
        // const stat = await prisma.product.aggregate({
            
        //     // _avg: {
        //     //     price: true
        //     // },
        //     // _min:{
        //     //     price: true
        //     // },
        //     // _max: {
        //     //     price: true
        //     // },
        //     // _sum: {
        //     //     price: true
        //     // }
        // });
        // return res.status(200).json(stat);
        
        // Group By
        const stat = await prisma.product.groupBy({
            by: ['price'],
            _count: {
                price: true
            }
        });
        orderBy: {
            _count: 'desc'
        }
        return res.status(200).json(stat);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export { ProductCreate, ProductGetAll, ProductGetById, ProductUpdateById, ProductDeleteById, ProductQuery };