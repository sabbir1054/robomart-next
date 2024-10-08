"use client";
import { useGetAllProductsQuery } from "@/redux/api/api";
import { Button, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import styles from "./HeroNavigation.module.scss";

// Custom CSS for suggestion box
const suggestionBoxStyle = {
  position: "absolute",
  top: "100%", // Position it below the input
  left: 0,
  zIndex: 1,
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  width: "100%", // Match the width of the input
  maxHeight: "200px", // Limit the height if needed
  overflowY: "auto", // Enable vertical scrolling if needed
};

const SearchBar = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetAllProductsQuery();

  const [products, setProducts] = useState(data);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const goTODetails = (link) => {
    router.push(link);
  };

  const updateSuggestions = (value) => {
    if (data) {
      const filteredSuggestions = products?.filter((product) =>
        product?.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  // Autosuggest input onChange handler
  const handleInputChange = (event, { newValue }) => {
    setQuery(newValue);
    updateSuggestions(newValue);
  };

  // Autosuggest suggestion click handler
  const handleSuggestionSelected = (event, { suggestion }) => {
    setSelectedProduct(suggestion);
    // You can do something with the selected product, like navigate to its details page.
  };

  // Function to fetch suggestions
  const onSuggestionsFetchRequested = ({ value }) => {
    updateSuggestions(value);
  };

  const handleSearchBtn = () => {
    if (query !== "") {
      router.push(`/searchProducts/?search=${query}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchBtn();
    }
  };

  useEffect(() => {
    setProducts(data);
  }, [data]);

  // Autosuggest rendering suggestions
  const renderSuggestion = (suggestion) => (
    <div style={{ padding: "10px 10px", cursor: "pointer" }}>
      <div
        onClick={() =>
          goTODetails(
            `/product/${suggestion?.id}/${encodeURIComponent(suggestion?.name)}`
          )
        }
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Image
          src={`${
            suggestion?.photo ? suggestion?.photo : "/assets/no-img.jpg"
          }`}
          alt={suggestion.name}
          width="75"
          height={"75"}
        />
        <div style={{ marginLeft: "20px" }}>
          {" "}
          <Typography
            variant="title1"
            style={{
              fontSize: "16px",
              fontFamily: "Poppins",
              fontWeight: "bold",
            }}
          >
            {suggestion.name}
          </Typography>
          <br />
          <Typography
            variant="title1"
            style={{ fontSize: "16px", fontFamily: "Poppins" }}
          >
            BDT {suggestion?.price}
          </Typography>
        </div>
      </div>

      <Divider />
    </div>
  );

  return (
    <>
      <Grid container marginLeft={10}>
        <Grid item sm={9}>
          <Autosuggest
            inputProps={{
              placeholder: "Search for products",
              value: query,
              onChange: handleInputChange,
              style: {
                borderRadius: "10px",
                width: "100%",
                border: "0px solid ",
                padding: "12px 5px",
                fontSize: "16px",
                // marginTop: "12px",
              },
            }}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionSelected={handleSuggestionSelected}
            getSuggestionValue={(suggestion) => suggestion?.name}
            renderSuggestion={renderSuggestion}
            onKeyDown={handleKeyDown}
            theme={{
              container: {
                position: "relative", // Ensure that the suggestion box is positioned relative to the input
              },
              suggestionsContainer: "custom-suggestions-container",
            }}
          />
        </Grid>{" "}
        <Grid item sm={3}>
          <Button
            style={{
              borderRadius: "2px 10px 10px 0px",
              backgroundColor: "black",
              padding: "9px 25px",
              color: "white",
            }}
            onClick={handleSearchBtn}
            className={styles.searchBtn}
            disableElevation
          >
            Search
          </Button>
        </Grid>{" "}
      </Grid>
    </>
  );
};

export default SearchBar;
