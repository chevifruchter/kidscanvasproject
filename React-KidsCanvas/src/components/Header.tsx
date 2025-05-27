"use client"

import { ReactNode, useState } from "react"
import { Link } from "react-router-dom";
import { Button } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import PaletteIcon from "@mui/icons-material/Palette"
import FavoriteIcon from "@mui/icons-material/Favorite"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import LoginIcon from "@mui/icons-material/Login"
import "../styles/Header.css";
import { useSearch } from "../Context/searchContext";

export default function Header() {
  // const [searchQuery, setSearchQuery] = useState("")
  const {searchValue,setSearchValue} = useSearch();
  console.log(searchValue)
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <span className="logo-text">Kids Canvas</span>
              <PaletteIcon className="logo-icon" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="navigation">
            <Link to="/">
              <Button variant="contained" color="primary" className="nav-button">
                Coloring Pages
              </Button>
            </Link>
            <Link to="/coloring-game">
              <Button variant="contained" color="secondary" className="nav-button">
                Coloring Game
              </Button>
            </Link>
            <Link to="/ai-drawing">
              <Button variant="contained" color="warning" className="nav-button" endIcon={<AutoAwesomeIcon />}>
                AI Coloring
              </Button>
            </Link>
            <Link to="/favorites">
              <Button variant="contained" color="error" className="nav-button" endIcon={<FavoriteIcon />}>
                Favorites
              </Button>
            </Link>
          </nav>

          {/* Search & Auth */}
          <div className="search-auth">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="search-input"
              />
              <SearchIcon className="search-icon" />
            </div>
            <Link to="/auth">
              <Button variant="outlined" color="primary" className="auth-button" startIcon={<LoginIcon />}>
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
       {/* <main className="flex-1 w-full p-6">{children.children}</main> */}
    </header>
  )
}
