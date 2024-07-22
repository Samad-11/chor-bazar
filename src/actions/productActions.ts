"use server"
import fs from 'node:fs/promises'

import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { randomUUID } from 'node:crypto'
// import { Color } from '@/types/types'
import prisma from '@/lib/prisma'
import { Color } from '@prisma/client'

const {
    AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME,
    AWS_BUCKET_REGION,
} = process.env

const s3 = new S3Client({
    credentials: {
        accessKeyId: AWS_ACCESS_KEY!,
        secretAccessKey: AWS_SECRET_ACCESS_KEY!
    },
    region: AWS_BUCKET_REGION
})



export async function testFormdata(formdata: FormData) {
    try {
        const name = formdata.get("name") as string
        const price = formdata.get("price") as string
        const description = formdata.get("description") as string
        const categoryId = formdata.get("categoryId") as string
        const brand = formdata.get("brand") as string

        const noOfColorFields = formdata.get("noOfColorFields") as unknown as number

        let imageKey: string[] = []
        let colorArray: {
            color: string, colorCode: string, images: File[], randomKey: string[]
        }[] = []

        for (let i = 0; i < noOfColorFields; i++) {
            let imgArray: File[] = [];
            let imgKey: string[] = [];
            const colorNameCode = formdata.get(`color-${i + 1}-name-code`) as string
            const [colorName, colorCode] = colorNameCode.split(",")

            const colorImageFields = formdata.get(`color-${i + 1}-image-size`) as unknown as number

            for (let j = 0; j < colorImageFields; j++) {
                const file = formdata.get(`color-${i + 1}-image-${j + 1}`) as File

                if (file) {
                    imgArray.push(file);
                    imgKey.push(randomUUID() + file.name);
                }
            }
            colorArray.push({ images: imgArray, randomKey: imgKey, color: colorName, colorCode })
        }
        colorArray.forEach(async (color) => {
            color.images.forEach(async (image, j) => {
                const arrayBuffer = await image.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);

                const cmd = new PutObjectCommand({
                    Bucket: AWS_BUCKET_NAME,
                    Key: color.randomKey[j],
                    Body: buffer,
                    ContentType: image.type
                })

                const res = await s3.send(cmd)
            })
        });

        const newProduct = await prisma.product.create({
            data: {
                brand,
                description,
                inStock: true,
                name,
                price: parseFloat(price),
                categoryId,
                colors: colorArray.map((c, i) => {
                    const color = c.color
                    const colorCode = c.colorCode
                    const images = c.randomKey
                    return { color, colorCode, images }
                })

            }
        })

        return {
            message: "Product Successfully Added",
            ok: true
        }

    } catch (error) {
        console.log('formdata error');
        return {
            message: "Something went wrong",
            ok: false
        }

    }
}

export async function addProduct(formdata: FormData) {
    try {
        console.log("start")
        const name = formdata.get("name") as string
        const description = formdata.get("description") as string
        const brand = formdata.get("brand") as string
        const category = formdata.get("category") as string
        const colorSize = formdata.get("colorSize") as unknown as number
        const price = formdata.get("price") as string
        let colorArray: {
            color: string, colorCode: string, images: File[], randomKey: string[]
        }[] = []
        for (let i = 0; i < colorSize; i++) {
            let imgArray: File[] = []
            let imgKey: string[] = [];
            const colorName = formdata.get(`${i}-color-name`) as string
            const colorCode = formdata.get(`${i}-color-code`) as string
            const colorImageSize = formdata.get(`${i}-color-image-size`) as unknown as number

            for (let j = 0; j < colorImageSize; j++) {
                const file = formdata.get(`${i}-color-image-${j}`) as File
                imgArray.push(file)
                imgKey.push(randomUUID() + file.name)
            }
            colorArray.push({ color: colorName, colorCode, images: imgArray, randomKey: imgKey })
        }

        if (!(name || description || brand || category || colorSize || price || colorArray)) {
            console.log("Invalid fields");
            return
        }

        console.log(colorArray[0].randomKey)
        colorArray.forEach(async (c, i) => {
            c.images.forEach(async (img, j) => {
                const arrayBuffer = await img.arrayBuffer()
                const buffer = new Uint8Array(arrayBuffer)
                if (c.randomKey[j]) {

                    const cmd = new PutObjectCommand({
                        Bucket: AWS_BUCKET_NAME,
                        Key: c.randomKey[j],
                        Body: buffer
                    })

                    const res = s3.send(cmd)
                }
            })
        })

        const colors = colorArray.map((c, i) => {
            const color = c.color
            const colorCode = c.colorCode
            const images = c.randomKey
            return { color, colorCode, images }
        })
        const newProduct = await prisma.product.create({
            data: {
                brand,
                description,
                inStock: true,
                name,
                price: parseFloat(price),
                categoryId: category,
                colors,
            }
        })
        console.log("end...")
        return {
            message: "Product Added Successfully", ok: true
        }
        // console.log('new product', newProduct);
    } catch (error) {
        console.log("Error Occured", error);
        return { message: "Failed to add product", ok: false }
    }
}

