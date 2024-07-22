import Image from "next/image";
import Container from "../container";
import { numberToCurrency, stringShortner } from "@/utils/supportFunctions";
import Link from "next/link";
import Rating from "../Rating";
// import { Product } from "@/types/types";
import ProductCard from "../ProductCard";
import { Product } from "@prisma/client";
import { ProductWithCategory } from "@/types/types";
const LatestProducts = ({ products }: { products: ProductWithCategory[] }) => {
    // console.log('====================================');
    // console.log(products[1].reviews);
    // console.log('====================================');
    return (
        <div
        // className="bg-red-100"
        >
            <Container>
                <h2
                    className="text-4xl font-caveat font-bold
                    pb-4
                    "
                >Latest Products</h2>
                <div className="
        flex
        lg:justify-between
        justify-center
        flex-wrap
        gap-8
        ">

                    {
                        products.map((product, indx) => {
                            return (
                                <ProductCard product={product} key={indx} />
                            )
                        })
                    }
                </div>
                <div className="flex justify-end pt-4">
                    <Link href={""}
                        className="
                    link
                    link-primary
                    btn
                    max-sm:w-56
                    max-sm:mx-auto
                    "
                    >
                        View More
                    </Link>
                </div>
            </Container>
        </div>
    )
}



export default LatestProducts

