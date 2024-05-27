export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  aws: {
    cognito: {
      region: process.env.AWS_REGION || '',
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID || '',
      identityPoolId: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
      clientId: process.env.AWS_COGNITO_CLIENT_ID || '',
      authority: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_IDENTITY_POOL_ID}`,
      jwks: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
    },
    s3: {
      region: process.env.AWS_REGION || '',
      bucket: process.env.AWS_S3_BUCKET || '',
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
    },
    rekognition: {
      accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY || '',
    },
  },
});
