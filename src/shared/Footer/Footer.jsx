"use client";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import RssFeedSharpIcon from "@mui/icons-material/RssFeedSharp";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Container, Grid, Typography } from "@mui/material";

import Image from "next/image";
import Link from "next/link";

import { useGetHomeDataQuery } from "@/redux/api/api";
import styles from "./Footer.module.scss";
const Footer = () => {
  const { data: homeData1, isLoading: homeLoading } = useGetHomeDataQuery();

  return (
    <div>
      <Box className={styles.footerTopWrapper}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h6" className={styles.footerTitle}>
                <Link style={{ color: "black" }} href={"/home"}>
                  Home
                </Link>
              </Typography>
              <ul className={styles.footerLists}>
                <li>
                  <Link className={styles.footerListItem} href="/products">
                    <StorefrontIcon /> Shop
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link className={styles.footerListItem} href={"/blogs"}>
                    <RssFeedSharpIcon /> Our Blogs
                  </Link>
                </li>
                <li>
                  <Link className={styles.footerListItem} href={"/tutorial"}>
                    <PlayLessonIcon /> Tutorial{" "}
                  </Link>{" "}
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography
                variant="h6"
                className={styles.footerTitle}
                style={{ display: "flex", alignItems: "center" }}
              >
                <HelpCenterIcon />{" "}
                <span style={{ margin: "0 5px" }}>Support</span>
              </Typography>
              <ul className={styles.footerLists}>
                <li>
                  {" "}
                  <Link href={"/contact_us"} className={styles.footerListItem}>
                    Contact Us
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    href={"/how_place_order"}
                    className={styles.footerListItem}
                  >
                    How to place order
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h6" className={styles.footerTitle}>
                Polices
              </Typography>
              <ul className={styles.footerLists}>
                <li>
                  {" "}
                  <Link href={"/terms"} className={styles.footerListItem}>
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/terms/#return"}
                    className={styles.footerListItem}
                  >
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={"warranty_policy"}
                    className={styles.footerListItem}
                  >
                    Warranty Policy
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* logo */}
              <Image
                src="/assets/logo.png"
                alt="robomartbd-logo"
                width={200}
                height={70}
              />
              <Typography
                variant="h6"
                className={styles.footerTitle}
                paddingTop={0}
              >
                Helpline:
              </Typography>
              <div
                style={{ display: "flex", alignItems: "center" }}
                className={styles.helpNumber}
              >
                <p style={{ fontFamily: "var(--secondaryFont)" }}>
                  <CallIcon />
                </p>
                <p
                  style={{
                    fontFamily: "var(--secondaryFont)",
                    marginLeft: "5px",
                  }}
                >
                  {homeData1 ? homeData1?.phone : ""}
                </p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center" }}
                className={styles.helpNumber}
              >
                <p style={{ fontFamily: "var(--secondaryFont)" }}>
                  <MailIcon />
                </p>
                <p
                  style={{
                    fontFamily: "var(--secondaryFont)",
                    marginLeft: "5px",
                  }}
                >
                  info@robomartbd.com
                </p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className={styles.footerBottom}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className={styles.copR8}
        >
          <p>Copyright © 2023 RoboMart BD. All Rights Reserved.</p>
          <Box
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <p>Stay Connected:</p>{" "}
            <Link
              href={`${homeData1 ? homeData1?.facebook : "/home"}`}
              style={{ color: "white" }}
            >
              {" "}
              <FacebookIcon className={styles.socialIcon} />
            </Link>
            <Link
              href={`${homeData1 ? homeData1?.youtube : "/home"}`}
              style={{ color: "white" }}
            >
              {" "}
              <YouTubeIcon className={styles.socialIcon} />
            </Link>
            <Link
              href={`${homeData1 ? homeData1?.linkdin : "/home"}`}
              style={{ color: "white" }}
            >
              {" "}
              <LinkedInIcon className={styles.socialIcon} />
            </Link>
            <Link
              href={`${homeData1 ? homeData1?.twiter : "/home"}`}
              style={{ color: "white" }}
            >
              {" "}
              <TwitterIcon className={styles.socialIcon} />
            </Link>
            <Link
              href={`${homeData1 ? homeData1?.instragram : "/home"}`}
              style={{ color: "white" }}
            >
              {" "}
              <InstagramIcon className={styles.socialIcon} />
            </Link>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
