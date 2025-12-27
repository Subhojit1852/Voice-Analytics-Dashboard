import { Box, Typography, Link, Divider, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        pt: 3,
        pb: 3,
        px: 2,
        backgroundColor: "#0b0f1a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Divider sx={{ mb: 2, opacity: 0.1 }} />

      <Stack spacing={0.8} alignItems="center">
        <Typography variant="body2" color="gray">
          © {new Date().getFullYear()} Subhojit Ganguly
        </Typography>

        <Typography variant="caption" color="gray">
          Full Stack Engineer Assessment · React · TypeScript · Material UI · Supabase
        </Typography>

        <Link
          href="https://github.com/Subhojit1852/Voice-Analytics-Dashboard"
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "gray",
            fontSize: "0.75rem",
            "&:hover": {
              color: "#6366f1",
            },
          }}
        >
          <GitHubIcon sx={{ fontSize: 16 }} />
          View source on GitHub
        </Link>

        {/* Email Link */}
        <Link
          href="mailto:subhojitganguly2@gmail.com"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "gray",
            fontSize: "0.75rem",
            "&:hover": {
              color: "#6366f1",
            },
          }}
        >
          <EmailIcon sx={{ fontSize: 16 }} />
          subhojitganguly2@gmail.com
        </Link>
      </Stack>
    </Box>
  );
}

