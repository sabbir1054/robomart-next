import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SingleListItem = ({ category, setToggle,toggle }) => {
  const [open, setOpen] = useState(false);
  const router=useRouter()

  const handleClick = () => {
    setToggle(!toggle);
    setOpen(!open);
  };
  const handleSubCategory = (name) => {
    router.push(name);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={category?.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component={Paper}
          elevation={3}
          style={{
            position: "absolute",
            left: "90%",
            zIndex: 10,
            width: "250px",
          }}
        >
          {category?.sub_category?.length > 0 ? (
            category?.sub_category?.map((singleSub) => (
              <>
                <ListItemButton
                  onClick={() =>
                    handleSubCategory(
                      `/products/categories/${
                        singleSub?.id
                      }/${encodeURIComponent(singleSub?.name)}`
                    )
                  }
                >
                  <ListItemText primary={singleSub?.name} />
                </ListItemButton>
                <Divider />
              </>
            ))
          ) : (
            <>
              <Divider />
            </>
          )}
          <Link
            href={`/products/categories/${category?.id}/${encodeURIComponent(category?.name)}`}
          >
            {" "}
            <ListItemText
              primary={"Show All"}
              style={{ textAlign: "center" }}
            />
          </Link>
        </List>
      </Collapse>
    </>
  );
};

export default SingleListItem;
