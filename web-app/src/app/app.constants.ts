// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

// export const VERSION = process.env.VERSION;
export const VERSION = "1.0.0";
// export const DEBUG_INFO_ENABLED: boolean = !!process.env.DEBUG_INFO_ENABLED;
export const DEBUG_INFO_ENABLED: boolean = false;
export const SERVER_API_URL = "http://localhost:3000/";
export const BUILD_TIMESTAMP = "test123";