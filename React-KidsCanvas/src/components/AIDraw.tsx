"use client"
import { type JSX, useState } from "react"
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
    Alert,
    Fade,
    Container,
    Paper,
    Snackbar,
    Card,
    CardMedia,
    CardActions,
    CardContent,
} from "@mui/material"
import {
    PhotoCamera as PhotoCameraIcon,
    Download as DownloadIcon,
    Brush as BrushIcon,
    Star as StarIcon,
    Palette as PaletteIcon,
    AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { styled } from "@mui/system"
import { Grid } from '@mui/material';
// Define types for dot configurations
interface WaterColorDotProps {
    top?: string
    left?: string
    right?: string
    bottom?: string
    size: number
    opacity: number
}

interface DotConfigMap {
    [key: string]: WaterColorDotProps[]
}

// Custom theme matching the design
const theme = createTheme({
    direction: "rtl" as const,
    palette: {
        primary: {
            main: "#e91e63",
            light: "#f48fb1",
            dark: "#ad1457",
            contrastText: "#fff",
        },
        secondary: {
            main: "#9c27b0",
            light: "#ba68c8",
            dark: "#7b1fa2",
        },
        background: {
            default: "#f8f9fa",
            paper: "#ffffff",
        },
        text: {
            primary: "#333333",
            secondary: "#6b6b6b",
        },
    },
    typography: {
        fontFamily: "Assistant, Rubik, Arial, sans-serif",
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 500,
        },
        h6: {
            fontWeight: 500,
        },
        button: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 16,
    },
})

// Styled components matching the design
const HeroSection = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)",
    borderRadius: "24px",
    padding: theme.spacing(6, 4),
    color: "white",
    textAlign: "center",
    marginBottom: theme.spacing(4),
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.3,
    },
}))

const MainCard = styled(Paper)(({ theme }) => ({
    borderRadius: "24px",
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    border: "1px solid rgba(233, 30, 99, 0.1)",
    position: "relative",
    overflow: "hidden",
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
    color: "#9c27b0",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
}))

const PromptTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: "16px",
        backgroundColor: "#f8f9fa",
        border: "2px solid transparent",
        transition: "all 0.3s ease",
        "&:hover": {
            backgroundColor: "#f0f0f0",
            transform: "translateY(-2px)",
        },
        "&.Mui-focused": {
            backgroundColor: "white",
            borderColor: "#e91e63",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 20px rgba(233, 30, 99, 0.2)",
        },
    },
    "& .MuiInputBase-input": {
        padding: theme.spacing(2),
        textAlign: "center",
        direction: "rtl",
        fontSize: "1.1rem",
    },
}))

const InspirationChip = styled(Button)(({ theme }) => ({
    borderRadius: "20px",
    padding: "8px 16px",
    margin: "4px",
    fontSize: "0.9rem",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)",
    border: "1px solid #e0e0e0",
    color: theme.palette.text.secondary,
    textTransform: "none",
    "&:hover": {
        background: "linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)",
        color: "white",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 15px rgba(233, 30, 99, 0.3)",
    },
}))

const GenerateButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)",
    borderRadius: "25px",
    padding: theme.spacing(1.5, 4),
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "white",
    textTransform: "none",
    boxShadow: "0 8px 25px rgba(233, 30, 99, 0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 12px 35px rgba(233, 30, 99, 0.5)",
    },
    "&:disabled": {
        background: "#ccc",
        color: "#666",
    },
}))

const ImagePreviewCard = styled(Card)(() => ({
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
    "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
        borderColor: "#e91e63",
    },
}))



const BottomSection = styled(Paper)(({ theme }) => ({
    background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
    borderRadius: "24px",
    padding: theme.spacing(6, 4),
    color: "white",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
}))

interface WaterColorDotStyleProps {
    size: number
    opacity: number
}

const WaterColorDot = styled(Box)<WaterColorDotStyleProps>(({ size = 12, opacity = 0.8 }) => ({
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #e91e63, #9c27b0)",
    opacity: opacity,
    position: "absolute",
    animation: "float 6s ease-in-out infinite",
    "@keyframes float": {
        "0%, 100%": {
            transform: "translateY(0px)",
        },
        "50%": {
            transform: "translateY(-10px)",
        },
    },
}))

