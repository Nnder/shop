import { Box, InputBase, Paper } from "@mui/material";
import { Search } from "lucide-react";

interface FindProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    sx?: Record<string, any>;
    value?: string;
}

export default function Find({ sx, placeholder = "Поиск свежего мяса...", onChange, value }: FindProps) {
  return (
    <Paper
        elevation={0}
        sx={{
            p: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            width: { xs: "100%", sm: "400px", md: "500px" },
            border: '2px solid var(--border-color)',
            borderRadius: 'var(--border-radius-md)',
            transition: 'var(--transition)',
            mb: 4,
            mx: 'auto',
            '&:focus-within': {
                borderColor: 'var(--accent)',
                boxShadow: 'var(--shadow-md)'
            },
            ...sx
        }}
    >
        <Box sx={{ p: 1, color: 'var(--text-muted)', display: 'flex' }}>
            <Search size={20} />
        </Box>
        <InputBase
            sx={{ ml: 1, flex: 1, fontSize: '1rem' }}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    </Paper>
  )
}
