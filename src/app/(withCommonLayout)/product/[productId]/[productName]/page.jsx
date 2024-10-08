import { getSingleProduct } from "@/utils/ApiCall/productApicall";
import ProductDetailsPage from "./_ProductDetailsPage/ProductDetailsPage";

// eslint-disable-next-line @next/next/no-async-client-component

export async function generateMetadata({ params }, parent) {
  const productDetails = await getSingleProduct(params.productId);
  // const metaKeywords = tagArray.split(",");
  const metaKeywords = productDetails?.product_tags;

  const metaData = {
    title: productDetails?.name,
    description: productDetails?.discription,
    keywords: metaKeywords,
    alternates: {
      canonical: `https://www.robomartbd.com/product/${
        productDetails?.id
      }/${encodeURI(productDetails?.name)}`,
    },
    openGraph: {
      images: [`${productDetails?.media[0]?.photo}`],
    },
  };
  return metaData;
}
const SingleProduct = async ({ params }) => {
  try {
    const productDetails = await getSingleProduct(params.productId);

    return (
      <>
        <ProductDetailsPage productDetails={productDetails} />
      </>
    );
  } catch (error) {
    console.error("Error in SingleProduct component:", error);
    // Optionally handle the error state in your component, e.g., show an error message
    return (
      <div>
        <h1>Error loading product details</h1>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default SingleProduct;

// export async function generateStaticParams() {
//   try {
//     const products = await getAllProducts();
//     return products.map((product) => ({
//       productId: product.id.toString(),
//     }));
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     // Optionally handle the error state
//     return [];
//   }
// }
