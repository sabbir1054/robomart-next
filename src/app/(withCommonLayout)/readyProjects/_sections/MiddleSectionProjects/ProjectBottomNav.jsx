"use client";
import CategoryWiseProductLoading from "@/components/Skeletons/Home/CategoryWiseProductLoading";
import { useGetCategoryListProductsQuery } from "@/redux/api/api";
import { backendUrl } from "@/utils/backendApiUrlProvider";
import { Button, Grid, Skeleton } from "@mui/material";
import { lazy, Suspense, useEffect, useState } from "react";

const SingleProductCard = lazy(() =>
  import("@/Shared/SingleProductCard/SingleProductCard")
);

const ProjectBottomNav = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [productLoading, setProductLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [data, setData] = useState([]);

  const {
    data: categoryList,
    isLoading,
    isError,
  } = useGetCategoryListProductsQuery();

  useEffect(() => {
    if (categoryList) {
      const category = categoryList.find((cat) => cat?.id === 2);
      setData(category?.sub_category || []);
      setAllProduct();
    }
  }, [categoryList]);

  const setAllProduct = () => {
    setProductLoading(true);
    setSelectedTab("all");
    fetch(`${backendUrl}/api/catagory/${2}/category`)
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
        setProductLoading(false);
      });
  };

  const fetchProductsByCategory = (categoryId) => {
    setProductLoading(true);
    setSelectedTab(categoryId);
    fetch(`${backendUrl}/api/catagory/${categoryId}/subcategory`)
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
        setProductLoading(false);
      });
  };

  if (isLoading) {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Skeleton width={80} height={50} sx={{ marginRight: "2px" }} />
          <Skeleton width={80} height={50} sx={{ marginX: "2px" }} />
          <Skeleton width={80} height={50} sx={{ marginX: "2px" }} />
          <Skeleton width={80} height={50} sx={{ marginX: "2px" }} />
        </div>
        <CategoryWiseProductLoading />
      </>
    );
  }

  return (
    <div>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          {data?.length > 0 && (
            <Button
              size={"small"}
              onClick={setAllProduct}
              key={"all"}
              variant={selectedTab === "all" ? "contained" : "outlined"}
              sx={{
                marginX: "2px",
                color: selectedTab === "all" ? "white" : "var(--primaryColor)",
                backgroundColor:
                  selectedTab === "all" ? "var(--primaryColor)" : "",
                borderColor: "var(--primaryColor)",
                "&:hover": {
                  backgroundColor: "var(--primaryColor)",
                  color: "white",
                },
              }}
            >
              All
            </Button>
          )}
          {data?.map((scat) => (
            <Button
              size={"small"}
              onClick={() => fetchProductsByCategory(scat?.id)}
              key={scat?.id}
              variant={selectedTab === scat?.id ? "contained" : "outlined"}
              sx={{
                marginX: "2px",
                color:
                  selectedTab === scat?.id ? "white" : "var(--primaryColor)",
                backgroundColor:
                  selectedTab === scat?.id ? "var(--primaryColor)" : "",
                borderColor: "var(--primaryColor)",
                "&:hover": {
                  backgroundColor: "var(--primaryColor)",
                  color: "white",
                },
              }}
            >
              {scat?.name}
            </Button>
          ))}
        </div>
      </div>

      {productLoading ? (
        <CategoryWiseProductLoading />
      ) : (
        <Grid container spacing={2} paddingY={5}>
          <Suspense fallback={<div></div>}>
            {productList?.map((product) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={3}
                lg={3}
                xl={2}
                display={"flex"}
                justifyContent={"center"}
                key={product?.id}
              >
                <SingleProductCard product={product} />
              </Grid>
            ))}
          </Suspense>
        </Grid>
      )}
    </div>
  );
};

export default ProjectBottomNav;