export default function AiDrawGenerator() {
    const [prompt, setPrompt] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<string>("")


    // Inspiration examples
    const inspirationExamples: string[] = [
        "A cute unicorn in a magical forest",
        "Happy dinosaur playing in the park",
        "Princess castle with rainbow",
        "Friendly robot with flowers",
        "Underwater adventure with dolphins",
        "Space rocket with stars and planets",
        "Cute kittens playing with yarn",
        "Dragon flying over mountains",
    ]

    const handleInspirationClick = (example: string): void => {
        setPrompt(example)
    }

    const generateImage = async (): Promise<void> => {
        if (!prompt) return

        setLoading(true)
        setError("")
        try {
            const token = import.meta.env.VITE_MY_TOKEN;
            console.log(token);
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

            if (!response.ok) {
                const data = await response.json()
                console.error("שגיאה מהמודל:", data)
                setError(data.error || "קרתה שגיאה בלתי צפויה.")
                setLoading(false)
                return
            }

            const blob = await response.blob()
            const imageObjectUrl = URL.createObjectURL(blob)
            setImageUrl(imageObjectUrl)

            setSnackbarMessage("Coloring page created successfully!")
            setSnackbarOpen(true)
        } catch (error) {
            console.error("שגיאה כללית:", error)
            setError("An error occurred while creating the image.")
        }
        setLoading(false)
    }

    const downloadImage = (): void => {
        if (!imageUrl) return

        const link = document.createElement("a")
        link.href = imageUrl
        link.download = "ai-generated-coloring-page.png"
        link.click()

        setSnackbarMessage("Image downloaded successfully!")
        setSnackbarOpen(true)
    }

    const renderWatercolorDots = (position: string): JSX.Element[] => {
        const dotsConfig: DotConfigMap = {
            "top-left": [
                { top: "25px", left: "20px", size: 14, opacity: 0.6 },
                { top: "35px", left: "40px", size: 10, opacity: 0.8 },
                { top: "15px", left: "45px", size: 8, opacity: 0.7 },
            ],
            "top-right": [
                { top: "20px", right: "20px", size: 12, opacity: 0.7 },
                { top: "35px", right: "30px", size: 9, opacity: 0.6 },
                { top: "15px", right: "50px", size: 10, opacity: 0.8 },
                { top: "40px", right: "55px", size: 8, opacity: 0.5 },
            ],
            "bottom-left": [
                { bottom: "20px", left: "25px", size: 11, opacity: 0.6 },
                { bottom: "40px", left: "15px", size: 8, opacity: 0.7 },
            ],
            "bottom-right": [
                { bottom: "15px", right: "30px", size: 13, opacity: 0.6 },
                { bottom: "35px", right: "15px", size: 9, opacity: 0.7 },
            ],
        }

        const dots = dotsConfig[position] || []

        return dots.map((dot, i) => (
            <WaterColorDot
                key={`${position}-dot-${i}`}
                sx={{
                    top: dot.top,
                    left: dot.left,
                    right: dot.right,
                    bottom: dot.bottom,
                    animationDelay: `${i * 0.5}s`,
                }}
                size={dot.size}
                opacity={dot.opacity}
            />
        ))
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
                <Container maxWidth="lg">
                    {/* Hero Section */}
                    <HeroSection>
                        <Box sx={{ position: "relative", zIndex: 2 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: "2rem", md: "3rem" },
                                    fontWeight: 700,
                                    mb: 2,
                                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                                }}
                            >
                                AI Magic Coloring Creator
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    opacity: 0.9,
                                    fontSize: { xs: "1rem", md: "1.2rem" },
                                    textShadow: "0 1px 5px rgba(0,0,0,0.2)",
                                }}
                            >
                                Turn your imagination into beautiful coloring pages with AI!
                            </Typography>
                        </Box>

                        {/* Floating decorative elements */}
                        <Box sx={{ position: "absolute", top: "20px", left: "20px", opacity: 0.3 }}>
                            <BrushIcon sx={{ fontSize: "3rem", animation: "float 4s ease-in-out infinite" }} />
                        </Box>
                        <Box sx={{ position: "absolute", bottom: "20px", right: "20px", opacity: 0.3 }}>
                            <PaletteIcon sx={{ fontSize: "2.5rem", animation: "float 5s ease-in-out infinite" }} />
                        </Box>
                    </HeroSection>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 3,
                                borderRadius: "16px",
                                boxShadow: "0 4px 15px rgba(244, 67, 54, 0.2)",
                            }}
                            onClose={() => setError("")}
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Main Creation Card */}
                    <MainCard elevation={0}>
                        {/* Decorative dots */}
                        <Box sx={{ position: "absolute", top: 0, left: 0 }}>{renderWatercolorDots("top-left")}</Box>
                        <Box sx={{ position: "absolute", top: 0, right: 0 }}>{renderWatercolorDots("top-right")}</Box>
                        <Box sx={{ position: "absolute", bottom: 0, left: 0 }}>{renderWatercolorDots("bottom-left")}</Box>
                        <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>{renderWatercolorDots("bottom-right")}</Box>

                        <Box sx={{ position: "relative", zIndex: 2 }}>
                            <SectionTitle variant="h4">
                                <StarIcon />
                                Create Your Masterpiece
                            </SectionTitle>

                            <PromptTextField
                                fullWidth
                                variant="outlined"
                                placeholder="Describe your dream coloring page..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                sx={{ mb: 4 }}
                                disabled={loading}
                                multiline
                                rows={3}
                            />

                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        mb: 2,
                                        color: "text.secondary",
                                        fontWeight: 500,
                                    }}
                                >
                                    Need Inspiration? Try these:
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        gap: 1,
                                    }}
                                >
                                    {inspirationExamples.map((example, index) => (
                                        <InspirationChip key={index} onClick={() => handleInspirationClick(example)} size="small">
                                            {example}
                                        </InspirationChip>
                                    ))}
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                                <GenerateButton
                                    onClick={generateImage}
                                    disabled={loading || !prompt}
                                    size="large"
                                    startIcon={loading ? null : <AutoAwesomeIcon />}
                                >
                                    {loading ? (
                                        <>
                                            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                                            Creating Magic...
                                        </>
                                    ) : (
                                        "Generate Coloring Page"
                                    )}
                                </GenerateButton>
                            </Box>
                        </Box>
                    </MainCard>

                    {/* Generated Image Display */}
                    {imageUrl && (
                        <Fade in timeout={800}>
                            <MainCard elevation={0}>
                                <SectionTitle variant="h5">
                                    <PhotoCameraIcon />
                                    Your AI Creation
                                </SectionTitle>
                                <Grid container spacing={3} justifyContent="center">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            width: { xs: '100%', md: '66.66%' }, // 8/12 = 66.66%
                                        }}
                                    >
                                        <ImagePreviewCard>
                                            <CardMedia
                                                component="img"
                                                image={imageUrl}
                                                alt="AI Generated Coloring Page"
                                                sx={{
                                                    width: "100%",
                                                    height: "auto",
                                                    maxHeight: "500px",
                                                    objectFit: "contain",
                                                }}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                    {prompt}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Created by AI on {new Date().toLocaleDateString()}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ p: 2 }}>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<DownloadIcon />}
                                                    onClick={downloadImage}
                                                    sx={{
                                                        background: "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)",
                                                        borderRadius: "20px",
                                                        "&:hover": {
                                                            transform: "translateY(-2px)",
                                                            boxShadow: "0 8px 20px rgba(76, 175, 80, 0.4)",
                                                        },
                                                    }}
                                                >
                                                    Download Image
                                                </Button>
                                            </CardActions>
                                        </ImagePreviewCard>
                                    </Box>
                                </Grid>
                            </MainCard>
                        </Fade>
                    )}

                    {/* Bottom CTA Section */}
                    <BottomSection elevation={0}>
                        <Box sx={{ position: "relative", zIndex: 2 }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontSize: { xs: "2rem", md: "2.5rem" },
                                }}
                            >
                                Unleash Creativity with AI
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    opacity: 0.9,
                                    mb: 4,
                                    maxWidth: "600px",
                                    mx: "auto",
                                }}
                            >
                                Our advanced AI technology can create amazing coloring pages from any description. From simple shapes to
                                complex scenes, just describe it and watch the magic happen!
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    background: "rgba(255,255,255,0.2)",
                                    color: "white",
                                    borderRadius: "25px",
                                    px: 4,
                                    py: 1.5,
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    "&:hover": {
                                        background: "rgba(255,255,255,0.3)",
                                        transform: "translateY(-2px)",
                                    },
                                }}
                            >
                                Start Creating Now
                            </Button>
                        </Box>

                        {/* Floating elements */}
                        <Box sx={{ position: "absolute", top: "20px", left: "20px", opacity: 0.3 }}>
                            <StarIcon sx={{ fontSize: "2rem", animation: "float 3s ease-in-out infinite" }} />
                        </Box>
                        <Box sx={{ position: "absolute", bottom: "20px", right: "20px", opacity: 0.3 }}>
                            <AutoAwesomeIcon sx={{ fontSize: "2.5rem", animation: "float 4s ease-in-out infinite" }} />
                        </Box>
                    </BottomSection>
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

                {/* Snackbar */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                />

                {/* Global styles for animations */}
                <style>{`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px); 
            }
            50% { 
              transform: translateY(-10px); 
            }
          }
        `}</style>
            </Box>
        </ThemeProvider>
    )
}

