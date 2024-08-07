/* eslint-disable react-hooks/exhaustive-deps */
import { backendUrl } from "@/utils/backendApiUrlProvider";
import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect } from "react";
import Swal from "sweetalert2";
const GoogleAuthLink = () => {
  const router = useRouter();

  const postLoginData = async (state, code) => {
    const details = {
      state: state,
      code: code,
    };

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");

    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/o/google-oauth2/?${formBody}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      try {
        if (res.data.access) {
          localStorage.setItem("user", JSON.stringify(res.data.access));

          //   reset();
          router.push("/");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        }
      } catch (e) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong !",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const values = queryString.parse(location.search);

    postLoginData(values.state, values.code);
  }, []);

  return (
    <div style={{ minHeight: "80vh" }}>
      <div style={{ marginTop: "10vh" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
        <Typography variant="h4" fontFamily={"Poppins"} textAlign={"center"}>
          Registration in progress ...{" "}
        </Typography>
      </div>
    </div>
  );
};

export default GoogleAuthLink;
