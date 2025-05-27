"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Button } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import StarIcon from "@mui/icons-material/Star"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import "./HomePage.css"

interface Drawing {
  id: string
  name: string
  path: string
  category?: string
}

export default function Home() {
  const [drawings, setDrawings] = useState<Drawing[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Fetch drawings from API
        const drawingsResponse = await fetch("https://localhost:7001/api/Drawings")
        if (!drawingsResponse.ok) {
          throw new Error("Failed to fetch drawings")
        }
        const drawingsData = await drawingsResponse.json()
        setDrawings(drawingsData)

        // Fetch categories from API
        const categoriesResponse = await fetch("https://localhost:7001/api/Category")
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories")
        }
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)

        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem("favorites")
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id) ? favorites.filter((favId) => favId !== id) : [...favorites, id]

    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const filteredDrawings = selectedCategory
    ? drawings.filter((drawing) => drawing.category === selectedCategory)
    : drawings

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-bubble bubble-1"></div>
          <div className="hero-bubble bubble-2"></div>
          <div className="hero-bubble bubble-3"></div>
          <div className="hero-bubble bubble-4"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Unleash Your Creativity with <span className="rainbow-text">Kids Canvas</span>
          </h1>
          <p className="hero-subtitle">
            Explore our collection of beautiful coloring pages and bring them to life with vibrant colors!
          </p>
          <div className="hero-buttons">
            <Link to="/coloring-game">
              <Button variant="contained" color="warning" size="large" className="hero-button">
                Start Coloring Now
              </Button>
            </Link>
            <Link to="/favorites">
              <Button
                variant="outlined"
                color="primary"
                size="large"
                className="hero-button"
                startIcon={<FavoriteIcon />}
              >
                View Favorites
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="categories-section">
          <h2 className="section-title">Categories</h2>
          <div className="categories-container">
            <Button
              variant={!selectedCategory ? "contained" : "outlined"}
              color="primary"
              className="category-button"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "contained" : "outlined"}
                color="primary"
                className="category-button"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>
      )}

      {/* Drawings Grid */}
      <section className="drawings-section">
        <h2 className="section-title">Coloring Pages</h2>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span className="loading-text">Loading amazing coloring pages...</span>
          </div>
        ) : filteredDrawings.length === 0 ? (
          <div className="empty-container">
            <p className="empty-text">No coloring pages found in this category.</p>
          </div>
        ) : (
          <div className="drawings-grid">
            {filteredDrawings.map((drawing, index) => {
              if (!drawing.path) {
                console.warn("Drawing without path:", drawing)
                return null
              }

              const isFavorite = favorites.includes(drawing.id)

              return (
                <div key={index} className="drawing-card">
                  <div className="drawing-image-container">
                    <Link to={`/coloring-game?id=${drawing.id}`}>
                      <div className="drawing-image-wrapper">
                        <img
                          src={drawing.path || "/placeholder.svg"}
                          alt={drawing.name || "Coloring page"}
                          className="drawing-image"
                        />
                        <div className="drawing-overlay">
                          <span className="drawing-overlay-text">Start Coloring</span>
                        </div>
                      </div>
                    </Link>

                    <button
                      onClick={() => toggleFavorite(drawing.id)}
                      className="favorite-button"
                      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      {isFavorite ? (
                        <FavoriteIcon className="favorite-icon favorite-active" />
                      ) : (
                        <FavoriteBorderIcon className="favorite-icon" />
                      )}
                    </button>

                    {index < 3 && (
                      <div className="popular-badge">
                        <StarIcon className="popular-icon" /> Popular
                      </div>
                    )}
                  </div>

                  <div className="drawing-info">
                    <h3 className="drawing-title">{drawing.name}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
