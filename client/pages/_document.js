import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head></Head>
        <body className='font-poppins bg-gray-50 cursor-default select-none'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