export async function uploadFile(formdata: FormData) {

    const length = formdata.get('total-images') as unknown as number

    let imagesArray: File[] = []
    let imageKeyArray: string[] = []
    for (let index = 0; index < length; index++) {
        const file = formdata.get(`image-${index}`) as File
        if (file.size === 0) {
            return
        }
        imagesArray.push(file)
        imageKeyArray.push(
            file.name + randomUUID()
        )
    }

    console.log(imageKeyArray);


    imagesArray.forEach(async (image, indx) => {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const cmd = new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: imageKeyArray[indx],
            Body: buffer,
            ContentType: image.type
        })

        const res = await s3.send(cmd)

        console.log(res);
    })

    const product = await prisma.product.create({
        data: {
            name: "Test",
            brand: "test brand",
            description: "test description",
            inStock: true,
            price: 100,
            categoryId: "669c0515fce6ea187b33442c",
            colors: [
                {
                    color: "Black",
                    colorCode: "#000000",
                    images: imageKeyArray
                }
            ],
        }
    })





    // if (file.size === 0) {
    //     throw new Error("File not found")
    // }


    // const arrayBuffer = await file.arrayBuffer();
    // const buffer = new Uint8Array(arrayBuffer)

    // const cmd = new PutObjectCommand({
    //     Bucket: AWS_BUCKET_NAME,
    //     Key: file.name,
    //     Body: buffer,
    //     ContentType: file.type
    // })

    // const res = await s3.send(cmd)
    // console.log('====================================');
    // console.log(res);
    // console.log('====================================');
}

export async function getAllProducts() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            }
        })
        return {
            products,
            ok: true
        }
    } catch (error) {
        return {
            ok: false, products: null
        }
    }
}

export async function getProductsCount() {
    try {
        const productCount = await prisma.product.count()
        return {
            productCount, ok: true
        }
    } catch (error) {
        return {
            ok: false, productCount: 0
        }
    }
}


export async function getProductById(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id
            },
            include: {
                category: true
            }
        })

        return {
            product, ok: true
        }
    } catch (error) {
        return {
            product: null, ok: false
        }
    }
}


export async function getAllCategories() {
    try {
        const categories = await prisma.category.findMany({})

        return {
            categories, ok: true
        }
    } catch (error) {
        return {
            categories: null, ok: false
        }
    }
}


export async function getAllProduct2(query: string, category: string) {
    try {
        if (query === "" && category === "") {
            const data = await getAllProducts()
            return data
        }
        else {
            if (query.length > 0 && category === "") {


                console.log(query);
                const upperCase = query.toUpperCase()
                // const lowerCase = query.toLowerCase()
                const products = await prisma.product.findMany({
                    where: {
                        OR: [

                            {
                                name: { contains: upperCase, mode: "insensitive" }
                            },
                            {
                                description: { contains: upperCase, mode: "insensitive" }
                            }
                        ],
                    },
                    include: { category: true }
                })
                console.log(products);

                return { products, ok: true }
            } else {
                if (category.length > 0 && query === "") {
                    const categoryName = category
                    const c = await prisma.category.findUnique({ where: { name: category } })
                    if (c) {
                        const products = await prisma.product.findMany({
                            where: {
                                categoryId: c.id
                            },
                            include: { category: true }
                        })
                        return { products, ok: true }
                    }
                    return { products: null, ok: false }
                }
            }
        }
    } catch (error) {
        return { products: null, ok: false }
    }
}