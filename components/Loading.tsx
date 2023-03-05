import { Box, keyframes } from "@mui/material"
// class="load-wrapp"
// class="load-3"

const loadingVar = [1, 2, 3]

const loading = keyframes`
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(0, 10px);
    }
    75% {
      transform: translate(0, -10px);
    }
    100%{
      transform: translate(0, 0);
    }
`

export const LoadingComponent = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            gap: '10px'
        }}>
            {
                loadingVar.map((index) => {
                    return (
                        <Box key={index} sx={{
                            width: '15px',
                            height: '15px',
                            borderRadius: '15px',
                            background: '#4b9cdb',
                            animation: `${loading} 0.3s ${0.2 * index}s linear infinite`,
                        }}></Box>
                    )
                })
            }
        </Box>
    )
}

export const LoadingPage = () => {
    return (
        <>
            <Box sx={{
                height: '100vh',
                width: '100vw',
            }}>
                <LoadingComponent />
            </Box>
        </>
    )
}