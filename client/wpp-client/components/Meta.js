import React from "react";
import Head from "next/head";

export default function Meta({title = "Waikato Pound Pups", description = "Waikato Pound Pups is a dog shelter and rehibilation center."}) {
    return (
        <Head>
            <meta charset="UTF-8" />
            <meta name="description" content={description} />
            <title>Waikato Pound Pups | {title}</title>
        </Head>
    );
}
