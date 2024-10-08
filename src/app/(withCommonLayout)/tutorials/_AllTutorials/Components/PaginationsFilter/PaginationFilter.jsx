import { backendUrl } from "@/utils/backendApiUrlProvider";
import { Button, Grid } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;

const PaginationFilter = ({ handlePageChange, totalPages, page }) => {
  const pathname = usePathname();

  const [tags, seTags] = useState([]);
  const getTagsData = async () => {
    const dataToDb = await fetch(`${backendUrl}/blog/get_all_tag`);
    const result = await dataToDb.json();
    seTags(result);
  };
  useEffect(() => {
    getTagsData();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Grid container spacing={2} paddingY={1}>
        <Grid item xs={12} sm={6}>
          {" "}
          <div>
            <Button
              variant="contained"
              disableElevation
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              style={{ backgroundColor: "green" }}
            >
              All Tags
            </Button>

            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {tags?.length > 0 &&
                tags?.map((tag, idx) => (
                  <Link
                    key={idx}
                    href={`${
                      pathname === "/tutorial" ? "/tutorial" : "/blogs"
                    }/tag/${tag?.id}/${(tag?.tag_name).replace(/ /g, "_")}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem key={tag?.id} onClick={handleClose}>
                      {tag?.tag_name}
                    </MenuItem>
                  </Link>
                ))}
            </Menu>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} display={"flex"} justifyContent={"end"}>
          {/* <Stack spacing={2}>
            <Pagination
              count={totalPages}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
              color="success"
            />
          </Stack> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default PaginationFilter;
