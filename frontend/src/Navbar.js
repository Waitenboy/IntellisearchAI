import * as React from 'react';
import { 
  AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Button, 
  Tooltip, Avatar, Container 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useNavigate } from 'react-router-dom';
import avatarImg from "./avatar.jpg";

const pages = ['Home', 'About', 'Contact', 'Forum'];  // Added 'Forum'
const settings = ["Profile"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  // Ensure authentication state updates dynamically
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem("token"));

  React.useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));

    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);  // ✅ Listen for login changes

    return () => {
        window.removeEventListener("storage", checkAuth);
        window.removeEventListener("authChange", checkAuth);
    };
}, []);


  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  // Function to handle navigation, checking authentication
  const handleNavigation = (page) => {
    const lowerCasePage = page.toLowerCase();
    if (lowerCasePage === "forum" && !isAuthenticated) {
      alert("Login to access Forum");  // Show an alert message
      navigate("/signup");  // Redirect to signup if user is not logged in
    } else {
      navigate(`/${lowerCasePage}`);
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 2 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Left Side - Logo */}
            <SearchIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              IntelliSearch
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleNavigation(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button 
                  key={page} 
                  onClick={() => handleNavigation(page)}
                  sx={{ my: 2, color: 'black', textTransform: 'none' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* Authentication & Profile */}
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User Avatar" src={avatarImg} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <NavLink to={`/${setting.toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }}>
                          {setting}
                        </NavLink>
                      </MenuItem>
                    ))}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button component={NavLink} to="/signup" sx={{ color: 'black', textTransform: 'none' }}>
                  Login / Signup
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Ensures content does not go under navbar */}
      <Box sx={{ pt: '64px' }}></Box>
    </>
  );
}

export default ResponsiveAppBar;
