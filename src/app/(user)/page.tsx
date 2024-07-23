import Container from "@/components/container";
import HeroBanner from "@/components/Home/HeroBanner";
import LatestProducts from "@/components/Home/LatestProducts";
import MostRatedProducts from "@/components/Home/MostRatedProducts";
import Image from "next/image";
import ExtraInfo from "@/components/Home/ExtraInfo";
import { getAllProducts } from "@/actions/productActions";

export default async function Home() {
  const data = await getAllProducts()
  const products = data.products



  return (
    <>
      <HeroBanner />
      <ExtraInfo />
      {
        products &&
        <>
          <LatestProducts products={products} />
          <MostRatedProducts products={products} />
        </>
      }
    </>
  );
}
