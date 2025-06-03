"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Paper,
  Chip,
  IconButton,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import DownloadIcon from "@mui/icons-material/Download"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import ShareIcon from "@mui/icons-material/Share"
import DeleteIcon from "@mui/icons-material/Delete"
import FilterListIcon from "@mui/icons-material/FilterList"
import "../styles/Favorite.css"

interface FavoriteDrawing {
  id: string
  name: string
  path: string
  category: string
  dateAdded: string
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteDrawing[]>([])
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteDrawing[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; drawing: FavoriteDrawing | null }>({
    open: false,
    drawing: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with actual API call
  const mockFavorites: FavoriteDrawing[] = [
    {
      id: "1",
      name: "Magical Unicorn",
      path: "/placeholder.svg?height=300&width=300&text=Unicorn",
      category: "Fantasy",
      dateAdded: "2024-01-15",
    },
    {
      id: "2",
      name: "Happy Elephant",
      path: "/placeholder.svg?height=300&width=300&text=Elephant",
      category: "Animals",
      dateAdded: "2024-01-14",
    },
    {
      id: "3",
      name: "Princess Castle",
      path: "/placeholder.svg?height=300&width=300&text=Castle",
      category: "Fantasy",
      dateAdded: "2024-01-13",
    },
    {
      id: "4",
      name: "Cute Kitten",
      path: "/placeholder.svg?height=300&width=300&text=Kitten",
      category: "Animals",
      dateAdded: "2024-01-12",
    },
    {
      id: "5",
      name: "Space Rocket",
      path: "/placeholder.svg?height=300&width=300&text=Rocket",
      category: "Space",
      dateAdded: "2024-01-11",
    },
    {
      id: "6",
      name: "Butterfly Garden",
      path: "/placeholder.svg?height=300&width=300&text=Butterfly",
      category: "Nature",
      dateAdded: "2024-01-10",
    },
  ]

  const categories = ["all", "Animals", "Fantasy", "Nature", "Space", "Vehicles"]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFavorites(mockFavorites)
      setFilteredFavorites(mockFavorites)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredFavorites(favorites)
    } else {
      setFilteredFavorites(favorites.filter((fav) => fav.category === selectedCategory))
    }
  }, [selectedCategory, favorites])

  const handleRemoveFavorite = (drawing: FavoriteDrawing) => {
    setDeleteDialog({ open: true, drawing })
  }

  const confirmRemove = () => {
    if (deleteDialog.drawing) {
      const newFavorites = favorites.filter((fav) => fav.id !== deleteDialog.drawing!.id)
      setFavorites(newFavorites)
      setDeleteDialog({ open: false, drawing: null })
    }
  }

  const handleDownload = (drawing: FavoriteDrawing) => {
    const link = document.createElement("a")
    link.href = drawing.path
    link.download = `${drawing.name}.png`
    link.click()
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg" className="favorites-container">
        <Box className="loading-container">
          <div className="loading-hearts">
            <FavoriteIcon className="heart-1" />
            <FavoriteIcon className="heart-2" />
            <FavoriteIcon className="heart-3" />
          </div>
          <Typography variant="h5" className="loading-text">
            Loading your favorite drawings...
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" className="favorites-container">
      {/* Hero Section */}
      <Paper elevation={0} className="favorites-hero">
        <Box className="hero-content">
          <Typography variant="h2" component="h1" className="hero-title">
            <FavoriteIcon className="hero-heart" />
            My Favorite Drawings
          </Typography>
          <Typography variant="h5" className="hero-subtitle">
            Your personal collection of amazing coloring pages
          </Typography>
          <Typography variant="body1" className="hero-description">
            {favorites.length} drawings saved • Ready to color anytime
          </Typography>
        </Box>
      </Paper>

      {favorites.length === 0 ? (
        <Paper elevation={3} className="empty-state">
          <Box className="empty-content">
            <FavoriteIcon className="empty-heart" />
            <Typography variant="h4" className="empty-title">
              No Favorites Yet
            </Typography>
            <Typography variant="body1" className="empty-description">
              Start exploring our coloring pages and add your favorites by clicking the heart icon!
            </Typography>
            <Button variant="contained" size="large" className="explore-button">
              Explore Coloring Pages
            </Button>
          </Box>
        </Paper>
      ) : (
        <>
          {/* Filter Section */}
          <Paper elevation={2} className="filter-section">
            <Box className="filter-header">
              <FilterListIcon className="filter-icon" />
              <Typography variant="h6" className="filter-title">
                Filter by Category
              </Typography>
            </Box>
            <Box className="filter-chips">
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category === "all" ? "All Categories" : category}
                  onClick={() => setSelectedCategory(category)}
                  className={`filter-chip ${selectedCategory === category ? "active" : ""}`}
                  variant={selectedCategory === category ? "filled" : "outlined"}
                />
              ))}
            </Box>
          </Paper>

          {/* Favorites Grid */}
          <Box className="favorites-grid-container">
            <Grid container spacing={3}>
              {filteredFavorites.map((drawing, index) => (
                <Box
                  key={drawing.id}
                  sx={{
                    width: {
                      xs: '100%',    // xs=12 → 100%
                      sm: '50%',     // sm=6 → 6/12 = 50%
                      md: '33.33%',  // md=4 → 4/12 ≈ 33.33%
                      lg: '25%',     // lg=3 → 3/12 = 25%
                    },
                    boxSizing: 'border-box',
                    p: 1, // אם תרצה ריווח פנימי כמו ב-Grid spacing
                  }}
                >
                  <Fade in={true} timeout={300 + index * 100}>
                    <Card className="favorite-card">
                      <Box className="card-image-container">
                        <CardMedia component="img" image={drawing.path} alt={drawing.name} className="card-image" />
                        <Box className="card-overlay">
                          <IconButton
                            className="remove-favorite"
                            onClick={() => handleRemoveFavorite(drawing)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <Chip label={drawing.category} className="category-badge" size="small" />
                      </Box>
                      <CardContent className="card-content">
                        <Typography variant="h6" className="card-title">
                          {drawing.name}
                        </Typography>
                        <Typography variant="body2" className="date-added">
                          Added {new Date(drawing.dateAdded).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                      <CardActions className="card-actions">
                        <Button
                          size="small"
                          startIcon={<ColorLensIcon />}
                          className="action-button color-button"
                          variant="contained"
                        >
                          Color
                        </Button>
                        <Button
                          size="small"
                          startIcon={<DownloadIcon />}
                          className="action-button download-button"
                          variant="outlined"
                          onClick={() => handleDownload(drawing)}
                        >
                          Download
                        </Button>
                        <IconButton size="small" className="share-button">
                          <ShareIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Fade>
                </Box>
              ))}
            </Grid>
          </Box>
        </>
      )}

      {/* Promotional Section */}
      <Paper elevation={3} className="promo-section">
        <Grid container spacing={4} alignItems="center">
          <Box
            sx={{
              width: {
                xs: '100%',  // xs=12 → 100%
                md: '50%',   // md=6 → 6/12 = 50%
              },
              boxSizing: 'border-box',
            }}
          >
            <Typography variant="h4" className="promo-title">
              💝 Share Your Favorites
            </Typography>
            <Typography variant="body1" className="promo-text">
              Create collections, share with friends, and discover new favorites every day! Join our community of young
              artists.
            </Typography>
            <Box className="promo-buttons">
              <Button variant="contained" color="primary" size="large" className="promo-button">
                Create Collection
              </Button>
              <Button variant="outlined" color="primary" size="large" className="promo-button">
                Share with Friends
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: {
                xs: '100%',  // xs=12 → 100%
                md: '50%',   // md=6 → 6/12 = 50%
              },
              boxSizing: 'border-box',
            }}
          >
            <Box className="promo-image-container">
              <img
                src="/placeholder.svg?height=300&width=400&text=Happy+Kids+Sharing"
                alt="Kids sharing"
                className="promo-image"
              />
            </Box>
          </Box>
        </Grid>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, drawing: null })}>
        <DialogTitle>Remove from Favorites?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove "{deleteDialog.drawing?.name}" from your favorites?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, drawing: null })}>Cancel</Button>
          <Button onClick={confirmRemove} color="error" variant="contained">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
        {/* Footer */}
              <Paper
                elevation={4}
                sx={{
                  mt: 4,
                  p: 4,
                  borderRadius: "25px",
                  background: "linear-gradient(135deg, #333 0%, #555 100%)",
                  color: "white",
                }}
              >
                <Grid container spacing={4}>
                  <Grid>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#ff69b4" }}>
                      Kids Canvas
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                      Creating magical stories from your imagination with the power of AI
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {["🎨", "📚", "✨"].map((emoji, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: "40px",
                            height: "40px",
                            background: "rgba(255, 105, 180, 0.2)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              background: "rgba(255, 105, 180, 0.4)",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          {emoji}
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                  <Grid>
      
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      Features
                    </Typography>
                    {["AI Story Generation", "Character Library", "Voice Narration", "Story Sharing"].map((item) => (
                      <Typography key={item} variant="body2" sx={{ mb: 1, opacity: 0.8, cursor: "pointer" }}>
                        {item}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      Support
                    </Typography>
                    {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
                      <Typography key={item} variant="body2" sx={{ mb: 1, opacity: 0.8, cursor: "pointer" }}>
                        {item}
                      </Typography>
                    ))}
                  </Grid>
                  <Grid>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      Stay Connected
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                      Get updates on new features and stories
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                          flex: 1,
                          padding: "8px 12px",
                          borderRadius: "20px",
                          border: "none",
                          outline: "none",
                        }}
                      />
                      <Button
                        variant="contained"
                        sx={{
                          background: "#ff69b4",
                          borderRadius: "20px",
                          minWidth: "auto",
                          px: 2,
                          "&:hover": { background: "#ff1493" },
                        }}
                      >
                        ✉️
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ textAlign: "center", mt: 4, pt: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <Typography variant="body2" sx={{ opacity: 0.6 }}>
                    © 2024 Kids Canvas. All rights reserved. Made with ❤️ for creative minds.
                  </Typography>
                </Box>
              </Paper>
    </Container>
  )
}
