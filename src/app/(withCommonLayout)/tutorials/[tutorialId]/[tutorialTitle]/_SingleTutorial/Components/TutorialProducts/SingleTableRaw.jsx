import { useGetUserQuery, usePostToCartMutation } from "@/redux/api/api";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { StyledTableCell } from "./TutorialProducts";
import styles from "./TutorialsProductTable.module.scss";

const successNotify = () => toast.success("Successfully cart updated !");
const errorNotify = () => toast.error("Something went wrong !");

const SingleTableRaw = ({ singleItem, idx }) => {
  const [check, setCheck] = useState(false);
  const [quantity, setQuantity] = useState(singleItem?.quantity);
  const { data: userData } = useGetUserQuery();
  const [postToCart, { isLoading, isError, isSuccess }] =
    usePostToCartMutation();

  const addToCart = () => {
    setCheck(true);
    if (!userData) {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "Please Login First !",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const options = {
        product: { product: singleItem?.id, quantity: quantity },
      };
      postToCart(options);
    }
  };

  if (isSuccess && check) {
    successNotify();
    setCheck(false);
  }

  return (
    <>
      <StyledTableCell align="left">{idx + 1}</StyledTableCell>
      <StyledTableCell align="left">
        <Link
          href={`/product/${
            singleItem?.product?.id
          }/${(singleItem?.product?.name)
            .replace(/ /g, "_")
            .replace(/%/g, "percent")}`}
        >
          <Image
            src={`${singleItem?.product?.photo}`}
            width={100}
            height={100}
            alt=""
            srcset=""
          />
        </Link>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Link
          style={{
            color: "black",
            "&:hover": {
              color: "var(--primaryColor) !important",
            },
          }}
          href={`/product/${
            singleItem?.product?.id
          }/${(singleItem?.product?.name)
            .replace(/ /g, "_")
            .replace(/%/g, "percent")}`}
        >
          {singleItem?.product?.name}
        </Link>
      </StyledTableCell>

      <StyledTableCell align="left">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className={styles.quantity_btn}
            style={{ backgroundColor: "black", color: "white" }}
            onClick={() => setQuantity(quantity - 1)}
          >
            <RemoveIcon sx={{ fontWeight: "bold" }} />
          </button>
          <input
            readOnly
            style={{
              textAlign: "center",
              width: "40px",
              //   height: "px",
              padding: "4px",
              fontSize: "15px",
            }}
            type="number"
            min={1}
            value={quantity}
          />
          <button
            className={styles.quantity_btn}
            style={{ backgroundColor: "black", color: "white" }}
            onClick={() => setQuantity(quantity + 1)}
          >
            <AddIcon />
          </button>
        </div>
      </StyledTableCell>
      <StyledTableCell align="right">
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <IconButton
            color="success"
            aria-label="add to shopping cart"
            onClick={() => addToCart()}
          >
            <AddShoppingCartIcon />
          </IconButton>
        )}
      </StyledTableCell>
    </>
  );
};

export default SingleTableRaw;
