import styles from './Loader.module.css'; 
import { Box } from '@mui/material';

export default function Loader() {
  return (
    <Box className={styles.loaderContainer}>
        <span className={styles.loader}></span>
    </Box>
  )
}
