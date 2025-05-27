"use client"

import { useState } from "react"
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Box,
    Card,
    CardMedia,
    CardContent,
    Chip,
    CircularProgress,
    Fade,
    Zoom,
} from "@mui/material"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import DownloadIcon from "@mui/icons-material/Download"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import RefreshIcon from "@mui/icons-material/Refresh"
import "../styles/AIDraw.css"

export default function AIDraw() {
    const [prompt, setPrompt] = useState("")
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [showResult, setShowResult] = useState(false)

    const examplePrompts = [
        "A cute unicorn in a magical forest",
        "Happy dinosaurs playing in the park",
        "Princess castle with rainbow",
        "Friendly robot with flowers",
        "Underwater adventure with dolphins",
        "Space rocket with stars and planets",
        "Cute kittens having tea party",
        "Dragon flying over mountains",
    ]

    const recentGenerations = [
        { prompt: "Magical fairy garden", image: "/placeholder.svg?height=200&width=200&text=Fairy+Garden" },
        { prompt: "Superhero cat", image: "/placeholder.svg?height=200&width=200&text=Super+Cat" },
        { prompt: "Rainbow butterfly", image: "/placeholder.svg?height=200&width=200&text=Butterfly" },
        { prompt: "Pirate ship adventure", image: "/placeholder.svg?height=200&width=200&text=Pirate+Ship" },
    ]

    const generateImage = async () => {
        if (!prompt.trim()) return

        setIsGenerating(true)
        setShowResult(false)
        
        // try {
        //     const response = await fetch('https://localhost:7001/api/Auth', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             prompt
        //         })
        //     });
        //     console.log("response: ", response);
        //     if (response.ok) {
        //         // const data = await response.json();
        //         // localStorage.setItem('token', data.token);
        //         alert("הבקשה נשלחה בהצלחה");
        //     } else {
        //         alert("הבקשה נכשלה");
        //     }
        // } catch (error) {
        //     console.error('error in the AI:', error);
        //     throw error;
        // }
        // Simulate AI generation
        await new Promise((resolve) => setTimeout(resolve, 3000))

        setGeneratedImage(`/placeholder.svg?height=400&width=400&text=${encodeURIComponent(prompt)}`)
        setIsGenerating(false)
        setShowResult(true)
    }

    const downloadImage = () => {
        if (!generatedImage) return
        const link = document.createElement("a")
        link.href = generatedImage
        link.download = "ai-coloring-page.png"
        link.click()
    }

    return (
        <Container maxWidth="lg" className="ai-coloring-container">
            {/* Hero Section */}
            <Paper elevation={0} className="hero-section">
                <div className="hero-background">
                    <div className="floating-icon icon-1">🎨</div>
                    <div className="floating-icon icon-2">✨</div>
                    <div className="floating-icon icon-3">🌟</div>
                    <div className="floating-icon icon-4">🎭</div>
                </div>
                <Box textAlign="center" className="hero-content">
                    <Typography variant="h2" component="h1" className="hero-title">
                        AI Magic Coloring Creator
                    </Typography>
                    <Typography variant="h5" className="hero-subtitle">
                        Turn your imagination into beautiful coloring pages with AI!
                    </Typography>
                </Box>
            </Paper>

            <Grid container spacing={4}>
                {/* Main Creation Area */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} className="creation-panel">
                        <Typography variant="h4" className="panel-title">
                            <AutoAwesomeIcon className="title-icon" />
                            Create Your Masterpiece
                        </Typography>

                        <Box className="input-section">
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                label="Describe your dream coloring page..."
                                placeholder="Example: A magical unicorn flying over a rainbow castle with butterflies..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="prompt-input"
                            />

                            <Box className="example-prompts">
                                <Typography variant="body2" className="examples-label">
                                    Need inspiration? Try these:
                                </Typography>
                                <Box className="prompts-container">
                                    {examplePrompts.map((example, index) => (
                                        <Chip
                                            key={index}
                                            label={example}
                                            onClick={() => setPrompt(example)}
                                            className="example-chip"
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                size="large"
                                onClick={generateImage}
                                disabled={!prompt.trim() || isGenerating}
                                className="generate-button"
                                startIcon={isGenerating ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                            >
                                {isGenerating ? "Creating Magic..." : "Generate Coloring Page"}
                            </Button>
                        </Box>

                        {/* Generated Result */}
                        {(isGenerating || generatedImage) && (
                            <Box className="result-section">
                                {isGenerating && (
                                    <Box className="generating-animation">
                                        <CircularProgress size={60} className="loading-spinner" />
                                        <Typography variant="h6" className="generating-text">
                                            AI is creating your masterpiece...
                                        </Typography>
                                        <Typography variant="body2" className="generating-subtext">
                                            This usually takes a few seconds
                                        </Typography>
                                    </Box>
                                )}

                                {showResult && generatedImage && (
                                    <Fade in={showResult}>
                                        <Box className="generated-result">
                                            <Typography variant="h5" className="result-title">
                                                Your AI Coloring Page is Ready! 🎉
                                            </Typography>
                                            <Box className="result-image-container">
                                                <img
                                                    src={generatedImage || "/placeholder.svg"}
                                                    alt="Generated coloring page"
                                                    className="result-image"
                                                />
                                            </Box>
                                            <Box className="result-actions">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<DownloadIcon />}
                                                    onClick={downloadImage}
                                                    className="action-button"
                                                >
                                                    Download
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={<ColorLensIcon />}
                                                    className="action-button"
                                                >
                                                    Start Coloring
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<RefreshIcon />}
                                                    onClick={() => setShowResult(false)}
                                                    className="action-button"
                                                >
                                                    Generate Another
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Fade>
                                )}
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Sidebar */}
                <Grid item xs={12} md={4}>
                    {/* Recent Generations */}
                    <Paper elevation={3} className="sidebar-panel">
                        <Typography variant="h5" className="sidebar-title">
                            Recent AI Creations
                        </Typography>
                        <Box className="recent-grid">
                            {recentGenerations.map((item, index) => (
                                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
                                    <Card className="recent-card">
                                        <CardMedia component="img" image={item.image} alt={item.prompt} className="recent-image" />
                                        <CardContent className="recent-content">
                                            <Typography variant="body2" className="recent-prompt">
                                                {item.prompt}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            ))}
                        </Box>
                    </Paper>

                    {/* Promotional Panel */}
                    <Paper elevation={3} className="promo-panel">
                        <Typography variant="h5" className="promo-title">
                            🌟 Premium Features
                        </Typography>
                        <Box className="promo-content">
                            <div className="promo-item">
                                <Typography variant="h6">✨ HD Quality</Typography>
                                <Typography variant="body2">Get ultra-high resolution coloring pages</Typography>
                            </div>
                            <div className="promo-item">
                                <Typography variant="h6">🎨 Style Options</Typography>
                                <Typography variant="body2">Choose from cartoon, realistic, or artistic styles</Typography>
                            </div>
                            <div className="promo-item">
                                <Typography variant="h6">⚡ Instant Generation</Typography>
                                <Typography variant="body2">No waiting time for premium users</Typography>
                            </div>
                        </Box>
                        <Button variant="contained" color="warning" className="upgrade-button" fullWidth>
                            Upgrade to Premium
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* Bottom Promotional Section */}
            <Paper elevation={3} className="bottom-promo">
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" className="bottom-promo-title">
                            Unleash Creativity with AI
                        </Typography>
                        <Typography variant="body1" className="bottom-promo-text">
                            Our advanced AI technology can create any coloring page you can imagine. From simple shapes to complex
                            scenes, just describe it and watch the magic happen!
                        </Typography>
                        <Button variant="contained" size="large" className="bottom-promo-button">
                            Explore More Features
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box className="bottom-promo-image">
                            <img src="/placeholder.svg?height=300&width=400&text=AI+Magic" alt="AI Magic" className="promo-image" />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
