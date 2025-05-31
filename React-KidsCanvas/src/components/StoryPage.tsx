"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material"
import { AutoAwesome, Favorite, Share, Download, Add, Close, VolumeUp } from "@mui/icons-material"
import { useDrawings } from "../Context/drawingContext"
import { Drawing } from "../models/Drawing"


const StoryPage = () => {
    const availableDrawings = useDrawings().drawings
  const theme = useTheme()
  const [currentStory, setCurrentStory] = useState("")
  const [selectedDrawings, setSelectedDrawings] = useState<Drawing[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [mainDrawing, setMainDrawing] = useState(availableDrawings[0])
  const [storyVisible, setStoryVisible] = useState(false)

  // Mock AI story
  const mockStory = `Once upon a time, in a magical world filled with colors and wonder, there lived a cheerful little mouse named Minnie. She was known throughout the kingdom for her beautiful polka-dotted bow and her infectious smile that could brighten anyone's day.

One sunny morning, Minnie decided to embark on the greatest adventure of her life. She had heard whispers of the legendary Rainbow Treasure - a mystical collection of the most beautiful colors in the entire universe, hidden somewhere beyond the Cloudy Mountains.

As Minnie set off on her journey, she encountered wonderful friends along the way: a brave rabbit who loved to soar through the clouds in his tiny airplane, a wise baby elephant who knew all the secret paths through the enchanted forest, and a gentle bunny who lived in a magical wicker basket that could transport them anywhere they wished to go.

Together, this delightful group of friends traveled through sparkling meadows, crossed shimmering rivers, and climbed the highest peaks. Wherever they went, they spread joy and laughter, making the world a more beautiful and colorful place.

When they finally reached the end of their quest, they discovered that the real Rainbow Treasure wasn't gold or jewels - it was the friendship they had built together and the happiness they had shared with everyone they met along the way.

Minnie returned home with a heart full of love and friends for life. And from that day forward, whenever children see a rainbow in the sky, they remember Minnie's story and know that the greatest treasure of all is the magic of friendship and the joy we bring to others.`

  useEffect(() => {
    // Simulate loading story from server
    setIsLoading(true)
    setTimeout(() => {
      setCurrentStory(mockStory)
      setIsLoading(false)
      setTimeout(() => setStoryVisible(true), 500)
    }, 2000)
  }, [])

  const handleDrawingSelect = (drawing:Drawing) => {
    if (!selectedDrawings.find((d) => d.id === drawing.id)) {
      setSelectedDrawings([...selectedDrawings, drawing])
    }
  }

  const handleRemoveDrawing = (drawingId:string) => {
    setSelectedDrawings(selectedDrawings.filter((d) => d.id !== drawingId))
  }

  const handleGenerateNewStory = async () => {
    setIsLoading(true)
    setStoryVisible(false)
    // Here you would send the selected drawings to your AI server
    console.log("Sending to AI:", [mainDrawing, ...selectedDrawings])

    setTimeout(() => {
      setCurrentStory(mockStory + "\n\nThe story has been updated with your newly selected drawings!")
      setIsLoading(false)
      setTimeout(() => setStoryVisible(true), 500)
    }, 3000)
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #ffeef8 0%, #f0f8ff 50%, #fff5ee 100%)" }}>
      {/* Floating Animation Elements */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: "20px",
              height: "20px",
              background: ["#ff69b4", "#87ceeb", "#ffd700", "#98fb98", "#dda0dd", "#ffa500"][i],
              borderRadius: "50%",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        {/* Header Section */}
        <Paper
          elevation={8}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: "25px",
            background: "linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              animation: "slide 20s linear infinite",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              position: "relative",
              zIndex: 1,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            ✨ Your Magical Story ✨
          </Typography>
          <Typography variant="h6" sx={{ position: "relative", zIndex: 1, opacity: 0.9 }}>
            A unique tale created just for you by artificial intelligence
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {/* Left Column - Main Drawing & Selected Drawings */}
          <Grid item xs={12} md={4}>
            {/* Main Drawing */}
            <Card
              elevation={6}
              sx={{
                mb: 3,
                borderRadius: "20px",
                overflow: "hidden",
                border: "3px solid #87ceeb",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[12],
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="250"
                //   image={mainDrawing.path}
                //   alt={mainDrawing.name}
                  sx={{ objectFit: "cover" }}
                />
                <Chip
                  label="Main Character"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "linear-gradient(45deg, #ff69b4, #ff1493)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Box>
              <CardContent sx={{ textAlign: "center", py: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                  {/* {mainDrawing.name} */}
                </Typography>
              </CardContent>
            </Card>

            {/* Selected Additional Drawings */}
            {selectedDrawings.length > 0 && (
              <Card
                elevation={4}
                sx={{
                  mb: 3,
                  borderRadius: "20px",
                  border: "3px solid #98fb98",
                  overflow: "hidden",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: "#2e7d32", fontWeight: "bold", textAlign: "center" }}>
                    Story Characters
                  </Typography>
                  <Grid container spacing={2}>
                    {selectedDrawings.map((drawing) => (
                      <Grid item xs={6} key={drawing.id}>
                        <Box sx={{ position: "relative" }}>
                          <CardMedia
                            component="img"
                            height="100"
                            image={drawing.image}
                            alt={drawing.name}
                            sx={{ borderRadius: "10px", objectFit: "cover" }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveDrawing(drawing.id)}
                            sx={{
                              position: "absolute",
                              top: -5,
                              right: -5,
                              background: "#ff4444",
                              color: "white",
                              "&:hover": { background: "#cc0000" },
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              textAlign: "center",
                              mt: 1,
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          >
                            {drawing.name}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            )}

            {/* Available Drawings */}
            <Card
              elevation={4}
              sx={{
                borderRadius: "20px",
                border: "3px solid #ffd700",
                overflow: "hidden",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: "#f57c00", fontWeight: "bold", textAlign: "center" }}>
                  Add More Characters
                </Typography>
                <Grid container spacing={1}>
                  {availableDrawings
                    .filter(
                      (drawing) => drawing.id !== mainDrawing.id && !selectedDrawings.find((d) => d.id === drawing.id),
                    )
                    .slice(0, 6)
                    .map((drawing) => (
                      <Grid item xs={4} key={drawing.id}>
                        <Box
                          onClick={() => handleDrawingSelect(drawing)}
                          sx={{
                            position: "relative",
                            cursor: "pointer",
                            borderRadius: "10px",
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                              "& .add-overlay": { opacity: 1 },
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="80"
                            image={drawing.image}
                            alt={drawing.name}
                            sx={{ objectFit: "cover" }}
                          />
                          <Box
                            className="add-overlay"
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: "rgba(255, 105, 180, 0.8)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              opacity: 0,
                              transition: "opacity 0.3s ease",
                            }}
                          >
                            <Add sx={{ color: "white", fontSize: "2rem" }} />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Story Display */}
          <Grid item xs={12} md={8}>
            {isLoading ? (
              <Card
                elevation={6}
                sx={{
                  height: "600px",
                  borderRadius: "25px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #ffd700 0%, #ffa500 100%)",
                  color: "white",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    border: "4px solid rgba(255,255,255,0.3)",
                    borderTop: "4px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    mb: 3,
                  }}
                />
                <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                  Creating Your Magical Story...
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                  Our AI is weaving a wonderful tale just for you!
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {[0, 1, 2].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        width: "12px",
                        height: "12px",
                        background: "white",
                        borderRadius: "50%",
                        animation: "bounce 1.4s infinite ease-in-out",
                        animationDelay: `${i * 0.16}s`,
                      }}
                    />
                  ))}
                </Box>
              </Card>
            ) : (
              <Card
                elevation={6}
                sx={{
                  borderRadius: "25px",
                  overflow: "hidden",
                  border: "3px solid #98fb98",
                  opacity: storyVisible ? 1 : 0,
                  transform: storyVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s ease",
                }}
              >
                {/* Story Header */}
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #98fb98 0%, #90ee90 100%)",
                    p: 3,
                    color: "#2e7d32",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                    📖 Your Story
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
                    <Button
                      size="small"
                      startIcon={<VolumeUp />}
                      sx={{
                        background: "rgba(255,255,255,0.2)",
                        color: "#2e7d32",
                        borderRadius: "20px",
                        "&:hover": { background: "rgba(255,255,255,0.3)" },
                      }}
                    >
                      Listen
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Download />}
                      sx={{
                        background: "rgba(255,255,255,0.2)",
                        color: "#2e7d32",
                        borderRadius: "20px",
                        "&:hover": { background: "rgba(255,255,255,0.3)" },
                      }}
                    >
                      Download
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Share />}
                      sx={{
                        background: "rgba(255,255,255,0.2)",
                        color: "#2e7d32",
                        borderRadius: "20px",
                        "&:hover": { background: "rgba(255,255,255,0.3)" },
                      }}
                    >
                      Share
                    </Button>
                  </Box>
                </Box>

                {/* Story Content */}
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      color: "#ff1493",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    The Adventures of 
                    {/* {mainDrawing.name} */}
                  </Typography>
                  <Box
                    sx={{
                      "& p": {
                        mb: 2,
                        lineHeight: 1.8,
                        fontSize: "1.1rem",
                        textAlign: "justify",
                        color: "#333",
                      },
                      "& p:first-of-type::first-letter": {
                        fontSize: "4rem",
                        fontWeight: "bold",
                        color: "#ff1493",
                        float: "left",
                        lineHeight: 1,
                        paddingRight: "8px",
                        marginTop: "4px",
                      },
                    }}
                  >
                    {currentStory.split("\n\n").map((paragraph, index) => (
                      <Typography key={index} component="p">
                        {paragraph}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<AutoAwesome />}
            onClick={handleGenerateNewStory}
            disabled={isLoading}
            sx={{
              background: "linear-gradient(45deg, #ff69b4, #ff1493)",
              borderRadius: "25px",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(255, 105, 180, 0.4)",
              "&:hover": {
                background: "linear-gradient(45deg, #ff1493, #c71585)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(255, 105, 180, 0.6)",
              },
            }}
          >
            Generate New Story
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<Favorite />}
            sx={{
              background: "linear-gradient(45deg, #87ceeb, #4682b4)",
              borderRadius: "25px",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(135, 206, 235, 0.4)",
              "&:hover": {
                background: "linear-gradient(45deg, #4682b4, #2e5984)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(135, 206, 235, 0.6)",
              },
            }}
          >
            Save to Favorites
          </Button>
        </Box>

        {/* Company Promotions */}
        <Paper
          elevation={8}
          sx={{
            mt: 6,
            p: 4,
            borderRadius: "25px",
            background: "linear-gradient(135deg, #e1f5fe 0%, #f3e5f5 100%)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, color: "#1976d2", fontWeight: "bold" }}>
            🌟 Unlock Premium Features 🌟
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  height: "100%",
                  background: "linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)",
                  color: "white",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  🎨 Creative Plus
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  Unlimited stories, premium characters, and exclusive themes
                </Typography>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                  $9.99
                  <Typography component="span" variant="body2">
                    /month
                  </Typography>
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    borderRadius: "20px",
                    "&:hover": { background: "rgba(255,255,255,0.3)" },
                  }}
                >
                  Start Free Trial
                </Button>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                elevation={6}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  height: "100%",
                  background: "linear-gradient(135deg, #ffd700 0%, #ffa500 100%)",
                  color: "white",
                  transform: "scale(1.05)",
                  border: "3px solid #ff6347",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  👑 Family Premium
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  Everything in Creative Plus + family sharing for up to 6 members
                </Typography>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                  $19.99
                  <Typography component="span" variant="body2">
                    /month
                  </Typography>
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    borderRadius: "20px",
                    "&:hover": { background: "rgba(255,255,255,0.3)" },
                  }}
                >
                  Most Popular
                </Button>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  height: "100%",
                  background: "linear-gradient(135deg, #98fb98 0%, #90ee90 100%)",
                  color: "#2e7d32",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  🚀 Pro Creator
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.8 }}>
                  Advanced AI features, custom characters, and commercial usage
                </Typography>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                  $29.99
                  <Typography component="span" variant="body2">
                    /month
                  </Typography>
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "#2e7d32",
                    color: "white",
                    borderRadius: "20px",
                    "&:hover": { background: "#1b5e20" },
                  }}
                >
                  Go Pro
                </Button>
              </Card>
            </Grid>
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
            <Grid item xs={12} md={3}>
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
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Features
              </Typography>
              {["AI Story Generation", "Character Library", "Voice Narration", "Story Sharing"].map((item) => (
                <Typography key={item} variant="body2" sx={{ mb: 1, opacity: 0.8, cursor: "pointer" }}>
                  {item}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Support
              </Typography>
              {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
                <Typography key={item} variant="body2" sx={{ mb: 1, opacity: 0.8, cursor: "pointer" }}>
                  {item}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={3}>
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

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </Box>
  )
}

export default StoryPage
