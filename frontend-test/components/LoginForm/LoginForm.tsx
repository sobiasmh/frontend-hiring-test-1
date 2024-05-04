import { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Buttons from "../Button/Button";
import useLogin from "../../hooks/login/useLogin";
import useLoggedUser from "../../hooks/loggedUser/useLoggedUser";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false)

  const [viewer, loadingViewer, refetchViewer] = useLoggedUser();
  // const accessToken = localStorage.getItem("accessToken");

  const router = useRouter();

  const { accessToken, setAccessToken, refreshToken, setRefreshToken } = useAuth();


  useEffect(() => {
    
    if (accessToken && !loadingViewer && viewer) {
      refetchViewer();
    }
    if(viewer?.me.id && accessToken){
      router.push('/calldetails'); 
    }
   
    console.log("viewer here", viewer);
  }, [viewer, loadingViewer, accessToken]);


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [loginFunction, loding, data] = useLogin();

  const handlePublish = async () => {
    setisLoading(true)
    try {
      const loginUser = await loginFunction({
        variables: {
          input: {
           username:username,
           password:password
          },
        },
      });
    

      setAccessToken(loginUser?.data?.login?.access_token)
      setRefreshToken(loginUser?.data?.login?.refresh_token)     
      setisLoading(false)

     
    } catch (error) {
        setisLoading(false)
      console.log("here error testing", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
        <div className="flex items-center mb-2">
          <span className="text-red-500">*</span>
          <span className="ml-1">User Name</span>
        </div>
        <div className="mb-4">
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder='Email'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton disabled>
                    <PersonOutlineOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="text-red-500">*</span>
          <span className="ml-1">Password</span>
        </div>
        <div className="mb-4">
          <TextField
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder='Password'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton disabled>
                    <LockOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
        <Buttons color='#4c44fb' text='Login' height='51px' width='102px' radius='3px' onClick={handlePublish} isLoading={isLoading}/>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
