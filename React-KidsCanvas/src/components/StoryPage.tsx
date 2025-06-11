"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Chip,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  CircularProgress,
  Fade,
  Divider,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  AutoAwesome,
  Image as ImageIcon,
  Refresh,
  ContentCopy,
  Download,
  Collections,
  AutoStories,
  
} from "@mui/icons-material"
import "../styles/storyPage.css"
// Create a theme with clean, subtle colors matching the reference design
const theme = createTheme({
  palette: {
    primary: {
      main: "#e91e63", // Pink from the header gradient
      light: "#f48fb1",
      dark: "#c2185b",
    },
    secondary: {
      main: "#2196f3", // Blue from the bottom section
      light: "#64b5f6",
      dark: "#1976d2",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 30,
          padding: "10px 20px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: "0 8px",
        },
      },
    },
  },
})

// Sample gallery images - in a real app, these would come from your database
const galleryImages = [
  {
    id: 1,
    url: "/placeholder.svg?height=200&width=300",
    title: "Abstract Landscape",
    artist: "Emma Johnson",
  },
  {
    id: 2,
    url: "/placeholder.svg?height=200&width=300",
    title: "Sunset Dreams",
    artist: "Michael Chen",
  },
  {
    id: 3,
    url: "/placeholder.svg?height=200&width=300",
    title: "Urban Reflections",
    artist: "Sofia Rodriguez",
  },
  {
    id: 4,
    url: "/placeholder.svg?height=200&width=300",
    title: "Mystical Forest",
    artist: "James Wilson",
  },
  {
    id: 5,
    url: "/placeholder.svg?height=200&width=300",
    title: "Ocean Whispers",
    artist: "Aisha Patel",
  },
  {
    id: 6,
    url: "/placeholder.svg?height=200&width=300",
    title: "Geometric Dreams",
    artist: "Lucas Thompson",
  },
]

// Story style suggestions
const storyStyleSuggestions = [
  "Fairy tale adventure",
  "Mysterious detective story",
  "Heartwarming friendship tale",
  "Epic fantasy journey",
  "Funny animal adventure",
  "Magical realism story",
]

