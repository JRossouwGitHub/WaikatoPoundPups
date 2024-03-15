import React from "react";
import Layout from "../components/Layout";

export default function Dogs() {
    React.useEffect(() => {
        //Load the dogs from API here
    }, [])

    return (
        <Layout meta={{ title: "Dogs", description: "Waikato Pound Pups Catalog" }}>
            <h1>Dogs here</h1>
        </Layout>
    );
}