import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import SideCategoryLoading from "@/components/Skeletons/Home/SideCategoryLoading";
import { useGetCategoryListProductsQuery } from "@/redux/api/api";
import AllCategorySideMenu from "@/Shared/AllCategoryListSideMenu/AllCategorySideMenu";
import OfferCards from "./Components/OfferCards/OfferCards";
import HeroSlider from "./Components/Slider/HeroSlider";
import styles from "./Hero.module.scss";
import OurFeatures from "./OurFeatures/OurFeatures";
const Hero = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  const {
    data: categoryList,
    isLoading,
    isError,
  } = useGetCategoryListProductsQuery();
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <>
      {/* {screenWidth > 1200 && screenWidth < 1500 ? (
        <Grid container paddingTop={1}>
          <Grid item md={3} lg={2}>
            <Box style={{ backgroundColor: "white", margin: "0px 10px" }}>
              <div className={styles.categoryComponent}>
                {isLoading ? (
                  <SideCategoryLoading />
                ) : (
                  <AllCategorySideMenu
                    category={categoryList?.slice(0, 8)}
                    isLoading={isLoading}
                  />
                )}
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={10}>
            <Grid container spacing={2}>
              <Grid item md={12} lg={8}>
                <HeroSlider />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <OfferCards />
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <OurFeatures />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : ( */}
        <>
          <Grid
            container
            columnSpacing={2}
            paddingTop={1}
            // style={{ backgroundColor: "#F0F2F5" }}
          >
            <Grid item md={3} lg={2}>
              <Box style={{ backgroundColor: "white", marginLeft: "20px" }}>
                {/* <CategoryList /> */}
                <div className={styles.categoryComponent}>
                  {" "}
                  <AllCategorySideMenu category={categoryList?.slice(0, 8)} />
                </div>
              </Box>
            </Grid>
            <Grid item md={9} lg={7} width={"100%"}>
              <HeroSlider />
            </Grid>
            <Grid item md={12} lg={3} width={"100%"}>
              <OfferCards />
            </Grid>
          </Grid>
          <OurFeatures />
        </>
      {/* )} */}
    </>
  );
};

export default Hero;
