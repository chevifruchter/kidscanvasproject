"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
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
   const { id } = useParams();
  const location = useLocation();

  const [drawingId, setDrawingId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (id) {
      setDrawingId(id);
    } else if (location.state?.id) {
      setDrawingId(location.state.id);
    } else {
      console.warn("לא התקבל ID מהנתיב ולא מה-state");
    }
  }, [id, location.state]);

  // const location = useLocation();
  // const id = location.state?.id;
  // const { id } = useParams();
  console.log(`drawingcontext ${id}`);

  const navigate = useNavigate()
  const [drawing, setDrawing] = useState<Drawing | null>(null)
  const [relatedDrawings, setRelatedDrawings] = useState<Drawing[]>([])
  const [isLoading, setIsLoading] = useState(true)
const base_url = import.meta.env.VITE_BASE_URL_API;
  useEffect(() => {

    if (drawingId)
      console.log("Fetching drawing details for ID:", drawingId);

    const fetchDrawingDetails = async () => {
      try {
        setIsLoading(true)
        // Fetch the specific drawing
        const response = await fetch(`${base_url}/api/Drawings${drawingId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch drawing details")
        }
        const data = await response.json()
        setDrawing(data)
        console.log("data" + data);

        // Fetch related drawings (same category or random)
        const relatedResponse = await fetch(`${base_url}/api/Drawings`)
        if (!relatedResponse.ok) {
          throw new Error("Failed to fetch related drawings")
        }
        const relatedData = await relatedResponse.json()

        // Filter out the current drawing and get up to 6 related drawings
        const filtered = relatedData.filter((d: Drawing) => d.id !== drawingId).slice(0, 6)

        setRelatedDrawings(filtered)
      } catch (error) {
        console.error("Error fetching drawing details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (drawingId) {
      fetchDrawingDetails()
    }
  }, [drawingId])

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

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <Typography variant="h6" className="loading-text">
          Loading drawing details...
        </Typography>
      </div>
    )
  }

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
          <Box
            sx={{
              width: {
                xs: '100%',      // xs=12 → 12/12 = 100%
                md: '58.3333%',  // md=7 → 7/12 ≈ 58.33%
              },
              boxSizing: 'border-box',
            }}
          >
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
          </Box>

          {/* Drawing Details */}
          <Box
            sx={{
              width: {
                xs: '100%',      // xs=12 → 12/12 = 100%
                md: '41.6667%',  // md=5 → 5/12 ≈ 41.67%
              },
              boxSizing: 'border-box',
            }}
          >
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
          </Box>
        </Grid>
      </Paper>

      {/* Related Drawings */}
      <div className="related-drawings-section">
        <Typography variant="h4" component="h2" className="section-title">
          More Coloring Pages
        </Typography>

        <Grid container spacing={3}>
          {relatedDrawings.map((relatedDrawing) => (
            <Box
              key={relatedDrawing.id}
              sx={{
                width: {
                  xs: '50%',       // xs=6 → 6/12 = 50%
                  sm: '33.3333%',  // sm=4 → 4/12 ≈ 33.33%
                  md: '16.6667%',  // md=2 → 2/12 ≈ 16.67%
                },
                boxSizing: 'border-box',
              }}
            >
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
            </Box>
          ))}
        </Grid>
      </div>

      {/* Promotional Section */}
      <Paper elevation={3} className="promo-section">
        <Grid container spacing={2} alignItems="center">
          <Box
            sx={{
              width: {
                xs: '100%',      // xs=12 → 12/12 = 100%
                md: '58.3333%',  // md=7 → 7/12 ≈ 58.33%
              },
              boxSizing: 'border-box',
            }}
          >
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
          </Box>
          <Box
            sx={{
              width: {
                xs: '100%',      // xs=12 → 12/12 = 100%
                md: '41.6667%',  // md=5 → 5/12 ≈ 41.67%
              },
              boxSizing: 'border-box',
            }}
          >
            <div className="promo-image-container">
              {/* <img
                src="/placeholder.svg?height=300&width=400&text=Kids+Having+Fun+Coloring"
                alt="Kids coloring"
                className="promo-image"
              /> */}
            </div>
          </Box>
        </Grid>
      </Paper>

      {/* Second Promotional Section */}
      <Paper elevation={3} className="promo-section second-promo">
        <Grid container spacing={2} alignItems="center" direction="row-reverse">
          <Box
            sx={{
              width: {
                xs: '100%',      // xs=12 → 12/12 = 100%
                md: '58.3333%',  // md=7 → 7/12 ≈ 58.33%
              },
              boxSizing: 'border-box',
            }}
          >
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
          </Box>
          <Box
            sx={{
              width: {
                xs: '100%',      // xs=12 → 12/12 = 100%
                md: '41.6667%',  // md=5 → 5/12 ≈ 41.67%
              },
              boxSizing: 'border-box',
            }}
          >
            <div className="promo-image-container">
              {/* <img
                src="/placeholder.svg?height=300&width=400&text=AI+Generated+Coloring+Pages"
                alt="AI coloring"
                className="promo-image"
              /> */}
            </div>
          </Box>
        </Grid>
      </Paper>
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
