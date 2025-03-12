import React from 'react';
import { Helmet } from 'react-helmet';

const Head = () => {
  const basePath = `${process.env.PUBLIC_URL}/publicfront/assets`;

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Creative Community</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <link href={`${basePath}/img/favicon.png`} rel="icon" />
      <link href={`${basePath}/img/apple-touch-icon.png`} rel="apple-touch-icon" />
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link
        href="https://fonts.gstatic.com"
        rel="preconnect"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <link href={`${basePath}/vendor/bootstrap/css/bootstrap.min.css`} rel="stylesheet" />
      <link href={`${basePath}/vendor/bootstrap-icons/bootstrap-icons.css`} rel="stylesheet" />
      <link href={`${basePath}/vendor/aos/aos.css`} rel="stylesheet" />
      <link href={`${basePath}/vendor/glightbox/css/glightbox.min.css`} rel="stylesheet" />
      <link href={`${basePath}/vendor/swiper/swiper-bundle.min.css`} rel="stylesheet" />
      <link href={`${basePath}/css/main.css`} rel="stylesheet" />
    </Helmet>
  );
};

export default Head;
