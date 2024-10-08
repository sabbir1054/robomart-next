"use client";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SingleTutorial.module.scss";
const SingleTutorialCard = ({ tutorial }) => {
  const pathname = usePathname();
  return (
    <>
      {" "}
      <Card sx={{ maxWidth: 345 }} disableElevation>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={tutorial?.image ? `${tutorial?.image}` : "/assets/no-img.jpg"}
        />
        <CardContent>
          <Link
            href={`/${pathname.includes("/blogs") ? "blogs" : "tutorials"}/${
              tutorial?.id
            }/${encodeURIComponent(tutorial?.title)}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className={styles.tutorial_title}
            >
              {tutorial?.title}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            {tutorial?.description?.substring(0, 250) + "..."}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            href={`/${pathname.includes("/blogs") ? "blogs" : "tutorials"}/${
              tutorial?.id
            }/${encodeURIComponent(tutorial?.title)}`}
            style={{ textDecoration: "none" }}
          >
            {" "}
            <Button size="small" sx={{ color: "var(--primaryColor)" }}>
              Read More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default SingleTutorialCard;
