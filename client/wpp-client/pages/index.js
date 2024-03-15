import Layout from "../components/Layout";
import { Typography } from "@mui/material";

export default function Index() {
    return (
        <Layout meta={{ title: "Home", description: "Welcome to Waikato Pound Pups"  }}>
            <Typography variant="h3" sx={{ textAlign: "center" }}>Welcome to Waikato Pound Pups!</Typography>
        </Layout>
    );
}