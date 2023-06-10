import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
export const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzQ4ZDRmMWZkYjI5YWYxOGFkYTEyYSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODU2MjAyNjEsImV4cCI6MTY4NTg3OTQ2MX0.otvKJaPBU_0HDjPVSAksTxfbh2AIrWYXI2XXb77HD8E";
const TOKEN_2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Nzk3NDk2YmY0Y2E2MDEwMDhjNWJhNiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODU2ODc3OTIsImV4cCI6MTY4NTk0Njk5Mn0.z8n5mtRH7fjdNwsOqyApYwhQhD0hIUdf710En0qUSx0";
const TOKEN_3 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Nzk5NmZjNjQ0OGU0OTE1MjhjM2U1MSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODU2OTYyMTQsImV4cCI6MTY4NTk1NTQxNH0.YYXLDPSzN8i9D1eVa0s-7hW8naDUaS9uSc9CvhX1y2M";

export const publicReq = axios.create({
    baseURL: BASE_URL
})

export const userReq = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN_3}`}
})
