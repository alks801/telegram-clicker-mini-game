export const IS_DEV = process.env.NODE_ENV === 'development';

export const MOCK_TELEGRAM = IS_DEV;
export const MOCK_API = IS_DEV;