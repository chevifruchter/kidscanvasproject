"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Divider,
  Chip,
} from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import StarIcon from "@mui/icons-material/Star"
import "../styles/OpenDrawing.css";
import { Drawing } from "../models/Drawing"

export default function OpenDrawing() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [drawing, setDrawing] = useState<Drawing | null>(null)
  const [relatedDrawings, setRelatedDrawings] = useState<Drawing[]>([])
//   const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDrawingDetails = async () => {
      try {
        // setIsLoading(true)
        // Fetch the specific drawing
        const response = await fetch(`https://localhost:7001/api/Drawings/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch drawing details")
        }
        const data = await response.json()
        setDrawing(data)

        // Fetch related drawings (same category or random)
        const relatedResponse = await fetch("https://localhost:7001/api/Drawings")
        if (!relatedResponse.ok) {
          throw new Error("Failed to fetch related drawings")
        }
        const relatedData = await relatedResponse.json()

        // Filter out the current drawing and get up to 6 related drawings
        const filtered = relatedData.filter((d: Drawing) => d.id !== id).slice(0, 6)

        setRelatedDrawings(filtered)
      } catch (error) {
        console.error("Error fetching drawing details:", error)
      } finally {
        // setIsLoading(false)
      }
    }

    if (id) {
      fetchDrawingDetails()
    }
  }, [id])

  const handleDownload = () => {
    if (!drawing) return

    const link = document.createElement("a")
    link.href = drawing.path
    link.download = `${drawing.name}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleColoringRedirect = () => {
    if (!drawing) return
    navigate(`/coloring-game?id=${drawing.id}`)
  }

//   if (isLoading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <Typography variant="h6" className="loading-text">
//           Loading drawing details...
//         </Typography>
//       </div>
//     )
//   }

  if (!drawing) {
    return (
      <Container maxWidth="lg" className="error-container">
        <Typography variant="h4" align="center" gutterBottom>
          Drawing not found
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/")}>
          Return to Home
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" className="drawing-details-container">
      {/* Main Content */}
      <Paper elevation={3} className="main-content-paper">
        <Grid container spacing={4}>
          {/* Drawing Image */}
          <Grid item xs={12} md={7}>
            <div className="drawing-image-container">
              <img src={drawing.path || "/placeholder.svg"} alt={drawing.name} className="drawing-image" />
              <div className="drawing-actions">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FavoriteIcon />}
                  className="action-button favorite-button"
                >
                  Add to Favorites
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<ShareIcon />}
                  className="action-button share-button"
                >
                  Share
                </Button>
              </div>
            </div>
          </Grid>

          {/* Drawing Details */}
          <Grid item xs={12} md={5}>
            <div className="drawing-details">
              <Typography variant="h3" component="h1" className="drawing-title">
                {drawing.name}
              </Typography>

              {drawing.category && (
                <Chip label={drawing.category} color="primary" variant="outlined" className="category-chip" />
              )}

              <Typography variant="body1" className="drawing-description">
                {
                  "This beautiful coloring page is perfect for kids of all ages. Download it for free or start coloring it online right away!"}
              </Typography>

              <div className="rating-container">
                <StarIcon className="star-icon" />
                <StarIcon className="star-icon" />
                <StarIcon className="star-icon" />
                <StarIcon className="star-icon" />
                <StarIcon className="star-icon" />
                <Typography variant="body2" className="rating-text">
                  (125 ratings)
                </Typography>
              </div>

              <div className="main-buttons">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                  className="main-button download-button"
                >
                  Download
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<ColorLensIcon />}
                  onClick={handleColoringRedirect}
                  className="main-button coloring-button"
                >
                  Start Coloring
                </Button>
              </div>

              <Divider className="details-divider" />

              <div className="drawing-stats">
                <div className="stat-item">
                  <Typography variant="body2" className="stat-label">
                    Downloads
                  </Typography>
                  <Typography variant="h6" className="stat-value">
                    1,245
                  </Typography>
                </div>
                <div className="stat-item">
                  <Typography variant="body2" className="stat-label">
                    Colorings
                  </Typography>
                  <Typography variant="h6" className="stat-value">
                    867
                  </Typography>
                </div>
                <div className="stat-item">
                  <Typography variant="body2" className="stat-label">
                    Favorites
                  </Typography>
                  <Typography variant="h6" className="stat-value">
                    324
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>

      {/* Related Drawings */}
      <div className="related-drawings-section">
        <Typography variant="h4" component="h2" className="section-title">
          More Coloring Pages
        </Typography>

        <Grid container spacing={3}>
          {relatedDrawings.map((relatedDrawing) => (
            <Grid item xs={6} sm={4} md={2} key={relatedDrawing.id}>
              <Card className="related-drawing-card">
                <CardActionArea onClick={() => navigate(`/drawing/${relatedDrawing.id}`)}>
                  <CardMedia
                    component="img"
                    image={relatedDrawing.path}
                    alt={relatedDrawing.name}
                    className="related-drawing-image"
                  />
                  <CardContent className="related-drawing-content">
                    <Typography variant="body2" className="related-drawing-title">
                      {relatedDrawing.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Promotional Section */}
      <Paper elevation={3} className="promo-section">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h4" component="h2" className="promo-title">
              Discover the Joy of Coloring!
            </Typography>
            <Typography variant="body1" className="promo-text">
              Kids Canvas offers hundreds of free coloring pages for children of all ages. Explore our collection,
              download your favorites, or use our online coloring tool to create beautiful artwork directly in your
              browser!
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="promo-button"
                onClick={() => navigate("/")}
              >
                Explore All Drawings
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <div className="promo-image-container">
              {/* <img
                src="/placeholder.svg?height=300&width=400&text=Kids+Having+Fun+Coloring"
                alt="Kids coloring"
                className="promo-image"
              /> */}
            </div>
          </Grid>
        </Grid>
      </Paper>

      {/* Second Promotional Section */}
      <Paper elevation={3} className="promo-section second-promo">
        <Grid container spacing={2} alignItems="center" direction="row-reverse">
          <Grid item xs={12} md={7}>
            <Typography variant="h4" component="h2" className="promo-title">
              Try Our AI Coloring Generator!
            </Typography>
            <Typography variant="body1" className="promo-text">
              Create unique coloring pages with our AI-powered generator. Just describe what you want to color, and our
              AI will create a custom coloring page just for you!
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className="promo-button"
                onClick={() => navigate("/ai-coloring")}
              >
                Create Custom Drawing
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <div className="promo-image-container">
              {/* <img
                src="/placeholder.svg?height=300&width=400&text=AI+Generated+Coloring+Pages"
                alt="AI coloring"
                className="promo-image"
              /> */}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
