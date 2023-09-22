import React from 'react'
import { Box, Stack } from "@chakra-ui/react"
import Card from './Card'
import axios from "axios";


const Home = () => {


    const checkoutHandler = async (amount) => {

        const key = await axios.get("http://localhost:3000/razorpay/getKey")

        const { data} = await axios.post("http://localhost:3000/razorpay", {
            amount
        })
        console.log(data);
        const options = {
            key:key.data,
            amount: data.amount,
            currency: "INR",
            name: "Yashraj Singh Mandloi",
            description: "RazorPay Example ",
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.linkedin.com%2Fin%2Fyashraj-singh-mandloi-722b55158&psig=AOvVaw0I6o49G4qV8g8zGVUzPzQ1&ust=1695384187135000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMifgLTUu4EDFQAAAAAdAAAAABAD",
            order_id: data.id,
            callback_url: "http://localhost:3000/razorpay/verify",
            prefill: {
                name: "yashraj",
                email: "yashraj@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    return (
        <Box>

            <Stack h={"100vh"} alignItems="center" justifyContent="center" direction={["column", "row"]}>

                <Card amount={5000} img={"https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"} checkoutHandler={checkoutHandler} />
                <Card amount={3000} img={"http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"} checkoutHandler={checkoutHandler} />

            </Stack>
        </Box>
    )
}

export default Home