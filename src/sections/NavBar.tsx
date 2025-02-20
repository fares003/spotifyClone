import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen, faCircleDown, faBell } from "@fortawesome/free-regular-svg-icons";
import "../style/navBar.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSearch } from "../slices/searchSlice";

function NavBar() {
  const searchState = useSelector((state: RootState) => state.search.search);
const dispatch = useDispatch();
  return (
    <Navbar collapseOnSelect expand="lg" data-bs-theme="dark" className="p-2 mainNav" style={{ background: "#111111" }}>
      <Container fluid>
        
        {/* Left: Logo */}
        <Navbar.Brand href="#home">
          <FontAwesomeIcon icon={faSpotify} size="2x" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="w-100 d-flex justify-content-between align-items-center">
          
          {/* Center: Search Bar with Create Button Inside */}
          <Nav className="d-flex align-items-center mx-auto">
            <div className="searchbar" style={{ display: "flex", alignItems: "center", background: "#222", borderRadius: "30px", padding: "5px 15px" }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="white" />
              <input
                type="text"
                className="searchbar-input"
                name="q"
                autoComplete="off"
                title="Search"
                role="combobox"
                placeholder="What do you want to play?"
                style={{ 
                  width: "250px", 
                  padding: "6px 10px", 
                  background: "transparent", 
                  border: "none", 
                  color: "white",
                  outline: "none",
                  margin: "0 10px"
                }}
                
                
                value={searchState}
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />
              <div className="searchbar-right">
              <FontAwesomeIcon icon={faFolderOpen} color="white" size="lg" />
              </div>
            </div>
            <button className="create" >
                <FontAwesomeIcon icon={faPlus} color="#b3b3b3" />
                <span className="create-text">Create</span>
              </button>
          </Nav>

          {/* Right: Premium, Install, Notification & Profile */}
          <Nav className="d-flex align-items-center ms-5 gap-3">
            <Button variant="light" size="sm" className="premium">
              Explore Premium
            </Button>

            <button className="install">
              <FontAwesomeIcon icon={faCircleDown} /> Install App
            </button>

            <div className="profile d-flex align-items-center">
              <FontAwesomeIcon icon={faBell} color="white" className="me-2" />
              <div className="avatar">F</div>
            </div>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;