export default function AIStoryGenerator() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [prompt, setPrompt] = useState("")
  const [generatedStory, setGeneratedStory] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<number | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setSelectedGalleryImage(null)
    }
  }

  const selectGalleryImage = (id: number) => {
    setSelectedGalleryImage(id)
    const image = galleryImages.find((img) => img.id === id)
    if (image) {
      setImagePreview(image.url)
      setSelectedImage(null)
    }
    setShowGallery(false)
  }
  const generateStory = async () => {
   const token = import.meta.env.VITE_MY_TOKEN;

    if ((!selectedImage && !selectedGalleryImage) || !prompt) return

    setIsGenerating(true)

    try {
       const response = await fetch(
                "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ inputs: prompt }),
                },
            )
      // const { text } = await generateText({
      //   model: openai("gpt-4-vision-preview"),
      //   messages: [
      //     {
      //       role: "user",
      //       content: [
      //         { type: "text", text: `Create a story in hebrow about this artwork: ${prompt}` },
      //         { 
      //           type: "image", 
      //           image: selectedImage 
      //             ? await selectedImage.arrayBuffer() 
      //             : new URL(imagePreview)
      //         }
      //       ]
      //     }
      //   ]
      // });
      // setGeneratedStory(text);
    

      // Simulation for demo purposes
      setTimeout(() => {
        const imageSource = selectedGalleryImage
          ? galleryImages.find((img) => img.id === selectedGalleryImage)?.title
          : "the uploaded artwork"

        const sampleStory = `
Once upon a time, in a world where colors spoke and shapes danced, there existed ${imageSource} - a masterpiece that held secrets beyond imagination.

${prompt}

The artwork seemed to breathe with life, each brushstroke telling a story of its own. Viewers would stand mesmerized, feeling as though they could step right into the scene and become part of its narrative.

Some said that on quiet nights, when the gallery was empty and moonlight streamed through the windows, the characters in the painting would move, continuing their adventures beyond what the artist had originally created.

What made this piece truly special wasn't just its technical brilliance, but the emotions it evoked - a sense of wonder, nostalgia, and the feeling that magic exists all around us, if only we take the time to notice.

And so, the legacy of this artwork continued, inspiring generations of dreamers and storytellers to see the world not just as it is, but as it could be.`

        setGeneratedStory(sampleStory)
        setIsGenerating(false)
      }, 2000)
    } catch (error) {
      console.error("Error generating story:", error)
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedStory)
  }

  const downloadStory = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedStory], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "AI_Generated_Story.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const addSuggestionToPrompt = (suggestion: string) => {
    setPrompt((prev) => (prev ? `${prev}, ${suggestion}` : suggestion))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        {/* Header Section */}
        <Box
          sx={{
            background: "linear-gradient(45deg, #e91e63 30%, #9c27b0 90%)",
            py: 4,
            px: 2,
            textAlign: "center",
            color: "white",
            borderRadius: { xs: "0 0 24px 24px", md: "0 0 48px 48px" },
            mb: 4,
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
              AI Story Creator
            </Typography>
            <Typography variant="subtitle1">Transform artwork into captivating stories with AI</Typography>
          </Container>
        </Box>

        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Left Column - CSS & Styling */}
            <Grid >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "5px",
                    background: "linear-gradient(90deg, #e91e63, #9c27b0)",
                  }}
                />

                <Typography variant="h5" sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                  <AutoAwesome color="primary" /> Create Your Story
                </Typography>

                {/* Image Selection */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Select Artwork
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<ImageIcon />}
                      sx={{
                        borderColor: "primary.light",
                        color: "primary.main",
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: "rgba(233, 30, 99, 0.04)",
                        },
                      }}
                    >
                      Upload Image
                      <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<Collections />}
                      onClick={() => setShowGallery(!showGallery)}
                      sx={{
                        borderColor: "secondary.light",
                        color: "secondary.main",
                        "&:hover": {
                          borderColor: "secondary.main",
                          bgcolor: "rgba(33, 150, 243, 0.04)",
                        },
                      }}
                    >
                      Gallery
                    </Button>
                  </Box>

                  {/* Image Preview */}
                  {imagePreview && (
                    <Fade in={!!imagePreview}>
                      <Box
                        sx={{
                          mt: 2,
                          p: 1,
                          border: "1px solid #e0e0e0",
                          borderRadius: 2,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Selected artwork"
                          style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "250px",
                            objectFit: "contain",
                            borderRadius: "8px",
                          }}
                        />
                        {selectedGalleryImage && (
                          <Typography
                            variant="caption"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              bgcolor: "rgba(0,0,0,0.6)",
                              color: "white",
                              p: 1,
                            }}
                          >
                            {galleryImages.find((img) => img.id === selectedGalleryImage)?.title} by{" "}
                            {galleryImages.find((img) => img.id === selectedGalleryImage)?.artist}
                          </Typography>
                        )}
                      </Box>
                    </Fade>
                  )}

                  {/* Gallery */}
                  {showGallery && (
                    <Fade in={showGallery}>
                      <Box
                        sx={{
                          mt: 2,
                          p: 2,
                          border: "1px solid #e0e0e0",
                          borderRadius: 2,
                          maxHeight: "400px",
                          overflowY: "auto",
                        }}
                      >
                        <Typography variant="subtitle2" gutterBottom>
                          Select from Gallery
                        </Typography>
                        <Grid container spacing={2}>
                          {galleryImages.map((image) => (
                            <Grid  key={image.id}>
                              <Card
                                sx={{
                                  cursor: "pointer",
                                  transition: "transform 0.2s",
                                  "&:hover": {
                                    transform: "scale(1.03)",
                                  },
                                  border: selectedGalleryImage === image.id ? "2px solid #e91e63" : "none",
                                }}
                                onClick={() => selectGalleryImage(image.id)}
                              >
                                <CardMedia component="img" height="120" image={image.url} alt={image.title} />
                                <CardContent sx={{ p: 1 }}>
                                  <Typography variant="caption" noWrap>
                                    {image.title}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Fade>
                  )}
                </Box>

                {/* Story Description */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Describe the story you want
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Describe what kind of story you want about this artwork..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                          borderColor: "primary.light",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.main",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Suggestions */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Need inspiration? Try these:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {storyStyleSuggestions.map((suggestion, index) => (
                      <Chip
                        key={index}
                        label={suggestion}
                        onClick={() => addSuggestionToPrompt(suggestion)}
                        sx={{
                          bgcolor: "rgba(233, 30, 99, 0.08)",
                          color: "primary.dark",
                          "&:hover": {
                            bgcolor: "rgba(233, 30, 99, 0.15)",
                          },
                          mb: 1,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Generate Button */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={generateStory}
                  disabled={isGenerating || !imagePreview || !prompt}
                  startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> :<></>}
                  sx={{
                    background: "linear-gradient(45deg, #e91e63 30%, #9c27b0 90%)",
                    color: "white",
                    py: 1.5,
                    boxShadow: "0 4px 20px rgba(233, 30, 99, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 25px rgba(233, 30, 99, 0.4)",
                    },
                    "&.Mui-disabled": {
                      background: "#e0e0e0",
                    },
                  }}
                >
                  {isGenerating ? "Creating Story..." : "Generate Story"}
                </Button>
              </Paper>
            </Grid>

            {/* Right Column - Logic & Output */}
            <Grid>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "5px",
                    background: "linear-gradient(90deg, #2196f3, #03a9f4)",
                  }}
                />

                <Typography variant="h5" sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                  <AutoStories color="secondary" /> Your Story
                </Typography>

                {isGenerating ? (
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8 }}>
                    <CircularProgress color="secondary" />
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                      Creating your story...
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Our AI is analyzing the artwork and crafting a unique narrative
                    </Typography>
                  </Box>
                ) : generatedStory ? (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <IconButton size="small" onClick={copyToClipboard} title="Copy to clipboard">
                        <ContentCopy fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={downloadStory} title="Download story">
                        <Download fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={generateStory} disabled={isGenerating} title="Regenerate story">
                        <Refresh fontSize="small" />
                      </IconButton>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "rgba(33, 150, 243, 0.04)",
                        border: "1px solid rgba(33, 150, 243, 0.1)",
                        maxHeight: "500px",
                        overflowY: "auto",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.8,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {generatedStory}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 8,
                      px: 2,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(33, 150, 243, 0.1)",
                        mb: 3,
                      }}
                    >
                      <AutoStories sx={{ fontSize: 40, color: "secondary.main" }} />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      Your story will appear here
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
                      Select an artwork, describe the story you want, and click "Generate Story" to create a unique
                      narrative inspired by the image
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>

          {/* Bottom Section */}
          <Box
            sx={{
              mt: 6,
              mb: 4,
              p: 4,
              borderRadius: 4,
              bgcolor: "#2196f3",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Unleash Creativity with AI
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 800, mx: "auto", mb: 3 }}>
              Our advanced AI technology can create amazing stories from any artwork. From simple sketches to complex
              paintings, just select an image and describe what you want - then watch the magic happen!
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "#2196f3",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Start Creating Now
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
