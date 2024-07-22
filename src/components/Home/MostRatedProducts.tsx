import Image from "next/image";
import Container from "../container";
import { numberToCurrency, sortProductsByAverageRating, stringShortner } from "@/utils/supportFunctions";
import Link from "next/link";
import Rating from "../Rating";
import { ProductWithCategory } from "@/types/types";
import ProductCard from "../ProductCard";


const MostRatedProducts = ({ products }: { products: ProductWithCategory[] }) => {

    const sortedProducts = sortProductsByAverageRating(products)

    return (
        <div
            className="mt-20"
        >
            <Container>
                <h2
                    className="text-4xl font-caveat font-bold
                    pb-4
                    "
                >Top Rated Products</h2>
                <div className="
        flex
        lg:justify-between
        justify-center
        flex-wrap
        gap-10


        ">

                    {
                        sortedProducts.map((product, indx) => {
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



export default MostRatedProducts

